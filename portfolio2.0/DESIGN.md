# Portfolio Design Spec — "Linux Desktop"

Reference mockup (published canvas): https://claude.ai/code/artifact/182ec82b-7d28-4e39-b182-0537a9cc8060

One-screen, no-scroll portfolio staged as a Linux desktop (KDE-Plasma-style panel + widgets + dock) with the actual portfolio content living inside a single floating terminal window with tabs. Strict black-and-white theme with a light/dark toggle.

## 1. Concept

- The whole viewport **is** the desktop. No page scroll, no routing between pages — everything is one composition, `height: 100vh; overflow: hidden`.
- All portfolio content (about / projects / activity / contact) lives inside **one terminal window**, switched via **tabs** in the terminal's own tab bar — not via a site nav, not via scrolling.
- Everything outside the terminal (top panel, big clock widget, dock) is desktop chrome: mostly atmospheric, with two real pieces of function embedded in it (the clock, the theme toggle).
- Palette is strictly achromatic (`chroma: 0` throughout) — no accent color anywhere, in either theme. Two themes only: dark (near-black bg, near-white text) and light (inverse). No warm/cool tint.
- One typeface only: **JetBrains Mono**, weights 300–800. No secondary display or body font — the monospace commitment is the whole point (avoid the temptation to mix in a sans/serif for "readability"; that breaks the terminal illusion).

## 2. Layout zones

```
┌─────────────────────────────────────────────── panel (30px, full width) ───┐
│ [::: grid] [pager] [17:46 · Mon 3 Mar]        [vol][wifi][batt 78%][EN][◐] │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   17:46                                     ┌─────────────────────────┐   │
│   MON, MARCH 3           (wallpaper)        │ ● ● ●   darwin@cit-u: ~ │   │
│   ← big clock widget                        ├─────────────────────────┤   │
│                                              │ about │projects│activity│contact│
│                                              ├─────────────────────────┤   │
│                                              │  (active tab content)  │   │
│                                              │                         │   │
│                                              └─────────────────────────┘   │
│                                                                             │
│                          ┌──────────────────────────┐                     │
│                          │  ▤   ⊙   ▣*  ✉   ⚙        │  ← dock (floating, │
│                          └──────────────────────────┘     centered bottom)│
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Wallpaper**: fills the viewport behind everything. Original abstract grayscale composition (soft radial gradients + a fine grain overlay) — *not* a photo. If a real wallpaper image is supplied later, swap it in as `background-image` on `.wallpaper`; keep it desaturated/grayscale to hold the B&W rule.
- **Top panel**: 30px bar, `position: fixed/absolute` top, translucent (`background: black/white @ ~45% opacity` + `backdrop-filter: blur(10px)`). Left: app-grid glyph + 4-dot workspace pager (decorative) + live clock/date (small). Right: volume/wifi glyphs (decorative), battery indicator (decorative, static ~78%), "EN" chip (decorative), then the **real** theme toggle switch, styled to tray-icon scale.
- **Big clock widget**: absolutely positioned upper-left of the desktop area (~6% left, ~11% top), large light-weight digital time + date underneath in small tracked caps. Same live clock state as the panel's small clock — don't duplicate the timer, share one tick.
- **Dock**: centered, floating pill near the bottom (`border-radius`, translucent + blur, thin border). 5 decorative app glyphs; the one representing "this app" (terminal) is visually active (brighter + small dot under it). Hide on narrow viewports.
- **Terminal window**: the actual content surface. Positioned upper-right-of-center on desktop (not full screen), fixed size (`min(520px, 46vw)` × `min(640px, 78vh)`), drop shadow so it reads as floating above the wallpaper. On narrow viewports it becomes the dominant/near-full-screen element (dock and clock widget hide, panel stays).

## 3. Terminal window anatomy

1. **Title bar** — three outline-circle window dots (no red/yellow/green — stay monochrome), centered title `darwin@cit-u: ~`.
2. **Tab bar** — one row, tabs: `about` · `projects` · `activity` · `contact`. Active tab: brighter text, underline, background matches the pane below it. Right-aligned small muted label `Konsole` (flavor text, not interactive).
3. **Pane** — swaps per active tab. `flex: 1; overflow: hidden` (content must fit without scrolling — see §5).

### Tab: `about`
```
darwin@cit-u:~$ whoami
Darwin Darryl Jean E. Largoza
Full Stack Developer & UI/UX Designer — BSIT, Cebu Institute of Technology University

