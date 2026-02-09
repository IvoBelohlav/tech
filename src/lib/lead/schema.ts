import * as z from "zod";

const trim = (v: unknown) => (typeof v === "string" ? v.trim() : v);

const requiredText = (fieldLabel: string) =>
  z.preprocess(
    trim,
    z
      .string({
        error: (iss) =>
          iss.input === undefined || iss.input === null || iss.input === ""
            ? `${fieldLabel} is required.`
            : undefined,
      })
      .min(1, `${fieldLabel} is required.`)
      .max(200, `${fieldLabel} is too long.`)
  );

const optionalText = (fieldLabel: string, max = 200) =>
  z.preprocess(
    trim,
    z
      .string({ error: () => `${fieldLabel} must be a string.` })
      .max(max, `${fieldLabel} is too long.`)
      .optional()
  );

const email = z.preprocess(
  trim,
  z.email({ error: () => "Please enter a valid email address." }).max(
    320,
    "Email is too long."
  )
);

export const leadPayloadSchema = z
  .object({
    name: requiredText("Name"),
    company: requiredText("Company"),
    email,

    role: optionalText("Role"),
    phone: optionalText("Phone", 60),
    location: optionalText("Location"),
    industry: optionalText("Industry", 60),
    heatOutput: optionalText("Heat output", 120),
    temperatureRange: optionalText("Temperature range", 120),
    message: optionalText("Message", 2000),

    // Honeypot: bots often fill it; humans never see it.
    website: optionalText("Website", 200),
  })
  .strict();

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export function zodIssuesToFieldErrors(issues: z.ZodIssue[]) {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field !== "string") continue;
    fieldErrors[field] ??= [];
    fieldErrors[field].push(issue.message);
  }

  return fieldErrors;
}

