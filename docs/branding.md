# SecureClawHub Branding Guidelines

This document outlines the design system, color palette, and visual identity for SecureClawHub. These guidelines ensure consistency across the application and maintain the platform's trusted, security-focused aesthetic.

## 1. Design Philosophy

**"Trusted, Transparent, Technical"**

SecureClawHub combines the aesthetics of a high-security monitoring tool with the approachability of a modern app store. The design should feel:
- **Clean & Clinical:** High usage of whitespace, precise alignment, and subtle borders.
- **Data-Dense but Scannable:** Compact lists and tables that present technical metrics clearly without clutter.
- **Elevated Tech:** Use of "glassmorphism" (backdrop blur), subtle gradients, and refined typography to indicate quality.

## 2. Color Palette

Our color system relies on semantic usage—colors have specific meanings (Trust, Threat, Action).

### Primary Colors
| Role | Color | Hex | Tailwind | Usage |
|------|-------|-----|----------|-------|
| **Primary Brand** | **Deep Navy** | `#15191E` | `slate-900` | Primary actions, headings, strong borders. |
| **Trust / Safe** | **Emerald** | `#10B981` | `emerald-500` | Security scores, "Safe" status, success states. |
| **Warning / Risk** | **Red** | `#EF4444` | `destructive` | Threats, "High Risk" indicators, critical alerts. |

### Secondary & Neutral
| Role | Color | Hex | Tailwind | Usage |
|------|-------|-----|----------|-------|
| **Background** | **Ice Blue/Gray** | `#F8FAFC` | `slate-50` | Page backgrounds, subtle section differentiation. |
| **Surface** | **White** | `#FFFFFF` | `white` | Cards, panels, dropdowns. |
| **Text (Body)** | **Slate Gray** | `#475569` | `slate-600` | Body text, descriptions. |
| **Border** | **Light Gray** | `#E2E8F0` | `slate-200` | Dividers, card strokes. |

## 3. Typography

We use a tri-font stack to differentiate between marketing, UI, and data.

### 1. Headings (Display)
**Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Weights:** Bold (700), ExtraBold (800)
- **Usage:** Page titles, section headers, hero text.
- **Why:** Geometric and modern, it gives the brand a distinct, tech-forward personality.

### 2. Interface (Body)
**Font:** [Inter](https://fonts.google.com/specimen/Inter)
- **Weights:** Regular (400), Medium (500), SemiBold (600)
- **Usage:** Buttons, navigation, body paragraphs, labels.
- **Why:** The industry standard for legibility at small sizes.

### 3. Data & Code
**Font:** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Weights:** Regular (400), Medium (500)
- **Usage:** Version numbers, audit hashes, package names, "lines of code" stats.
- **Why:** Monospaced font implies technical precision and developer focus.

### 4. Typography Size Scale

Use semantic HTML heading tags for consistent sizing across the application. These are defined in `app/globals.css`.

| Tag | Size | Weight | Use Cases |
|-----|------|--------|-----------|
| `h1` | 30px (text-3xl) | Bold | Page titles, hero headings, main section headers |
| `h2` | 24px (text-2xl) | Bold | Section headers, modal titles, major subsections |
| `h3` | 20px (text-xl) | Semibold | Card titles (large), panel headers, sidebar sections |
| `h4` | 18px (text-lg) | Semibold | Card titles (standard), list item headers, table headers |
| `h5` | 16px (text-base) | Medium | Card subtitles, form labels, navigation items |
| `h6` | 14px (text-sm) | Medium | Meta text headers, badges, small labels, timestamps |
| `p` | 16px (text-base) | Regular | Body text, descriptions, form help text |

**Additional Tailwind utilities:**
- `text-sm` (14px): Secondary body text, card descriptions, subcategory links
- `text-xs` (12px): Captions, footnotes, very small labels

**Quick Reference by Component:**
- **Page header:** `<h1>`
- **Section header:** `<h2>`
- **Card title (featured/large):** `<h3>`
- **Card title (standard):** `<h4>`
- **Card subtitle/label:** `<h5>`
- **Meta info/timestamp:** `<h6>`
- **Body content:** `<p>` or `text-base`
- **Secondary text:** `text-sm`

## 4. Components & Styling

### Buttons
- **Primary:** Deep Navy background, White text. Sharp or slightly rounded corners (`rounded-md`).
- **Secondary:** White background, Slate border, Slate text. Hover effects include slight background tint.
- **Ghost:** Transparent background, minimal padding. Used for tertiary actions.

### Cards & Surfaces
- **Glass Effect:** `bg-white/80 backdrop-blur-sm border border-white/60`. Used for floating elements and sticky headers.
- **Standard Card:** `bg-white border border-slate-200 shadow-sm`.
- **Subtle Gradient:** `bg-gradient-to-br from-white via-slate-50 to-emerald-50/50`. Used for the Hero section to add depth.

### Visual Motifs
- **The "Pulse":** Use `animate-pulse` on green status dots to indicate live monitoring.
- **Progress Bars:** Thin, rounded bars to show threat levels or scores.
- **Badges:** Small, uppercase, tracking-wider labels for status (e.g., "SOC2 COMPLIANT", "HIGH RISK").

## 5. Logo Usage

- **Symbol:** A stylized geometric lobster claw inside a shield.
- **Wordmark:** "SecureClawHub" in *Plus Jakarta Sans Bold*.
- **Sizing:** The logo should be prominent in the header (`w-14 h-14` recommended for main layout).

## 6. Interaction & Cursors

- **Rule:** If an element is interactive (clickable), it **must** display the pointer cursor (`cursor-pointer`).
- **Scope:** This applies to buttons, links, clickable cards, list rows, table rows, and any element that triggers an action.
- **Why:** To provide clear affordance and a responsive, app-like feel.

---
*This document serves as the single source of truth for design decisions. Any new features should adhere to these guidelines to maintain visual consistency.*
