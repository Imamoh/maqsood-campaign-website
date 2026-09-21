import { NextResponse } from "next/server";
import { deliverSubmission } from "@/lib/email";
import { checkRateLimit, clientKey } from "@/lib/rateLimit";
import { FORM_TYPES, validate, type FormType } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 24_000;

/**
 * Single endpoint for every campaign form.
 *
 * Privacy rule enforced here: submission field values are never written to
 * logs. Only the form type, HTTP status and coarse failure reasons are logged.
 */
export async function POST(request: Request) {
  // 1. Rate limit
  const key = clientKey(request.headers);
  const limit = checkRateLimit(key);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        message: "Too many submissions from this connection. Please try again shortly.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // 2. Parse and size-check the body
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: "That message is too long to send. Please shorten it." },
        { status: 413 },
      );
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not read that submission." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { ok: false, message: "We could not read that submission." },
      { status: 400 },
    );
  }

  const payload = body as Record<string, unknown>;
  const type = payload.type;

  if (typeof type !== "string" || !FORM_TYPES.includes(type as FormType)) {
    return NextResponse.json(
      { ok: false, message: "We could not read that submission." },
      { status: 400 },
    );
  }

  // 3. Honeypot. Bots fill the hidden field; humans never see it.
  // Respond with 200 so automated traffic gets no signal, but send nothing.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true, message: "Thank you." }, { status: 200 });
  }

  // 4. Validate
  const result = validate(type as FormType, payload);
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        errors: result.errors,
      },
      { status: 422 },
    );
  }

  // 5. Deliver
  const delivery = await deliverSubmission(type as FormType, result.values);

  if (!delivery.ok) {
    console.error(`[campaign-form] delivery failed for type=${type} reason=${delivery.reason}`);
    return NextResponse.json(
      {
        ok: false,
        deliveryFailure: true,
        message:
          "We could not send your message right now. Please email the campaign directly and it will be received.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      message:
        type === "contribution"
          ? "Thank you. Your enquiry has been sent. The campaign will contact you with contribution instructions and confirm eligibility before any funds are accepted. No payment has been made."
          : "Thank you. Your message has been sent to the campaign.",
    },
    { status: 200 },
  );
}

export async function GET() {
  return NextResponse.json({ ok: false, message: "Method not allowed." }, { status: 405 });
}
