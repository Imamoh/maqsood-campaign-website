"use client";

import { useState } from "react";
import { MessageSquare, Users, X } from "lucide-react";

/**
 * Small-screen conversion bar. Two actions only, dismissible, and rendered
 * exclusively on the campaign landing page (never on privacy or accessibility).
 * The spacer element below reserves layout height so the bar never covers the
 * end of the page content.
 */
export function MobileActionBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-navy/20 bg-cream/98 backdrop-blur-[2px] lg:hidden">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <a href="#your-voice" className="btn btn-primary flex-1 !min-h-[46px] !px-2 text-[0.88rem]">
            <MessageSquare size={16} aria-hidden="true" />
            Share a concern
          </a>
          <a href="#get-involved" className="btn btn-outline flex-1 !min-h-[46px] !px-2 text-[0.88rem]">
            <Users size={16} aria-hidden="true" />
            Get involved
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="flex h-[46px] w-11 shrink-0 items-center justify-center text-slate"
          >
            <X size={18} aria-hidden="true" />
            <span className="sr-only">Hide the quick action bar</span>
          </button>
        </div>
    </div>
  );
}
