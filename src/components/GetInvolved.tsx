"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Users, Signpost, CalendarPlus, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { campaign } from "@/data/campaign";
import { LIMITS, VOLUNTEER_INTERESTS, type FormType } from "@/lib/validation";
import {
  Consent,
  Field,
  FormStatus,
  Honeypot,
  useCampaignForm,
  useFocusFirstError,
} from "./form/controls";

type TabId = "volunteer" | "lawn-sign" | "invite" | "support";

const tabs: { id: TabId; label: string; blurb: string; Icon: LucideIcon; anchor: string }[] = [
  {
    id: "volunteer",
    label: "Volunteer",
    blurb: "Doors, calls, flyers, events — a few hours makes a difference.",
    Icon: Users,
    anchor: "volunteer",
  },
  {
    id: "lawn-sign",
    label: "Request a lawn sign",
    blurb: "Show your support from your own front yard.",
    Icon: Signpost,
    anchor: "lawn-sign",
  },
  {
    id: "invite",
    label: "Invite Maqsood",
    blurb: "Ask him to a tenants' meeting, residents' association or community event.",
    Icon: CalendarPlus,
    anchor: "invite",
  },
  {
    id: "support",
    label: "Other support",
    blurb: "Have another way you would like to help? Say so here.",
    Icon: HeartHandshake,
    anchor: "support",
  },
];

const emptyState = {
  name: "",
  email: "",
  phone: "",
  postal: "",
  availability: "",
  address: "",
  notes: "",
  organisation: "",
  message: "",
  interests: [] as string[],
  consent: false,
  permission: false,
  website: "",
};

