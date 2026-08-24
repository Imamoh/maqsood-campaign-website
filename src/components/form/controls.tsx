"use client";

import { useEffect, useId, useState, type RefObject, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { campaign } from "@/data/campaign";
import type { FormType } from "@/lib/validation";

/* ------------------------------------------------------------------ */
/* Field wrapper                                                       */
/* ------------------------------------------------------------------ */

export function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
    required?: boolean;
  }) => ReactNode;
}) {
  const id = `${name}-${useId()}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-1 font-normal text-signal-deep">
            (required)
          </span>
        ) : (
          <span className="ml-1 font-normal text-slate">(optional)</span>
        )}
      </label>
      {children({
        id,
        name,
        ...(error ? { "aria-invalid": true as const } : {}),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
        ...(required ? { required: true } : {}),
      })}
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Honeypot — hidden from people and assistive technology              */
/* ------------------------------------------------------------------ */

export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="honeypot" aria-hidden="true">
      <label htmlFor="website-field">Leave this field empty</label>
      <input
        id="website-field"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Consent checkbox                                                    */
/* ------------------------------------------------------------------ */

export function Consent({
  checked,
  onChange,
  error,
  children,
  name = "consent",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
  name?: string;
}) {
  const id = `${name}-${useId()}`;
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          {...(error ? { "aria-invalid": true as const, "aria-describedby": errorId } : {})}
          className="mt-1 h-5 w-5 shrink-0 accent-[#145DA0]"
        />
        <label htmlFor={id} className="text-[0.9rem] leading-relaxed text-slate">
          {children}
        </label>
      </div>
      {error && (
        <p id={errorId} className="field-error">
          <AlertCircle size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status region — announced to screen readers                         */
/* ------------------------------------------------------------------ */

export type Status = "idle" | "submitting" | "success" | "error";

export function FormStatus({
  status,
  message,
  errorCount,
}: {
  status: Status;
  message: string;
  errorCount?: number;
}) {
  return (
    <div aria-live="polite" role="status" className="min-h-[1.5rem]">
      {status === "submitting" && (
        <p className="flex items-center gap-2 text-[0.92rem] font-medium text-slate">
          <Loader2 size={16} aria-hidden="true" className="animate-spin" />
          Sending your message…
        </p>
      )}

      {status === "success" && message && (
        <p className="flex items-start gap-2 border-l-[3px] border-civic bg-white px-3 py-3 text-[0.93rem] font-medium text-navy">
          <CheckCircle2 size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-civic" />
          <span>{message}</span>
        </p>
      )}

      {status === "error" && message && (
        <div className="flex items-start gap-2 border-l-[3px] border-signal bg-white px-3 py-3 text-[0.93rem] text-navy">
          <AlertCircle size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-signal" />
          <div>
            <p className="font-medium">{message}</p>
            {errorCount ? (
              <p className="mt-1 text-slate">
                {errorCount === 1 ? "1 field needs" : `${errorCount} fields need`} attention below.
              </p>
            ) : null}
            <p className="mt-1">
              You can also email{" "}
              <a
                href={`mailto:${campaign.contact.email}`}
                className="font-semibold text-civic-deep underline underline-offset-2"
              >
                {campaign.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Move focus to the first field that failed validation                */
/* ------------------------------------------------------------------ */

export function useFocusFirstError(
  errors: Record<string, string>,
  formRef: RefObject<HTMLFormElement | null>,
) {
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    first?.focus();
  }, [errors, formRef]);
}

/* ------------------------------------------------------------------ */
/* Submission hook                                                     */
/* ------------------------------------------------------------------ */

export function useCampaignForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(type: FormType, payload: Record<string, unknown>) {
    setStatus("submitting");
    setMessage("");
    setErrors({});

    try {
      const response = await fetch("/api/campaign-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type }),
      });

      let data: { ok?: boolean; message?: string; errors?: Record<string, string> } = {};
      try {
        data = await response.json();
      } catch {
        /* non-JSON response handled below */
      }

      if (response.ok && data.ok) {
        setStatus("success");
        setMessage(data.message ?? "Thank you. Your message has been sent to the campaign.");
        return true;
      }

      // Never report success when delivery did not happen.
      setStatus("error");
      setErrors(data.errors ?? {});
      setMessage(
        data.message ??
          "We could not send your message right now. Please try again or email the campaign directly.",
      );
      return false;
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the campaign server. Please check your connection and try again, or email the campaign directly.",
      );
      return false;
    }
  }

  function reset() {
    setStatus("idle");
    setMessage("");
    setErrors({});
  }

  return { status, message, errors, submit, reset };
}
