"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { campaign } from "@/data/campaign";
import { ISSUE_CATEGORIES, LIMITS } from "@/lib/validation";
import {
  Consent,
  Field,
  FormStatus,
  Honeypot,
  useCampaignForm,
  useFocusFirstError,
} from "./form/controls";

const initial = {
  name: "",
  email: "",
  phone: "",
  area: "",
  category: "",
  message: "",
  consent: false,
  website: "",
};

export function ListeningForm() {
  const [values, setValues] = useState(initial);
  const { status, message, errors, submit } = useCampaignForm();
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(errors, formRef);

  /**
   * Deep links such as /?category=gig-worker#your-voice preselect the issue
   * category. The form is fully usable without this — it only sets a default.
   */
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("category");
    if (!key) return;
    const match = ISSUE_CATEGORIES.find(
      (c) => c.toLowerCase().replace(/[^a-z]+/g, "-").includes(key.toLowerCase()),
    );
    if (match) setValues((v) => (v.category ? v : { ...v, category: match }));
  }, []);

  const set = <K extends keyof typeof initial>(key: K, value: (typeof initial)[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sent = await submit("concern", values);
    if (sent) setValues(initial);
  }

  return (
    <section
      id="your-voice"
      aria-labelledby="your-voice-heading"
      className="street-grid scroll-mt-24 bg-navy"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="label-mono text-white/60">Your voice comes first</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-white" />
          <h2
            id="your-voice-heading"
            className="text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.08] font-semibold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Before City Hall speaks, it should listen.
          </h2>
          <p className="mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/80">
            What is happening on your street, in your building, or across your neighbourhood? Tell
            us what City Hall should be paying attention to — the specific things, not the
            general ones.
          </p>
          <p className="mt-6 max-w-[46ch] text-[0.92rem] leading-relaxed text-white/60">
            Messages go directly to the campaign. Sending one does not add you to a mailing
            list.
          </p>
        </div>

        <div className="border border-white/15 bg-cream p-5 sm:p-8">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <noscript>
              <p className="border-l-[3px] border-signal bg-white px-3 py-3 text-[0.9rem] text-navy">
                This form needs JavaScript to send. With it switched off, please email{" "}
                <a
                  href={`mailto:${campaign.contact.email}`}
                  className="font-semibold text-civic-deep underline underline-offset-2"
                >
                  {campaign.contact.email}
                </a>{" "}
                instead — the campaign receives it the same way.
              </p>
            </noscript>

            <Honeypot value={values.website} onChange={(v) => set("website", v)} />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" required error={errors.name}>
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    autoComplete="name"
                    maxLength={LIMITS.name}
                    className="field-input"
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                )}
              </Field>

              <Field label="Email" name="email" required error={errors.email}>
                {(p) => (
                  <input
                    {...p}
                    type="email"
                    autoComplete="email"
                    maxLength={LIMITS.email}
                    className="field-input"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                )}
              </Field>

              <Field label="Phone" name="phone" error={errors.phone}>
                {(p) => (
                  <input
                    {...p}
                    type="tel"
                    autoComplete="tel"
                    maxLength={LIMITS.phone}
                    className="field-input"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                )}
              </Field>

              <Field
                label="Neighbourhood or nearest intersection"
                name="area"
                required
                error={errors.area}
                hint="For example: Pape & Danforth. No need for your full address."
              >
                {(p) => (
                  <input
                    {...p}
                    type="text"
                    maxLength={LIMITS.area}
                    className="field-input"
                    value={values.area}
                    onChange={(e) => set("area", e.target.value)}
                  />
                )}
              </Field>
            </div>

            <Field label="What is this about?" name="category" required error={errors.category}>
              {(p) => (
                <select
                  {...p}
                  className="field-input"
                  value={values.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  <option value="">Choose a category</option>
                  {ISSUE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field
              label="What would you like to share?"
              name="message"
              required
              error={errors.message}
              hint={`Up to ${LIMITS.message.toLocaleString()} characters.`}
            >
              {(p) => (
                <textarea
                  {...p}
                  rows={5}
                  maxLength={LIMITS.message}
                  className="field-input"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                />
              )}
            </Field>

            <Consent
              checked={values.consent}
              onChange={(v) => set("consent", v)}
              error={errors.consent}
            >
              I agree the campaign may use my contact details to reply to me about this concern.{" "}
              <Link href="/privacy" className="font-semibold text-civic-deep underline underline-offset-2">
                How your information is handled
              </Link>
              .
            </Consent>

            <p className="text-[0.82rem] leading-relaxed text-slate">
              {campaign.forms.privacyNote}
            </p>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto sm:self-start"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send to the campaign"}
              </button>
              <FormStatus
                status={status}
                message={message}
                errorCount={Object.keys(errors).length}
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
