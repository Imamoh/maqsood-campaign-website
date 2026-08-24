# Maqsood Ahmad for Ward 14 — Toronto–Danforth

Campaign website for Maqsood Ahmad, candidate for Toronto City Council in Ward 14 —
Toronto–Danforth. Election day is Monday, October 26, 2026.

Built with Next.js (App Router), TypeScript and Tailwind CSS. No database, no CMS,
no third-party analytics.

---

## 1. Local setup

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values (see section 3)
npm run dev                  # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build — must pass before deploying
npm start          # serve the production build locally
npm run typecheck  # TypeScript check with no build
```

---

## 2. Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js**. Leave the build command and output directory as
   detected.
4. Add the environment variables from section 3 under
   **Settings → Environment Variables** (add them to Production, Preview and
   Development).
5. Deploy.

---

## 3. Environment variables

Copy `.env.example` to `.env.local` for local work, and set the same names in
Vercel for production. Never commit real values.

| Variable | Required | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, for forms | API key from your transactional email provider |
| `CAMPAIGN_FORM_RECIPIENT` | Yes, for forms | Where submissions are delivered, e.g. `campaign@electmaqsood.com` |
| `CAMPAIGN_FORM_FROM` | Yes, for forms | Verified sender, e.g. `Elect Maqsood Website <website@electmaqsood.com>` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL used for metadata and the sitemap. Defaults to `https://electmaqsood.com` |

**If these are not set, the forms do not pretend to work.** They show an honest
error and a direct link to email the campaign. There is no silent failure and no
false "thank you" message.

---

## 4. Configuring form delivery

