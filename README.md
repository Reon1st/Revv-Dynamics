# Revv Dynamics

Marketing site for a performance auto shop — engine builds, turbo installs, dyno tuning.
Single-page React app with an animated scroll narrative and a working contact form that
emails build inquiries (with photo attachments) straight to the shop's inbox.

**Performance Redefined.**

---

## Stack

| Layer | Choice |
|---|---|
| Build tool | Vite 8 |
| UI | React 19 |
| Routing | React Router 7 (`/`, `/privacy`, `/terms`) |
| Styling | Tailwind CSS 3 + PostCSS/Autoprefixer |
| Animation | GSAP 3 + ScrollTrigger, plus native `IntersectionObserver` |
| Icons | lucide-react |
| Fonts | Plus Jakarta Sans, Cormorant Garamond, Inter, JetBrains Mono (Google Fonts) |
| Backend | One Vercel serverless function (`/api/contact`) |
| Email | Resend API |
| Lint | oxlint |
| Hosting | Vercel |

No database, no CMS, no auth. The only server-side state in the whole project is the
email that gets sent.

---

## How it's built

### Front-end

Everything the visitor sees lives in `src/App.jsx` (~1500 lines), composed as one page:

```
Navbar → Hero → Features → Pillars → Protocol → ServicesGrid → TrustSignals → ContactForm → Footer
```

`src/main.jsx` mounts it under React Router so the two legal pages
(`src/pages/PrivacyPolicy.jsx`, `src/pages/Terms.jsx`) get real URLs.

Things worth knowing:

- **Design tokens live in `tailwind.config.js`** — amber `primary`, near-black `deep`,
  warm off-white `background`, plus the four font families. Custom utilities
  (`.glass`, `.grid-bg`, `.noise-overlay`, `.magnetic-btn`, `.gradient-text`) are defined
  once in `src/index.css` and reused everywhere, so the look stays consistent without a
  component library.
- **Animation is split by cost.** GSAP + ScrollTrigger drives the storytelling bits —
  hero reveal, staggered card entrances, the pinned `Protocol` (process) section. Anything
  that just needs "did this scroll into view yet" (`CountUp` stat tickers, `TrustSignals`,
  `Pillars`) uses a plain `IntersectionObserver` that disconnects after firing once.
- **Custom SVG instruments.** The `RPMGauge`, `DynoCurve`, and `BuildChecklist` components
  are hand-drawn SVG animated with GSAP — no chart library. `describeArc()` does the polar
  math for the gauge sweep.
- **`getShopStatus()`** computes Open/Closed from the visitor's clock against the shop's
  hours (Mon–Fri 8–6, Sat 9–3, Sun closed) and re-checks every 60 seconds. No API call.
- **Images** (`hero.jpg`, the three process shots) are imported from `src/assets/images/`
  so Vite hashes and fingerprints them at build time.

### Back-end

`api/contact.js` — one Vercel serverless function, default export `handler(req, res)`.
It:

1. Rejects anything that isn't `POST`.
2. **Honeypot check** — if the hidden `website` field has a value, it returns `200 OK`
   and sends nothing. The bot thinks it won.
3. Validates that `name`, `email`, and `message` are present (client validation is a
   convenience, not a guarantee — this is the trust boundary).
4. Caps attachments at 5 files / 2.5 MB total raw.
5. Escapes every user-supplied string (`escapeHtml`) before dropping it into the HTML
   email template, so a `<script>` in the "vehicle" field is inert.
6. Builds the notification email (below) and POSTs it to the Resend API.

The `RESEND_API_KEY` never leaves the server. The browser only ever talks to
`/api/contact`.

#### The inquiry email

When a visitor submits the form, the shop owner gets a **custom HTML + CSS email** —
not a raw field dump. `buildEmailHtml()` renders it, and every value the customer typed is
carried into it:

```
┌────────────────────────────────────────────┐
│  ╱ REVV DYNAMICS            (dark #0F0F14) │   ← branded header, amber wordmark
│  New build inquiry                         │
├────────────────────────────────────────────┤
│  NAME      Marco Reyes                     │
│  EMAIL     marco@example.com  (mailto:)    │   ← clickable, amber link
│  PHONE     (555) 555-0100  ·  or "—"       │
│  VEHICLE   2004 Subaru WRX  ·  or "—"      │
│                                            │
│  ┌──────────────────────────────────────┐  │
│  │ BUILD GOALS                          │  │   ← white card, message preserved
│  │ Want ~350whp, daily driveable...     │  │      with line breaks intact
│  └──────────────────────────────────────┘  │
│  📎 2 photos attached                      │
├────────────────────────────────────────────┤
│  Sent from the Revv Dynamics contact form  │
└────────────────────────────────────────────┘
```

Details that matter:

