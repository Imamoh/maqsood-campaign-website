/**
 * Shared form definitions and server-side validation.
 * The client uses the same limits for a first pass, but the server always
 * revalidates — client-side checks are a convenience, never a control.
 */

export const FORM_TYPES = ["concern", "volunteer", "lawn-sign", "invite", "support"] as const;
export type FormType = (typeof FORM_TYPES)[number];

export const FORM_LABELS: Record<FormType, string> = {
  concern: "Resident concern",
  volunteer: "Volunteer sign-up",
  "lawn-sign": "Lawn sign request",
  invite: "Community meeting invitation",
  support: "General campaign support",
};

export const ISSUE_CATEGORIES = [
  "Housing and affordability",
  "Streets and road safety",
  "Parks and public spaces",
  "Transit and construction",
  "Local businesses",
  "City services",
  "Gig-worker concerns",
  "Other",
] as const;

export const VOLUNTEER_INTERESTS = [
  "Door knocking",
  "Phone calls",
  "Delivering flyers",
  "Events",
  "Lawn signs",
  "General support",
] as const;

export const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  area: 160,
  postal: 12,
  category: 80,
  message: 4000,
  availability: 600,
  address: 240,
  notes: 800,
  organisation: 160,
} as const;

/** Fields that must never be logged, echoed to analytics, or written to console. */
export const SENSITIVE_FIELDS = new Set(["address", "phone", "postal", "email"]);

export type ValidationResult =
  | { ok: true; values: Record<string, string> }
  | { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Canadian postal code, spaces optional. */
const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

/** Strip control characters and collapse runaway whitespace. */
export function clean(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  return input
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]{3,}/g, "  ")
    .trim()
    .slice(0, max);
}

/** Escape user input before it is placed into an HTML email body. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Raw = Record<string, unknown>;

export function validate(type: FormType, raw: Raw): ValidationResult {
  const errors: Record<string, string> = {};
  const values: Record<string, string> = {};

  const required = (key: string, max: number, label: string) => {
    const v = clean(raw[key], max);
    if (!v) errors[key] = `${label} is required.`;
    values[key] = v;
    return v;
  };
  const optional = (key: string, max: number) => {
    const v = clean(raw[key], max);
    if (v) values[key] = v;
    return v;
  };

  // Common to every form
  required("name", LIMITS.name, "Name");
  const email = required("email", LIMITS.email, "Email");
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Enter an email address in the form name@example.com.";
  }

  if (raw.consent !== true && raw.consent !== "true" && raw.consent !== "on") {
    errors.consent = "Please confirm you agree before sending.";
  } else {
    values.consent = "Yes";
  }

  const postal = optional("postal", LIMITS.postal);
  if (postal && !POSTAL_RE.test(postal)) {
    errors.postal = "Enter a Canadian postal code, for example M4K 1N2.";
  }

  switch (type) {
    case "concern": {
      optional("phone", LIMITS.phone);
      required("area", LIMITS.area, "Neighbourhood or nearest intersection");
      const category = required("category", LIMITS.category, "Issue category");
      if (category && !ISSUE_CATEGORIES.includes(category as (typeof ISSUE_CATEGORIES)[number])) {
        errors.category = "Choose one of the listed categories.";
      }
      const message = required("message", LIMITS.message, "Message");
      if (message && message.length < 10) {
        errors.message = "Please add a little more detail — at least a sentence.";
      }
      break;
    }

    case "volunteer": {
      optional("phone", LIMITS.phone);
      optional("availability", LIMITS.availability);
      const interests = Array.isArray(raw.interests)
        ? raw.interests
            .map((i) => clean(i, 60))
            .filter((i) =>
              VOLUNTEER_INTERESTS.includes(i as (typeof VOLUNTEER_INTERESTS)[number]),
            )
        : [];
      if (interests.length === 0) {
        errors.interests = "Choose at least one way you would like to help.";
      }
      values.interests = interests.join(", ");
      break;
    }

    case "lawn-sign": {
      required("phone", LIMITS.phone, "Phone number");
      // Sensitive: installation address. Never logged, never sent anywhere
      // except the campaign's own email recipient.
      required("address", LIMITS.address, "Installation address");
      if (raw.permission !== true && raw.permission !== "true" && raw.permission !== "on") {
        errors.permission =
          "Please confirm you have permission to place a sign at this address.";
      } else {
        values.permission = "Yes";
      }
      optional("notes", LIMITS.notes);
      break;
    }

    case "invite": {
      optional("phone", LIMITS.phone);
      optional("organisation", LIMITS.organisation);
      required("message", LIMITS.message, "Details of the meeting");
      break;
    }

    case "support": {
      optional("phone", LIMITS.phone);
      required("message", LIMITS.message, "Message");
      break;
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, values };
}
