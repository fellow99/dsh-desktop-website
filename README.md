# deepseek-harness-desktop-website

> Product website (landing page) for the **DeepSeek Harness Desktop Editions** — the official
> homepage of [deepseek-harness-desktop](../deepseek-harness-desktop) and
> [deepseek-harness-harmony](../deepseek-harness-harmony).
>
> Live: <https://fellow99.github.io/deepseek-harness-desktop-website/>

This document is the **design document** for the website: positioning, copy, structure,
design system, interactions, and localization/deployment rules.

---

## 1. Overview

A **pure static, zero-dependency** site — plain HTML/CSS/vanilla JS, no framework, no build
step, no external requests (fonts/CDN/analytics). It must render fully offline via `file://`
and is deployed to GitHub Pages by a [workflow](./.github/workflows/pages.yml).

| File | Purpose |
|---|---|
| `index.html` | English page (`lang="en"`) |
| `index_zh.html` | Simplified Chinese page (`lang="zh-CN"`), 1:1 structural mirror of `index.html` |
| `style.css` | Shared stylesheet — all theming via CSS custom properties |
| `script.js` | Shared theme-toggle logic (language-neutral, `data-label-*` driven) |
| `images/light.png` `images/dark.png` | Real product screenshots of the dsh Web UI, light & dark theme (2398×1600) |

## 2. Positioning & key messages

- **What it is**: marketing landing for two open-source native desktop shells of DeepSeek
  Harness (`dsh`): an Electron shell (Windows / Linux / macOS) and a HarmonyOS port
  (2in1 / tablet). Both run the **official, unmodified dsh Web UI** same-origin.
- **Hero slogan**: EN *"Your agent harness, at home on the desktop."* ·
  ZH *「让 DeepSeek Harness 在桌面安家」*.
- **Four-desktop coverage is the headline differentiator** — Windows, Linux, macOS
  (Electron Desktop) + HarmonyOS. It appears in: hero lede, the four OS chips
  (`ul.os-strip`) under the lede, both platform cards, and the platforms disclaimer.
- **Selling points (feature cards)**: 100% official dsh, zero upstream changes ·
  local-first, in-process host · a desktop citizen (tray / notifications / frameless /
  clipboard) · plugin marketplace one click away.
- **Architecture story ("How it works")**: in-process Host → same-origin UI → official
  data plane (`WebApiClient`), ending with "No CORS · No auth dance · No custom protocol".
- **Current versions**: `deepseek-harness-desktop` **v0.1.5** and `deepseek-harness-harmony`
  **v0.1.5**, both built on deepseek-harness **`dsh-v0.1.5-rc.2`** — the tag each project's
  `patches/dsh-v0.1.5-rc.2/` directory and build script pin. Keep the website copy, these
  numbers, and the two product READMEs in step.

### Copy accuracy guardrails (must hold forever)

- Every claim traces back to the product READMEs or source. Examples baked in today:
  macOS is covered because `forge.config.ts` ships `MakerDMG` + darwin/`win32`/`linux`
  `MakerZIP`; HarmonyOS verification is HarmonyOS 6.1.0.135 (API 24); `better-sqlite3`
  session search exists only on the HarmonyOS edition.
- **Never fabricate** capabilities: no auto-update, no code signing, no store
  distribution, no "official DeepSeek product" phrasing — the shells are **independent,
  open-source** projects built on DeepSeek AI's DeepSeek Harness.
- The screenshot UI is Simplified Chinese (real product); the caption states this so
  the English page never misleads.
- When product facts change, update **both** language pages and this doc's facts.

## 3. Page structure

Both pages share one vertical structure (6 landmark sections):

1. **Nav** (`header.site-header`): wordmark + `· Desktop`/`· 桌面版` suffix · anchor links
   (Features / Platforms / How it works) · language switch · theme toggle. Nav links hide
   ≤ 760px; brand + language + theme remain.
2. **Hero** (`section#top`): left copy column — mono eyebrow chip, `<h1>`, lede,
   `ul.os-strip` (4 OS chips), CTA row (GitHub CTAs + ghost "How it works"), trust line
   (version/status); right visual column — framed, theme-aware app screenshot + mono caption.
3. **Features** (`#features`): heading + lede + 4 icon cards (2×2 desktop, 1 col ≤ 820px).
4. **Platforms** (`#platforms`): two edition cards with tag + capability bullets + repo
   links, plus a coverage disclaimer.
5. **How it works** (`#how`): 3 numbered steps with arrow connectors, then a result badge.
6. **Footer**: wordmark + one-liner + ©/license line + repo/language links.

