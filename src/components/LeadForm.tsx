"use client";

import { useMemo, useState } from "react";
import styles from "./LeadForm.module.css";
import { SITE } from "@/content/site";
import Link from "next/link";

type LeadApiOk = { ok: true };
type LeadApiValidationError = {
  ok: false;
  error: { type: "validation"; fieldErrors: Record<string, string[]> };
};
type LeadApiRateLimitError = {
  ok: false;
  error: { type: "rate_limit"; message: string; retryAfterSeconds?: number };
};
type LeadApiDeliveryError = {
  ok: false;
  error: { type: "delivery"; message: string; fallbackEmail: string };
};
type LeadApiError = LeadApiValidationError | LeadApiRateLimitError | LeadApiDeliveryError;

type Status = "idle" | "submitting" | "success" | "error";

function toStringValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<string>("");

  const fallbackEmail = useMemo(() => SITE.contactEmail, []);

  const submit = async (formData: FormData) => {
    const payload = {
      name: toStringValue(formData.get("name")),
      role: toStringValue(formData.get("role")),
      company: toStringValue(formData.get("company")),
      email: toStringValue(formData.get("email")),
      phone: toStringValue(formData.get("phone")),
      location: toStringValue(formData.get("location")),
      industry: toStringValue(formData.get("industry")),
      heatOutput: toStringValue(formData.get("heatOutput")),
      temperatureRange: toStringValue(formData.get("temperatureRange")),
      message: toStringValue(formData.get("message")),
      website: toStringValue(formData.get("website")), // honeypot
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as LeadApiOk | LeadApiError;
    return json;
  };

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Request a pilot</h3>
      <p className={styles.sub}>
        Tell us a little about your heat/steam needs. We typically respond within{" "}
        <span className={styles.statusStrong}>2 business days</span>.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("submitting");
          setFieldErrors({});
          setMessage("");

          const formEl = e.currentTarget;
          const data = new FormData(formEl);

          try {
            const result = await submit(data);
            if (result.ok) {
              setStatus("success");
              formEl.reset();
              return;
            }

            setStatus("error");

            if (result.error.type === "validation") {
              setFieldErrors(result.error.fieldErrors);
              setMessage("Please check the highlighted fields and try again.");
              return;
            }

            if (result.error.type === "rate_limit") {
              setMessage(result.error.message);
              return;
            }

            const email = result.error.fallbackEmail || fallbackEmail;
            setMessage(`${result.error.message} You can also email us at ${email}.`);
          } catch {
            setStatus("error");
            setMessage(
              `We could not submit the form right now. Please email us at ${fallbackEmail}.`
            );
          }
        }}
      >
        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name *
            </label>
            <input
              className={styles.control}
              id="name"
              name="name"
              autoComplete="name"
              required
            />
            {fieldErrors.name?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="company">
              Company *
            </label>
            <input
              className={styles.control}
              id="company"
              name="company"
              autoComplete="organization"
              required
            />
            {fieldErrors.company?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              Email *
            </label>
            <input
              className={styles.control}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
            />
            {fieldErrors.email?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="phone">
              Phone
            </label>
            <input
              className={styles.control}
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
            {fieldErrors.phone?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="industry">
              Industry
            </label>
            <select className={styles.control} id="industry" name="industry">
              <option value="">Select…</option>
              <option value="energy">Energy / Utilities</option>
              <option value="paper">Paper / Pulp</option>
              <option value="glass">Glass</option>
              <option value="district-heating">District heating</option>
              <option value="steel">Steel / Metals</option>
              <option value="other">Other</option>
            </select>
            {fieldErrors.industry?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="location">
              City / Country
            </label>
            <input className={styles.control} id="location" name="location" />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="heatOutput">
              Heat output (rough)
            </label>
            <input
              className={styles.control}
              id="heatOutput"
              name="heatOutput"
              placeholder="e.g. 5–20 MWth"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="temperatureRange">
              Temperature / medium
            </label>
            <input
              className={styles.control}
              id="temperatureRange"
              name="temperatureRange"
              placeholder="e.g. 450C steam / hot air"
            />
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor="message">
              Message
            </label>
            <textarea
              className={styles.control}
              id="message"
              name="message"
              rows={4}
              placeholder="Any constraints, timelines, integration notes…"
            />
            {fieldErrors.message?.map((e) => (
              <div key={e} className={styles.error}>
                {e}
              </div>
            ))}
            <div className={styles.hint}>
              We only collect what we need to reply. No marketing lists.
            </div>
          </div>
        </div>

        {/* Honeypot: hidden from users, visible to basic bots */}
        <div className={styles.srOnly} aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className={styles.actions}>
          <div className={styles.privacy}>
            By submitting, you agree to our{" "}
            <Link href="/privacy">privacy policy</Link>.
          </div>
          <button className={styles.submit} disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Submit"}
          </button>
        </div>

        {(status === "success" || status === "error") && (
          <div className={styles.status} aria-live="polite">
            {status === "success" ? (
              <>
                <span className={styles.statusStrong}>Received.</span> We will reply
                soon.
              </>
            ) : (
              <>
                <span className={styles.statusStrong}>Not sent.</span> {message}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
