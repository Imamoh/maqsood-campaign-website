import type { Metadata } from "next";
import Link from "next/link";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "The accessibility commitment of the Maqsood Ahmad campaign for Ward 14 — Toronto–Danforth, and how to report a barrier on this website.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  const { contact, legal } = campaign;

  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="label-mono text-civic-deep">Campaign policy</p>
        <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
        <h1 className="display-lg">Accessibility statement</h1>
        <p className="mt-3 text-[0.9rem] text-slate">Last updated: {legal.accessibilityUpdated}</p>

        <div className="prose-campaign mt-10">
          <p>
            A campaign that says it will listen has to be reachable by everyone. This site is built
            so that residents can read it, navigate it and contact the campaign regardless of how
            they use the web.
          </p>

          <h2>Our design target</h2>
          <p>
            This website is designed and built with the Web Content Accessibility Guidelines
            (WCAG) 2.2 Level AA as its target. In practice that means work on:
          </p>
          <ul>
            <li>Text and interface contrast that stays readable</li>
            <li>Full keyboard navigation, with a visible focus indicator on every control</li>
            <li>Labels on every form field, and errors described in words rather than by colour</li>
            <li>Semantic headings and landmark regions for screen reader navigation</li>
            <li>Touch targets large enough to use comfortably on a phone</li>
            <li>Respect for the reduced-motion setting on your device</li>
            <li>No autoplaying audio or video</li>
          </ul>

          <h2>What this statement does not claim</h2>
          <p>
            This site has not been audited or certified by an independent accessibility assessor,
            and the campaign does not claim it is free of barriers. Conformance is a target the
            campaign works toward and checks against — not a guarantee it makes.
          </p>

          <h2>Reporting a barrier</h2>
          <p>
            If something on this site is difficult or impossible for you to use, please tell the
            campaign. Email <a href={`mailto:${contact.email}`}>{contact.email}</a> and describe
            what happened — the page, what you were trying to do, and the device or assistive
            technology you were using, if you are comfortable sharing that. The campaign will
            respond as promptly as it reasonably can and will work to fix the problem.
          </p>

          <h2>Another way to reach the campaign</h2>
          <p>
            If a form on this website does not work for you, you can send the same information by
            email to <a href={`mailto:${contact.email}`}>{contact.email}</a>. Nothing on this site is
            available only through a form.
          </p>
        </div>

        <p className="mt-12 border-t border-rule pt-6">
          <Link href="/" className="font-semibold text-civic-deep underline underline-offset-2">
            Back to the campaign home page
          </Link>
        </p>
      </div>
    </article>
  );
}
