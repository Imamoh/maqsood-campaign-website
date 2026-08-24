import { MessageSquare, Users, Signpost, Mail, ArrowRight } from "lucide-react";
import { campaign } from "@/data/campaign";

const actions = [
  {
    label: "Share a neighbourhood concern",
    detail: "Tell the campaign what needs attention on your street.",
    href: "#your-voice",
    Icon: MessageSquare,
  },
  {
    label: "Volunteer",
    detail: "Knock doors, make calls, deliver flyers or help at events.",
    href: "#volunteer",
    Icon: Users,
  },
  {
    label: "Request a lawn sign",
    detail: "Show your support from your own front yard.",
    href: "#lawn-sign",
    Icon: Signpost,
  },
  {
    label: "Email the campaign",
    detail: campaign.contact.email,
    href: `mailto:${campaign.contact.email}`,
    Icon: Mail,
  },
];

/**
 * Static border classes per cell so Tailwind can see every class name.
 * 1 column on mobile, 2 on md, 4 on lg — hairlines only, no card shadows.
 */
const cellBorders = [
  "",
  "border-t md:border-t-0 md:border-l lg:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t md:border-l lg:border-t-0 lg:border-l",
];

export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading" className="border-b border-rule bg-white">
      <h2 id="quick-actions-heading" className="sr-only">
        Quick actions
      </h2>
      <ul className="mx-auto grid max-w-6xl px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ label, detail, href, Icon }, i) => (
          <li key={label} className={`border-rule ${cellBorders[i]}`}>
            <a
              href={href}
              className="group flex h-full min-h-[112px] flex-col justify-between gap-3 p-5 transition-colors hover:bg-cream lg:p-6"
            >
              <Icon size={20} aria-hidden="true" className="text-civic" />
              <span>
                <span className="flex items-center gap-1.5 font-semibold text-navy">
                  {label}
                  <ArrowRight
                    size={15}
                    aria-hidden="true"
                    className="text-signal transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-1 block text-[0.87rem] leading-snug text-slate">{detail}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