darwin@cit-u:~$ cat about.md
4th year IT student turning Figma files into production software — full
stack across React, Node.js, and Django. AWS certified in Cloud
Architecting and Cloud Foundations. Comfortable owning a project end to
end, solo or on a team.

Stack: React · TailwindCSS · Node.js/Express · Django · Spring Boot ·
PostgreSQL · MySQL · MongoDB · Figma · Docker

darwin@cit-u:~$ █
```

### Tab: `projects`
Rendered as an `ls -la` listing. Each row is a real link (`target="_blank"`) to the repo. Columns: fake permission string (`drwxr-xr-x`, static), owner (`darwin`, static), date, name, one-line description.

| name | date | stack / desc | url |
|---|---|---|---|
| `ally/` | jan–dec 25 | AI-Powered Legal Platform (Capstone) — React · Vite · Figma · Firebase | github.com/piolonrqz/Capstone-ALLY |
| `notes-app/` | dec 25 | Hybrid Web2/Web3 Notes Platform — React · Node.js · MongoDB · Cardano | github.com/piolonrqz/notes-app |
| `campusxperience/` | may–dec 25 | Campus Event Platform — React · Vite · Spring Boot · Java | github.com/sytrusz/campusxperience |
| `credigo/` | apr–may 25 | System Integration Project (solo) — React · REST API | github.com/Dadaisuk1/CrediGo_IT342 |

Source of truth for this data: `client/src/data/resume.ts` (`projects` export) — reuse that file directly rather than re-typing it.

### Tab: `activity`
GitHub-style contribution heatmap: 53 columns × 7 rows of small squares, 5 opacity levels (`0.08 / 0.28 / 0.5 / 0.72 / 1`) against `var(--fg)`. Month labels above, "Less → More" legend below, italic caption underneath.

**Important for the real build**: the mockup's grid is procedurally generated (deterministic PRNG, not real data) because the design-canvas sandbox has no network access. For production, replace it with a real fetch of `github.com/iamjpxfrd`'s contribution calendar — GitHub doesn't expose this via a public REST endpoint; realistic options are (a) scrape the public contributions SVG (`github.com/users/iamjpxfrd/contributions`) server-side/at build time and cache it, or (b) use a small third-party proxy (e.g. `github-contributions-api`) called at build/deploy time, not client-side on every load. Keep the caption ("live from GitHub") only once this is real; otherwise keep the "sample data" disclosure visible.

### Tab: `contact`
Key/value rows, each a real link:

| key | value | href |
|---|---|---|
| email | darwindarryljean.largoza@gmail.com | Gmail compose deep link (see `client/src/data/resume.ts` → `gmailComposeUrl`) |
| phone | +63 995 662 7081 | `tel:+639956627081` |
| github | github.com/iamjpxfrd | https://github.com/iamjpxfrd |
| linkedin | linkedin.com/in/ddjl | https://www.linkedin.com/in/ddjl/ |
| resume | ./resume.pdf | `/resume.pdf` |

## 4. Color tokens (oklch, chroma 0 throughout)

```css
/* dark (default) */
--wall-a:  oklch(16% 0 0);
--wall-b:  oklch(4%  0 0);
--panel:   oklch(0%  0 0 / 0.42);
--term:    oklch(9%  0 0 / 0.92);
--term-dim:oklch(6%  0 0 / 0.92);
--fg:      oklch(95% 0 0);
--fg-muted:oklch(66% 0 0);
--fg-dim:  oklch(50% 0 0);
--line:    oklch(95% 0 0 / 0.14);

