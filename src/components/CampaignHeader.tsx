"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { campaign } from "@/data/campaign";
import { MeetingLink } from "./MeetingLink";
import { CampaignWordmark } from "./CampaignWordmark";

/**
 * Navigation now mixes in-page anchors ("#about") with a real route
 * ("/gig-workers"). Anchors stay plain <a> so they work without JavaScript;
 * routes use <Link> for client-side navigation and prefetching.
 */
function NavItem({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // An in-page anchor only works on the page that contains the section. From
  // any other route (e.g. /gig-workers) it must resolve to the home page first.
  const resolved = href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  if (resolved.startsWith("/")) {
    return (
      <Link href={resolved} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={resolved} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

export function CampaignHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the control that opened the menu.
    toggleRef.current?.focus();
  }, []);

  // Escape closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Prevent the page behind the overlay from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Focus trap within the open panel.
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (!node) return;
    const first = node.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = node.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-signal bg-white">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center py-2"
          aria-label={`${campaign.candidate.name} for ${campaign.candidate.ward} — home`}
        >
          <CampaignWordmark size="md" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {campaign.navigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2.5 text-[0.92rem] font-medium text-navy transition-colors hover:text-signal"
            >
              {item.label}
            </NavItem>
          ))}
          <NavItem href="#contribute" className="btn btn-primary ml-3 !min-h-[44px] !py-2 text-[0.9rem]">
            Support the Campaign
          </NavItem>
        </nav>

        {/* Mobile menu button */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-12 w-12 items-center justify-center rounded-sm text-navy lg:hidden"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-x-0 top-[76px] bottom-0 z-50 bg-white lg:hidden"
          id="mobile-menu"
        >
          <div ref={panelRef} className="flex h-full flex-col overflow-y-auto px-4 pt-2 pb-10">
            <nav aria-label="Primary mobile" className="flex flex-col">
              {campaign.navigation.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-rule py-4 text-lg font-medium text-navy"
                >
                  {item.label}
                </NavItem>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <NavItem href="#contribute" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Support the Campaign
              </NavItem>
              <NavItem href="#lawn-sign" onClick={() => setOpen(false)} className="btn btn-outline w-full">
                Request a lawn sign
              </NavItem>
              <MeetingLink onNavigate={() => setOpen(false)} className="btn btn-outline w-full" />
              <NavItem href="#your-voice" onClick={() => setOpen(false)} className="btn btn-outline w-full">
                Share a concern
              </NavItem>
            </div>
            <p className="label-mono mt-8 text-slate">
              Election day · {campaign.election.shortDateLabel}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
