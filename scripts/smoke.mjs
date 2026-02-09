import http from "node:http";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function getFreePort() {
  return await new Promise((resolve, reject) => {
    const s = http.createServer();
    s.on("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const address = s.address();
      s.close(() => {
        if (!address || typeof address === "string") {
          reject(new Error("Failed to determine free port."));
          return;
        }
        resolve(address.port);
      });
    });
  });
}

async function waitForOk(url, timeoutMs) {
  const start = Date.now();
  let lastError = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.ok) return;
      lastError = new Error(`HTTP ${res.status} for ${url}`);
    } catch (e) {
      lastError = e;
    }
    await delay(250);
  }

  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

async function startLeadSink() {
  const received = [];
  const server = http.createServer(async (req, res) => {
    if (req.method !== "POST") {
      res.statusCode = 404;
      res.end("not found");
      return;
    }

    let body = "";
    for await (const chunk of req) body += chunk.toString("utf-8");
    try {
      received.push(JSON.parse(body));
    } catch {
      received.push({ raw: body });
    }
    res.statusCode = 200;
    res.end("ok");
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Failed to start lead sink server.");
  }

  return {
    received,
    webhookUrl: `http://127.0.0.1:${address.port}/lead`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

async function main() {
  const webPort = await getFreePort();
  const sink = await startLeadSink();

  const child = spawn("npm", ["run", "dev"], {
    cwd: new URL("..", import.meta.url).pathname,
    env: {
      ...process.env,
      PORT: String(webPort),
      NEXT_TELEMETRY_DISABLED: "1",
      LEAD_WEBHOOK_URL: sink.webhookUrl,
    },
    stdio: "inherit",
  });

  const base = `http://127.0.0.1:${webPort}`;

  try {
    await waitForOk(`${base}/`, 60_000);

    const home = await fetch(`${base}/`);
    assert(home.ok, "Home page did not return 200.");
    const homeHtml = await home.text();
    assert(homeHtml.includes("Request a pilot"), "Home page missing expected CTA.");

    const privacy = await fetch(`${base}/privacy`);
    assert(privacy.ok, "Privacy page did not return 200.");

    const leadRes = await fetch(`${base}/api/lead`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Smoke Test",
        company: "Test Co",
        email: "smoke@example.com",
        website: "",
      }),
    });
    assert(leadRes.ok, `Lead endpoint returned ${leadRes.status}.`);
    const leadJson = await leadRes.json();
    assert(leadJson?.ok === true, "Lead endpoint did not return ok:true.");

    await delay(250);
    assert(sink.received.length === 1, "Lead sink did not receive exactly one request.");
  } finally {
    child.kill("SIGTERM");
    await sink.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

