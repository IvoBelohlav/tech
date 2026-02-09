import { describe, expect, test } from "vitest";
import { leadPayloadSchema } from "../src/lib/lead/schema";

describe("leadPayloadSchema", () => {
  test("accepts a valid minimal payload", () => {
    const result = leadPayloadSchema.safeParse({
      name: "Ada Lovelace",
      company: "Acme Energy",
      email: "ada@example.com",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.name).toBe("Ada Lovelace");
  });

  test("trims whitespace before validating email (edge case)", () => {
    const result = leadPayloadSchema.safeParse({
      name: "  Ada  ",
      company: "  Acme  ",
      email: "  ada@example.com  ",
      message: "   hello   ",
    });

    expect(result.success).toBe(true);
    if (!result.success) return;
    expect(result.data.name).toBe("Ada");
    expect(result.data.company).toBe("Acme");
    expect(result.data.email).toBe("ada@example.com");
    expect(result.data.message).toBe("hello");
  });

  test("rejects an invalid email address (error case)", () => {
    const result = leadPayloadSchema.safeParse({
      name: "Ada",
      company: "Acme",
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.some((i) => i.path[0] === "email")).toBe(true);
  });
});