EN/ZH must remain **structurally identical** — section order, element classes, and
interaction behavior never diverge; only copy is translated.

## 4. Design system

### Theme tokens (CSS custom properties on `:root` / `html[data-theme="dark"]`)

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#f6f7fb` | `#0a0c11` |
| `--surface` | `#ffffff` | `#12151e` |
| `--text` | `#17181c` | `#eceef3` |
| `--muted` | `#5b6270` | `#99a1b2` |
| `--hairline` | `#e4e7ef` | `#232837` |
| `--accent` | `#4d6bfe` | `#7c93ff` |
| `--accent-soft` | `#eef1ff` | `#1a1f2c` |

- Screenshot shadow tokens `--shot-shadow` / `--shot-shadow-hover` also switch per theme.
- **Theme resolution order**: inline `<head>` script sets `data-theme` from
  `localStorage['dsh-theme']`, else `prefers-color-scheme`, before first paint
  (no flash) → CSS renders tokens; a `@media (prefers-color-scheme: dark)`
  `:root:not([data-theme])` block covers the no-JS case.

### Typography & visual language

- Fonts: system stacks only — sans incl. CJK (`PingFang SC`, `Microsoft YaHei`), mono for
  eyebrows, tags, trust line and captions (CLI/tool signature).
- Mono `$`-prefixed section eyebrows, e.g. `$ why a native shell` / `$ 为什么要原生外壳`.
- One accent indigo, used crisply (solid primary button, hairlines, chip dots) — no
  gradient cards. Radius `--radius-lg 14px`. Easing `--ease` =
  `cubic-bezier(0.22, 0.61, 0.36, 1)`.
- Hero background flourish: faint radial accent glow + 64px grid, token-driven.
- The screenshot is presented as an "app window": 1px hairline border, `--radius-lg`,
  layered resting shadow. No fake window chrome (the dark screenshot already carries the
  real Windows title bar).

## 5. Interactions

1. **Theme toggle** — icon-only button; shows **moon** in light mode and **sun** in dark
   mode (icon = action target). `aria-label` names the *action* and is swapped live via
   `data-label-dark/light`. Manual choice persists to `localStorage['dsh-theme']`.
2. **Hero screenshot theme swap** — both `<img data-shot="light|dark">` are in the DOM;
   pure CSS shows exactly one per active theme (specificity above `.hero-shot img`
   defaults), so the correct screenshot appears even before JS runs. Never swap via JS.
3. **Hover micro-animation (screenshot)** — gentle **decelerating** motion:
   `transform: translateY(-4px)` over `0.5s` + `box-shadow` bloom over `0.65s`
   (`--shot-shadow-hover`). Deliberately slow and soft; disabled under
   `prefers-reduced-motion`.
4. **Hero load-in** — one-time staggered fade/slide (`riseIn`, fill-mode `backwards` so
   later hover transforms are never overridden); nothing else animates.

## 6. Responsive behavior

- 2-col hero ≥ 921px (copy : screenshot = `1fr : 1.44fr`, hero container max-width
  `1380px` so the shot renders ~1.5× scale on wide desktops); single column ≤ 920px.
- Feature/platform grids → 1 column ≤ 820px; nav links hidden ≤ 760px; `.cta-row`
  buttons stack full-width and `.steps` go vertical ≤ 640px.
- Verified no horizontal overflow at 1280 / 768 / 390.

## 7. Development & deployment

```bash
# local preview (any static server works; or just open index.html)
npx serve .        # then http://localhost:3000/index.html
```

Deployment is handled by GitHub Actions
([`.github/workflows/pages.yml`](./.github/workflows/pages.yml)): every push to `main`
(and manual `workflow_dispatch`) uploads the repo root and deploys to GitHub Pages.
One-time repo setting required: **Settings → Pages → Source → "GitHub Actions"**.

Expected URL after first deploy: <https://fellow99.github.io/deepseek-harness-desktop-website/>

## 8. Contribution checklist

- [ ] Copy change? Update `index.html` **and** `index_zh.html` (and facts in §2 if needed).
- [ ] New section? Mirror markup 1:1 across both pages + add tokens/styles in `style.css`.
- [ ] Theme/interaction change? Keep token-driven CSS + no-JS fallback + reduced-motion path.
- [ ] Screenshot swap must stay pure-CSS (`data-shot` rules), never JS-driven.
- [ ] Offline check: `file://` open both pages, no console errors, no network requests.
- [ ] Visual check at 1280 / 768 / 390 in both themes.