- **Styling is inline CSS, not a stylesheet.** Gmail, Outlook, and friends strip `<style>`
  blocks and don't do external CSS — inline `style=""` attributes on tables is the only
  thing that renders consistently across mail clients. That's why the template looks the
  way it does rather than reusing the site's Tailwind classes.
- **It matches the site's design language** — same `#0F0F14` deep header, same amber
  `#F59E0B` / `#D97706` accents, same monospace uppercase micro-labels.
- **Every field is escaped** before interpolation, so the email is safe even if someone
  types HTML into the vehicle box.
- **Empty optional fields render as `—`**, so the layout never collapses when phone or
  vehicle is left blank.
- **The message body keeps its line breaks** (`white-space: pre-wrap`) — a customer's
  bulleted list of goals arrives as a bulleted list.
- **Photos ride along as real attachments** (up to 5), with a count noted in the body so
  the owner knows to look for them.
- **A plain-text version is sent alongside** the HTML, so text-only clients and spam
  filters both get something readable.
- **`reply_to` is the customer's address.** The owner hits Reply and it goes straight to
  them, not to the sending domain.

---

## Running it locally

```bash
npm install
cp .env.example .env      # then fill in the two values
npm run dev               # http://localhost:5173
```

Environment variables:

| Var | What it is |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox that receives build inquiries |

The contact form works end-to-end in dev. `vite.config.js` registers a small middleware
that intercepts `POST /api/contact`, parses the body, shims `res.status()` / `res.json()`,
and calls the *same* `api/contact.js` handler Vercel will run in production — so there's
one code path, not a dev fake and a prod real.

```bash
npm run build     # → dist/
npm run lint      # oxlint
npm run preview   # serve the build (no /api — deploy to a preview URL to test the form)
```

## Deploying

Push to the repo connected to Vercel. Vercel auto-detects Vite, builds `dist/`, and turns
`api/contact.js` into a function — no `vercel.json` needed. Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` in the project's Environment Variables.

> **TODO before real traffic:** the `from` address is currently Resend's shared
> `onboarding@resend.dev` sandbox sender. Verify the shop's domain in Resend and swap it
> for `builds@revvdynamics.com` (or similar), otherwise deliverability will suffer.

---

## Decisions & tradeoffs

The questions that came up while building this, and how they got answered.

**Next.js or plain Vite + React?**
Vite. It's a marketing site with three routes and no data fetching — nothing here needs
SSR, layouts, or server components. Next.js would have been extra concepts for zero gain.
The one thing we *do* need a server for (sending email) is a single function, and Vercel
runs a bare `api/*.js` file for you regardless of framework.

**How does the form send email without a backend server?**
It doesn't need one — `api/contact.js` is a serverless function, spun up per request. The
alternative (a form service like Formspree) would have meant no control over the email
template and no attachment handling. Resend is a few lines of `fetch` and the HTML is ours.

**Can the form be tested without deploying every time?**
This was the annoying part. Vite's dev server doesn't know about `/api`. Rather than
duplicate the handler or run a second Express process, `vite.config.js` mounts a ~15-line
middleware that adapts Vite's raw Node request/response into the shape Vercel's handler
expects, then imports and calls the real handler. Dev and prod execute the same file.

**Spam protection — captcha?**
No. A hidden `website` input (the honeypot) catches the overwhelming majority of bot
submissions at zero cost: no third-party script, no cookie banner implications, no
"select all the traffic lights" friction for a customer who just wants a quote. If real
spam gets through later, that's when a captcha or rate limit earns its place.

**Why cap attachments at 2.5 MB?**
Vercel's function request body limit is 4.5 MB. Base64-encoding inflates a file by ~33%,
and JSON adds more on top — so 2.5 MB of raw photos is roughly the largest payload that
reliably fits. The cap is enforced *twice*, in the browser (fast, friendly error) and in
the handler (the one that actually counts). If bigger photos are ever needed, the upgrade
path is uploading straight to Vercel Blob from the client and sending only the URLs.

**GSAP for everything?**
No. GSAP earns its keep on the pinned scroll sequence and staggered reveals, where
hand-rolling the timeline logic would be genuinely painful. But a stat counter that fires
once when it scrolls into view is what `IntersectionObserver` is *for* — it ships with the
browser and costs nothing. Reaching for GSAP there would have been habit, not reasoning.

**Why is `App.jsx` one 1500-line file?**
Because it's one page. Every section is used exactly once, in one order, and splitting them
into nine files would mean nine imports and nine tabs to trace a single scroll. Colocation
wins until a section gets reused or the page grows a second layout — that's the moment to
split, not before.

**Chart library for the dyno curve and RPM gauge?**
No — they're decorative, not data. A charting dependency would ship a few dozen KB to draw
two shapes that never change. They're hand-authored SVG paths animated by GSAP.

**Where do the shop's opening hours come from?**
A pure function over `new Date()`, ticking once a minute. It's a fixed weekly schedule for
a single location — an API or CMS field would be infrastructure for a value that changes
once a decade.