export function GetInvolved() {
  const [active, setActive] = useState<TabId>("volunteer");
  const [values, setValues] = useState(emptyState);
  const { status, message, errors, submit, reset } = useCampaignForm();
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(errors, formRef);

  /**
   * Deep links from the quick-action strip (#lawn-sign, #volunteer, #invite,
   * #support) open the matching form rather than only scrolling to it.
   */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      const match = tabs.find((t) => t.anchor === hash);
      if (match) setActive(match.id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const set = <K extends keyof typeof emptyState>(key: K, value: (typeof emptyState)[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  function switchTab(id: TabId) {
    setActive(id);
    // Keep what the person has already typed that every form asks for.
    setValues((v) => ({
      ...emptyState,
      name: v.name,
      email: v.email,
      phone: v.phone,
    }));
    reset();
  }

  function toggleInterest(interest: string) {
    setValues((v) => ({
      ...v,
      interests: v.interests.includes(interest)
        ? v.interests.filter((i) => i !== interest)
        : [...v.interests, interest],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sent = await submit(active as FormType, values);
    if (sent) setValues(emptyState);
  }

  return (
    <section
      id="get-involved"
      aria-labelledby="get-involved-heading"
      className="scroll-mt-24 border-b border-rule bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <p className="label-mono text-civic-deep">Get involved</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
          <h2 id="get-involved-heading" className="display-lg">
            Campaigns are built by neighbours.
          </h2>
          <p className="lede mt-4">
            Whether you can knock on a few doors, put a sign on your lawn or make an introduction in
            your building, there is a way to help.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          {/* Segmented control */}
          <div>
            <div role="tablist" aria-label="Ways to get involved" className="flex flex-col">
              {tabs.map(({ id, label, blurb, Icon, anchor }) => {
                const selected = active === id;
                return (
                  <button
                    key={id}
                    id={anchor}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls="get-involved-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => switchTab(id)}
                    onKeyDown={(e) => {
                      const i = tabs.findIndex((t) => t.id === active);
                      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                        e.preventDefault();
                        switchTab(tabs[(i + 1) % tabs.length]!.id);
                      }
                      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                        e.preventDefault();
                        switchTab(tabs[(i - 1 + tabs.length) % tabs.length]!.id);
                      }
                    }}
                    className={`scroll-mt-24 border-l-[3px] px-4 py-4 text-left transition-colors ${
                      selected
                        ? "border-signal bg-cream"
                        : "border-rule bg-transparent hover:bg-cream/60"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 font-semibold text-navy">
                      <Icon size={18} aria-hidden="true" className="text-civic" />
                      {label}
                    </span>
                    <span className="mt-1 block text-[0.86rem] leading-snug text-slate">
                      {blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id="get-involved-panel"
            aria-label={tabs.find((t) => t.id === active)!.label}
            tabIndex={-1}
            className="border border-rule bg-cream p-5 sm:p-8"
          >
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

                <Field
                  label="Phone"
                  name="phone"
                  required={active === "lawn-sign"}
                  error={errors.phone}
                  hint={
                    active === "lawn-sign"
                      ? "Needed so the sign team can reach you about installation."
                      : undefined
                  }
                >
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

                {active === "volunteer" && (
                  <Field
                    label="Postal code"
                    name="postal"
                    error={errors.postal}
                    hint="Helps match you with your part of the ward."
                  >
                    {(p) => (
                      <input
                        {...p}
                        type="text"
                        autoComplete="postal-code"
                        maxLength={LIMITS.postal}
                        className="field-input"
                        value={values.postal}
                        onChange={(e) => set("postal", e.target.value)}
                      />
                    )}
                  </Field>
                )}

                {active === "invite" && (
                  <Field label="Group or organisation" name="organisation" error={errors.organisation}>
                    {(p) => (
                      <input
                        {...p}
                        type="text"
                        maxLength={LIMITS.organisation}
                        className="field-input"
                        value={values.organisation}
                        onChange={(e) => set("organisation", e.target.value)}
                      />
                    )}
                  </Field>
                )}
              </div>

              {/* ---------- Volunteer ---------- */}
              {active === "volunteer" && (
                <>
                  <fieldset>
                    <legend className="field-label">
                      How would you like to help?
                      <span className="ml-1 font-normal text-signal-deep">(required)</span>
                    </legend>
                    <div
                      className="mt-2 grid gap-2 sm:grid-cols-2"
                      {...(errors.interests
                        ? { "aria-describedby": "interests-error" }
                        : {})}
                    >
                      {VOLUNTEER_INTERESTS.map((interest) => (
                        <label
                          key={interest}
                          className="flex min-h-[44px] cursor-pointer items-center gap-3 border border-field bg-white px-3 py-2 text-[0.93rem] text-ink transition-colors hover:border-civic"
                        >
                          <input
                            type="checkbox"
                            name="interests"
                            value={interest}
                            checked={values.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            className="h-5 w-5 shrink-0 accent-[#145DA0]"
                          />
                          {interest}
                        </label>
                      ))}
                    </div>
                    {errors.interests && (
                      <p id="interests-error" className="field-error">
                        <span>{errors.interests}</span>
                      </p>
                    )}
                  </fieldset>

                  <Field
                    label="When are you usually available?"
                    name="availability"
                    error={errors.availability}
                    hint="For example: weekday evenings, or Saturday mornings."
                  >
                    {(p) => (
                      <textarea
                        {...p}
                        rows={3}
                        maxLength={LIMITS.availability}
                        className="field-input"
                        value={values.availability}
                        onChange={(e) => set("availability", e.target.value)}
                      />
                    )}
                  </Field>
                </>
              )}

              {/* ---------- Lawn sign ---------- */}
              {active === "lawn-sign" && (
                <>
                  <Field
                    label="Where should the sign go?"
                    name="address"
                    required
                    error={errors.address}
                    hint="The address for installation. It is sent only to the campaign and is never shown on this website."
                  >
                    {(p) => (
                      <input
                        {...p}
                        type="text"
                        autoComplete="street-address"
                        maxLength={LIMITS.address}
                        className="field-input"
                        value={values.address}
                        onChange={(e) => set("address", e.target.value)}
                      />
                    )}
                  </Field>

                  <Consent
                    name="permission"
                    checked={values.permission}
                    onChange={(v) => set("permission", v)}
                    error={errors.permission}
                  >
                    I own this property, or I have the property owner&rsquo;s permission to place a
                    campaign sign there.
                  </Consent>

                  <Field label="Anything the sign team should know?" name="notes" error={errors.notes}>
                    {(p) => (
                      <textarea
                        {...p}
                        rows={3}
                        maxLength={LIMITS.notes}
                        className="field-input"
                        value={values.notes}
                        onChange={(e) => set("notes", e.target.value)}
                      />
                    )}
                  </Field>
                </>
              )}

              {/* ---------- Invite / Support ---------- */}
              {(active === "invite" || active === "support") && (
                <Field
                  label={
                    active === "invite"
                      ? "Tell us about the meeting"
                      : "How would you like to help?"
                  }
                  name="message"
                  required
                  error={errors.message}
                  hint={
                    active === "invite"
                      ? "Who is attending, roughly when, and where in the ward."
                      : undefined
                  }
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
              )}

              <Consent checked={values.consent} onChange={(v) => set("consent", v)} error={errors.consent}>
                I agree the campaign may contact me about what I have asked for here.{" "}
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
                  className="btn btn-navy w-full sm:w-auto sm:self-start"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Sending…"
                    : active === "lawn-sign"
                      ? "Request a sign"
                      : active === "volunteer"
                        ? "Sign me up"
                        : "Send to the campaign"}
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
      </div>
    </section>
  );
}