/* light */
--wall-a:  oklch(88% 0 0);
--wall-b:  oklch(70% 0 0);
--panel:   oklch(100% 0 0 / 0.5);
--term:    oklch(98% 0 0 / 0.94);
--term-dim:oklch(93% 0 0 / 0.94);
--fg:      oklch(9%  0 0);
--fg-muted:oklch(38% 0 0);
--fg-dim:  oklch(55% 0 0);
--line:    oklch(9%  0 0 / 0.14);
```

No third theme, no system-preference auto-detect required — it's an explicit toggle (persists via `localStorage` in the real build; the mockup just holds it in memory).

## 5. Fit-to-viewport discipline

Nothing on this page scrolls. That means every tab's content must fit inside the terminal pane's available height at common desktop sizes (~1280–1920px wide, ~800–1080px tall) without clipping:
- Keep the `about` tab's paragraph short (current copy is tuned to ~4–5 lines).
- Keep `projects` to the 4 real entries — don't grow the list without shrinking row height or the pane clips.
- The contribution grid's cell size (7px) and gap (2px) are already tuned tight to fit; don't scale it up without checking against the smallest supported viewport.
- If new content genuinely doesn't fit, prefer shrinking type/row-height over allowing scroll — the "it's a fixed terminal" illusion is the core of this design and should hold at the target viewport range. Below ~700px tall or ~600px wide, it's fine to fall back to a more relaxed (still non-scrolling, but simplified — chrome hidden) layout per the responsive rules in §6.

## 6. Responsive behavior

- `< 900px` wide: hide the big clock widget and the workspace pager/app-grid in the panel; the terminal window expands to near-full-width/height (`right/left: 4%`, `top: 44px`, `height: calc(100vh - 100px)`); dock keeps only the active (terminal) icon, hides the rest.
- Panel stays visible at all sizes (it's cheap chrome, 30px tall).
- Don't introduce a scrollbar at any breakpoint — simplify/hide chrome instead.

## 7. Interactions

- **Tab switch**: click a tab → swap pane content. No animation needed beyond a simple crossfade if desired; instant is fine and matches real terminal emulator behavior.
- **Theme toggle**: single switch in the panel tray. Flips all CSS custom properties (`.theme-dark` / `.theme-light` class on the root). Persist choice in `localStorage`.
- **Clock**: real, ticking. Update once a minute is enough (`setInterval(60_000)`); no need for per-second precision since only `HH:MM` is displayed.
- **Blinking cursor**: CSS-only (`animation: blink 1s steps(1, end) infinite`), no JS.
- **Project/contact rows**: real `<a target="_blank" rel="noopener noreferrer">`, not JS click handlers — keep them crawlable/right-click-able.

## 8. Suggested component breakdown (React)

```
<DesktopStage>                 // the 100vh, overflow-hidden root; owns theme state + clock tick
  <Wallpaper />
  <Panel>                      // top bar
    <PanelLeft />              // app-grid, pager, small clock — all decorative except clock
    <PanelRight>
      ...decorative tray icons
      <ThemeToggle />          // real
    </PanelRight>
  </Panel>
  <ClockWidget />               // big widget, same clock value as PanelLeft's
  <Dock />                      // decorative
  <TerminalWindow>
    <TitleBar />
    <TabBar tabs={['about','projects','activity','contact']} active={tab} onSelect={setTab} />
    <Pane>
      {tab === 'about' && <AboutPane />}
      {tab === 'projects' && <ProjectsPane projects={projects} />}   // from resume.ts
      {tab === 'activity' && <ActivityPane weeks={contribWeeks} />}   // sample data until real API wired
      {tab === 'contact' && <ContactPane rows={contactRows} />}       // from resume.ts (profile, gmailComposeUrl)
    </Pane>
  </TerminalWindow>
