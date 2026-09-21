"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { campaign } from "@/data/campaign";

/**
 * Expandable detail inside Priority 02. Uses a real <button> with
 * aria-expanded / aria-controls rather than a styled div, so it is reachable
 * and operable by keyboard and announced correctly by screen readers.
 *
 * The panel stays in the DOM and is toggled with the `hidden` attribute, so
 * in-page search and assistive technology behave predictably.
 */
export function HousingDisclosure() {
  const [open, setOpen] = useState(false);
  const { housingPlan } = campaign;

  return (
    <div className="mt-5 border border-rule bg-panel">
      <h4 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="housing-plan-panel"
          className="flex w-full min-h-[56px] items-center justify-between gap-4 px-4 py-4 text-left font-semibold text-navy transition-colors hover:bg-white sm:px-5"
        >
          <span className="text-[1rem] leading-snug">{housingPlan.title}</span>
          <span className="flex items-center gap-2 shrink-0">
            {/* Text state, so the indicator is not conveyed by the icon alone */}
            <span className="label-mono hidden text-signal sm:inline">
              {open ? "Close" : "Read more"}
            </span>
            <ChevronDown
              size={20}
              aria-hidden="true"
              className={`text-signal transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </span>
        </button>
      </h4>

      <div
        id="housing-plan-panel"
        hidden={!open}
        className="border-t border-rule px-4 py-5 sm:px-5"
      >
        <p className="text-[0.97rem] leading-relaxed text-ink">{housingPlan.intro}</p>

        <ul className="mt-4 border-t border-rule">
          {housingPlan.proposals.map((item) => (
            <li
              key={item.slice(0, 32)}
              className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 border-b border-rule py-3"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="text-[0.95rem] leading-relaxed text-slate">{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-[0.95rem] leading-relaxed font-medium text-navy">
          {housingPlan.conclusion}
        </p>
      </div>
    </div>
  );
}
