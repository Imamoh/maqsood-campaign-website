import { escapeHtml, FORM_LABELS, type FormType } from "./validation";

/**
 * DELIVERY ABSTRACTION
 * ------------------------------------------------------------------
 * The rest of the app only calls `deliverSubmission`. Resend is reached over
 * its plain REST endpoint, so there is no SDK dependency to maintain. To move
 * to another provider (Postmark, SendGrid, an SMTP relay), replace the body of
 * `sendViaResend` and leave every caller untouched.
 *
 * Nothing in this file logs submission content. Form fields — especially lawn
 * sign installation addresses — must never reach console output or any
 * analytics destination.
 */

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "provider-error" };

const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  postal: "Postal code",
  area: "Neighbourhood / intersection",
  category: "Issue category",
  message: "Message",
  interests: "Interested in",
  availability: "Availability",
  address: "Installation address",
  permission: "Permission to place a sign confirmed",
  notes: "Notes",
  organisation: "Group or organisation",
  consent: "Consent given",
};

const FIELD_ORDER = [
  "name",
  "email",
  "phone",
  "postal",
  "area",
  "category",
  "organisation",
  "interests",
  "availability",
  "address",
  "permission",
  "message",
  "notes",
  "consent",
];

function buildBodies(type: FormType, values: Record<string, string>) {
  const entries = FIELD_ORDER.filter((k) => values[k]).map(
    (k) => [FIELD_LABELS[k] ?? k, values[k]!] as const,
  );

  const text = [
    `${FORM_LABELS[type]} — electmaqsood.com`,
    "",
    ...entries.map(([label, value]) => `${label}: ${value}`),
    "",
    `Received: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#16233a;line-height:1.6">
  <h2 style="margin:0 0 4px;font-size:17px;color:#1d4772">${escapeHtml(FORM_LABELS[type])}</h2>
  <p style="margin:0 0 16px;font-size:13px;color:#4a5568">Submitted through electmaqsood.com</p>
  <table style="border-collapse:collapse;width:100%;max-width:640px">
    ${entries
      .map(
        ([label, value]) => `<tr>
      <th align="left" style="padding:8px 12px 8px 0;border-bottom:1px solid #cbdae8;vertical-align:top;width:190px;font-size:13px;color:#4a5568;font-weight:600">${escapeHtml(
        label,
      )}</th>
      <td style="padding:8px 0;border-bottom:1px solid #cbdae8;font-size:14px;white-space:pre-wrap">${escapeHtml(
        value,
      )}</td>
    </tr>`,
      )
      .join("")}
  </table>
  <p style="margin:16px 0 0;font-size:12px;color:#8a8578">Received ${escapeHtml(
    new Date().toISOString(),
  )}</p>
</div>`;

  return { text, html };
}

async function sendViaResend(params: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
}): Promise<DeliveryResult> {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: params.from,
        to: [params.to],
        reply_to: params.replyTo,
        subject: params.subject,
        text: params.text,
        html: params.html,
      }),
    });

    if (!response.ok) {
      // Status only — never the request body, which contains resident data.
      console.error(`[campaign-form] provider responded with status ${response.status}`);
      return { ok: false, reason: "provider-error" };
    }
    return { ok: true };
  } catch {
    console.error("[campaign-form] provider request failed");
    return { ok: false, reason: "provider-error" };
  }
}

export async function deliverSubmission(
  type: FormType,
  values: Record<string, string>,
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAMPAIGN_FORM_RECIPIENT;
  const from = process.env.CAMPAIGN_FORM_FROM;

  if (!apiKey || !to || !from) {
    // Configuration gap, not a resident error. The route turns this into an
    // honest message with a direct email fallback — never a false success.
    console.warn("[campaign-form] email delivery is not configured; submission not sent");
    return { ok: false, reason: "not-configured" };
  }

  const { text, html } = buildBodies(type, values);

  return sendViaResend({
    apiKey,
    from,
    to,
    replyTo: values.email,
    subject: `${FORM_LABELS[type]}: ${values.name ?? "Website submission"}`,
    text,
    html,
  });
}