</DesktopStage>
```

Reuse `client/src/data/resume.ts` as-is for `profile`, `projects`, `techStack`/capabilities, and the Gmail compose link — don't re-type that content into the new components.

## 9. Open items before/while coding

- [x] Real wallpaper asset — using the two catppuccin-mocha grayscale images from §10 (`storm.jpg` dark, `rocket-launch.jpg` light), self-hosted under `public/wallpapers/`.
- [x] Real GitHub contributions data source (see §3, `activity` tab) — use `react-github-calendar` (see §10). Replaces the seeded fake pattern.
- [x] Font-loading strategy for JetBrains Mono — self-hosted via `@fontsource/jetbrains-mono` (bundled with the app, not a CDN fetch), weights 300–800 + 400-italic imported in `main.tsx`.
- [x] `localStorage` key for theme persistence: `darwin-portfolio-theme`. First-visit default is hardcoded `dark`, no `prefers-color-scheme` auto-detect — matches the explicit-toggle-only design intent (see `useTheme.ts`).

## 10. Prior art

Someone else built a similar-concept "Linux desktop" portfolio: [sankalpaacharya/portfolio](https://github.com/sankalpaacharya/portfolio) — "Linux i3 tiling like portfolio site." Worth knowing about, but it's solving a **different, bigger** problem than this design: full i3-style tiling with draggable/resizable multi-window management, a file manager, and built-in games (Snake, Diamond). This design is deliberately smaller — one fixed floating terminal, tab-switched content, no window management. Don't pull in the tiling/multi-window machinery; it fights the minimalism that's the whole point here.

**Their stack** (Next.js 16 / React 19 / Tailwind v4):

| Library | What it's for | Adopt here? |
|---|---|---|
| `dockview` | VS-Code-style dockable/tileable panel layout engine | **No** — we have exactly one window, no tiling needed |
| `react-draggable`, `react-resizable-panels` | Drag/resize windows | **No** — the terminal window is fixed-position by design |
| `react-github-calendar` | Renders a real GitHub contributions calendar from the public API | **Yes** — this directly replaces our sample-data heatmap (§3 `activity` tab, §9 open item). Style its output to match the mono/grayscale system (it's customizable via theme colors — feed it the same `--fg`/opacity ramp used in the mockup). |
| `next-themes` | Dark/light theme provider + persistence for Next.js | **Yes** — exactly what §7's theme-toggle + `localStorage` persistence needs; no reason to hand-roll it |
| `zustand` | Small global state store | **Maybe** — only if tab state / theme state needs to be read from more than one component tree; a single `useState` in `DesktopStage` is probably enough for this design's scope (see §8) |
| `framer-motion` | Animation | **No** for now — the mockup's only motion is the CSS-only cursor blink and a tab crossfade; both are cheap without a full animation library |
| `cmdk` | Cmd-K command palette | **No** — not part of this design's interaction model (nav is just the 4 tabs) |
| `react-card-flip`, `react-day-picker`, `date-fns`, `sonner`, `hcaptcha`, `posthog` | Games/file-manager/contact-form/analytics extras for *their* feature set | **No** — none of this applies; we have no games, no file manager, no contact form (contact tab is just links), no analytics requirement specified |
| `radix-ui/*`, `class-variance-authority`, `tailwind-merge`, `lucide-react`/`react-icons`/`hugeicons` | shadcn-style component kit + icons | **Optional** — fine as a general Tailwind/component toolkit if you want one, but this design's chrome (window dots, tray glyphs, dock icons) is a handful of small inline SVGs (see the mockup source) — doesn't need a full icon library pulled in just for those | 

Net recommendation: keep the dependency list small — `next-themes` + `react-github-calendar` are the two genuinely useful adoptions from their stack; everything else in their list is there to support features this design intentionally doesn't have.