The site sends form submissions by email through [Resend](https://resend.com).

1. Create a Resend account and add `electmaqsood.com` as a domain.
2. Resend gives you DNS records to add (usually a `TXT` record for DKIM and a
   `MX` record on a subdomain such as `send.electmaqsood.com`). Add them at your
   domain registrar. See the warning in section 5 about existing MX records.
3. Wait for Resend to show the domain as verified.
4. Create an API key and set `RESEND_API_KEY` in Vercel.
5. Set `CAMPAIGN_FORM_FROM` to an address on the verified domain, and
   `CAMPAIGN_FORM_RECIPIENT` to the campaign inbox.
6. Redeploy, then send a test message through each form and confirm it arrives.

### Using a different provider

All delivery goes through `deliverSubmission()` in `src/lib/email.ts`. To switch
providers, replace the body of `sendViaResend` in that file. Nothing else in the
project needs to change.

### Privacy rules built into the forms

- Lawn sign installation addresses are sent only to the campaign inbox. They are
  never rendered on the site, never logged, and never sent to analytics.
- Server logs record only the form type and a coarse failure reason — never the
  content of a submission.
- Submitting a form does not subscribe anyone to campaign communications.

---

## 5. Connecting the GoDaddy domain

After the first Vercel deployment:

1. In Vercel: **Settings → Domains → Add**, and enter `electmaqsood.com`. Add
   `www.electmaqsood.com` too and set one to redirect to the other.
2. Vercel shows the DNS records it needs — usually an `A` record for the root
   domain and a `CNAME` for `www`.
3. In GoDaddy: **My Products → Domains → DNS → Manage Zones**, then add or edit
   only the records Vercel asked for.
4. Wait for propagation (usually minutes, occasionally a few hours) and confirm
   the domain shows as valid in Vercel.

> **⚠ Do not delete or overwrite existing `MX` records.**
> `MX` records route `campaign@electmaqsood.com`. Removing or replacing them will
> stop campaign email from being delivered, and messages sent during the outage
> may be lost permanently. Only touch the specific `A`, `CNAME` and `TXT` records
> that Vercel or the email provider ask for. If a registrar screen offers to
> "replace all records" or apply a preset, decline it.

---

## 6. How to update campaign copy

Almost all editable text lives in **`src/data/campaign.ts`**. Open that one file
to change:

- Candidate name, office, ward and slogan
- Election date and the official City of Toronto election link
- Campaign email and domain
- Hero headline, supporting copy and trust strip
- The biography paragraphs in the About section
- All six priorities, including the gig-worker feature block
- The candidate quote
- The official agent authorization wording
- Navigation labels

Legal page text lives in `src/app/privacy/page.tsx` and
`src/app/accessibility/page.tsx`, and the "last updated" dates for both are in
`campaign.ts` under `legal`.

### Keeping claims accurate

This site deliberately contains no endorsements, testimonials, statistics,
polling, awards, past political experience, events, partnerships or social media
accounts, because none were supplied. If any of those become real, add them
to `campaign.ts` and the matching component — do not invent placeholder versions.

---

## 7. Updating the official agent wording

Edit the `authorization` string in `src/data/campaign.ts`. It renders in the
footer and nowhere else.

> **Before launch, confirm the exact required authorization wording with the
> campaign's official agent**, and with the City Clerk's office if there is any
> doubt about the format required for municipal campaign materials in Toronto.

---

## 8. Adding the real portrait

**The real portrait is installed.** `public/images/maqsood-portrait.jpg` is a
1200×1500 (4:5) JPEG, 160KB, prepared from the supplied square photo: cropped
slightly at the sides and centred on the face, with modest headroom added above
so the subject sits high in the frame rather than floating in the middle of it.
`portrait.hasPortrait` is `true`, and the same photo also appears on the social
sharing card.

To replace it with a different photo later:

1. Save it to **`public/images/maqsood-portrait.jpg`** — portrait orientation,
   ideally 4:5 (e.g. 1200×1500), compressed to under ~400KB.
2. If the crop sits badly, adjust `portrait.objectPosition` in
   `src/data/campaign.ts`. It is `"50% 50%"` because the current file is already
   cropped to the frame's ratio; `"50% 30%"` favours the upper part of an image
   that is not.
3. Update `portrait.alt` if a more accurate description fits.
4. Rebuild — the social sharing card picks up the new photo automatically.

If the file is ever missing, the hero falls back to a designed navy campaign
plate and the sharing card falls back to a text-only layout. Neither invents a
likeness, and neither shows a visible "placeholder" label.

An optional second photo for the About section works the same way, using
`aboutImage` and `public/images/maqsood-community.jpg`. Until `hasImage` is true,
that block renders nothing at all — no empty frame, no broken image.

---

## 9. Replacing the Open Graph (social sharing) image

The sharing card is generated in code at `src/app/opengraph-image.tsx` and
contains only text: the candidate name, office, ward, election day and domain.

Two ways to change it:

- **Keep it generated:** edit the JSX in that file. It renders at 1200×630.
- **Use a designed image instead:** delete `src/app/opengraph-image.tsx` and save
  a 1200×630 file as `src/app/opengraph-image.jpg`. Next.js picks it up
  automatically.

The favicon is generated the same way from `src/app/icon.tsx` ("MA" on navy).

Titles and descriptions for search and social are centralized in
`src/app/layout.tsx`.

---

## 10. Project structure

```
src/
  app/
    layout.tsx              Metadata, fonts, header/footer, skip link, JSON-LD
    page.tsx                The campaign landing page
    globals.css             Design tokens and shared component styles
    fonts.ts                Self-hosted font configuration
    fonts/                  Font files (.woff2) — no external font requests
    icon.tsx                Generated favicon
    opengraph-image.tsx     Generated social sharing image
    robots.ts / sitemap.ts  Generated robots.txt and sitemap.xml
    privacy/page.tsx        Privacy statement
    accessibility/page.tsx  Accessibility statement
    api/campaign-form/      Form endpoint (validation, rate limit, delivery)
  components/               UI components, one section each
  data/campaign.ts          ← all campaign content lives here
  lib/
    validation.ts           Field definitions, limits, server-side validation
    rateLimit.ts            In-memory submission throttle
    email.ts                Delivery abstraction (swap providers here)
public/images/              Campaign photographs go here
```

---

## 11. Accessibility and no-JavaScript behaviour

The site targets WCAG 2.2 Level AA. Page content, navigation links and both legal
pages are server-rendered and work without JavaScript. The forms and the mobile
menu need JavaScript; where they do, a visible fallback points to the campaign
email address, so nothing on the site is reachable only through a script.

Colour contrast has been checked for every text and control pairing in the
palette. If you change colours in `globals.css`, re-check them before launch.

---

## 12. Final checks before launch

- [ ] Confirm the authorization wording with the official agent
- [ ] Configure and test email delivery end to end, on the live domain
- [ ] Submit each of the five forms once and confirm each email arrives
- [ ] Confirm `MX` records for campaign email are untouched after the DNS change
- [ ] Review the privacy and accessibility pages with the campaign
- [ ] Run `npm run build` and confirm it passes
