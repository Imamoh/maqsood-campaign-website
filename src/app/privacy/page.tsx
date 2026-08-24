import type { Metadata } from "next";
import Link from "next/link";
import { campaign } from "@/data/campaign";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How the Maqsood Ahmad campaign for Ward 14 — Toronto–Danforth collects, uses and protects information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { contact, legal } = campaign;

  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="label-mono text-civic-deep">Campaign policy</p>
        <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
        <h1 className="display-lg">Privacy statement</h1>
        <p className="mt-3 text-[0.9rem] text-slate">Last updated: {legal.privacyUpdated}</p>

        <div className="prose-campaign mt-10">
          <p>
            This website is operated by the campaign to elect Maqsood Ahmad to Toronto City Council
            in {campaign.candidate.wardLong}. This statement explains what the campaign collects
            through the forms on this site, why, and what happens to it afterwards.
          </p>

          <h2>What the forms collect</h2>
          <p>
            The campaign only receives what you type into a form. Each form collects different
            information because each one does a different job:
          </p>

          <h3>Sharing a resident concern</h3>
          <ul>
            <li>Your name and email address, so the campaign can reply</li>
            <li>Your phone number, only if you choose to give it</li>
            <li>Your neighbourhood or nearest intersection — not your full address</li>
            <li>The category of issue and the message you write</li>
          </ul>

          <h3>Volunteering</h3>
          <ul>
            <li>Your name and email address</li>
            <li>Your phone number and postal code, both optional</li>
            <li>The kinds of help you are interested in, and your availability</li>
          </ul>

          <h3>Requesting a lawn sign</h3>
          <ul>
            <li>Your name, email address and phone number</li>
            <li>
              The installation address, because a sign cannot be delivered or placed without one
            </li>
            <li>Your confirmation that you may place a sign at that address, and any notes you add</li>
          </ul>
          <p>
            Installation addresses are treated as sensitive. They are used to arrange sign delivery
            and pickup, are not published anywhere on this website, and are not sent to any
            analytics or advertising service.
          </p>

          <h3>Inviting Maqsood to a meeting or offering other support</h3>
          <ul>
            <li>Your name and email address, and your phone number if you provide it</li>
            <li>The group or organisation you are writing on behalf of, if any</li>
            <li>The details you write in your message</li>
          </ul>

          <h2>Why the campaign collects it</h2>
          <p>
            Information submitted through this site is used to respond to residents and to
            coordinate the specific campaign activity you asked about — replying to a concern,
            following up on a volunteer offer, arranging a lawn sign, or answering an invitation.
            It is not used for any unrelated purpose.
          </p>

          <h2>Consent to future campaign communications is separate</h2>
          <p>
            Sending a concern, volunteering, or requesting a sign does not sign you up for campaign
            updates or mailing lists. Those are separate things, and the campaign will ask
            separately if it ever offers them. Each form asks only for your agreement that the
            campaign may contact you about the specific request you made.
          </p>

          <h2>How it is handled</h2>
          <p>
            Form submissions are delivered by email to the campaign. The campaign uses reasonable
            safeguards to protect the information it receives, including limiting access to people
            working directly on the campaign. No website or email system can be guaranteed to be
            completely secure, and this statement makes no such claim. The campaign holds no
            security certification and does not claim one.
          </p>
          <p>
            The campaign does not sell your information, and does not trade or rent it to other
            organisations.
          </p>

          <h2>How long it is kept</h2>
          <p>
            Information is kept only as long as it is needed for campaign purposes and for any
            record-keeping obligations that apply to a municipal campaign. After that, it is
            deleted or destroyed.
          </p>

          <h2>Access, correction and deletion</h2>
          <p>
            You can ask what the campaign holds about you, ask for a correction, or ask that your
            information be deleted, where the campaign is not required to keep it. Email{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a> and describe what you would like
            done. The campaign will respond as promptly as it reasonably can.
          </p>

          <h2>Analytics and tracking</h2>
          <p>
            This site does not run advertising trackers or third-party analytics. If the campaign
            adds analytics later, this statement will be updated first.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this statement can be sent to{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
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
