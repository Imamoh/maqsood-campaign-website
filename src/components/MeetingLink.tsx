"use client";

import { ExternalLink } from "lucide-react";
import { campaign } from "@/data/campaign";

/**
 * "Book a Meeting" control.
 *
 * The scheduling URL lives in exactly one place: campaign.meeting.calendlyUrl
 * in src/data/campaign.ts. While that value is an empty string, this renders an
 * in-page link to the meeting request form instead of an external link, so no
 * visitor is ever sent to a broken or placeholder Calendly page in production.
 */
export function MeetingLink({
  className = "",
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { calendlyUrl, label, fallbackHref } = campaign.meeting;
  const configured = calendlyUrl.trim().length > 0;

  if (!configured) {
    return (
      <a href={fallbackHref} className={className} onClick={onNavigate}>
        {label}
      </a>
    );
  }

  return (
    <a
      href={calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onNavigate}
    >
      {label}
      <ExternalLink size={15} aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
