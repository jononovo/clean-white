---
name: clawhub-branding-skill
description: SecureClawHub design system with theme variables, typography scale, and styling conventions. Use when building or modifying UI components for this project.
---

# SecureClawHub Branding & Design System

This skill documents the complete design system for SecureClawHub, including dual theme support (Slate/Warm × Light/Dark), typography scale, and component styling conventions.

## Theme System

SecureClawHub supports 4 theme combinations:
- **Slate Light** (default)
- **Slate Dark**
- **Warm Light**
- **Warm Dark**

Themes are controlled via:
- `data-theme="slate"` or `data-theme="warm"` on `<html>`
- `.dark` class on `<html>` for dark mode

### Theme CSS Variables (app/globals.css)

All colors use HSL format without the `hsl()` wrapper. Usage: `hsl(var(--variable-name))`

#### Slate Light (Default)
```css
--background: 210 20% 98%;
--foreground: 220 15% 10%;
--card: 0 0% 100%;
--muted-foreground: 220 10% 45%;
--accent: 150 60% 95%;
--accent-foreground: 160 84% 39%;
```

#### Slate Dark
```css
--background: 240 5% 8%;
--foreground: 240 5% 96%;
--card: 240 4% 12%;
--muted-foreground: 240 5% 65%;
```

#### Warm Light
```css
--background: 40 20% 97%;
--foreground: 30 15% 15%;
--card: 42 30% 100%;
--muted-foreground: 30 10% 45%;
```

#### Warm Dark
```css
--background: 30 12% 14%;
--foreground: 42 30% 95%;
--card: 30 20% 4%;
--muted-foreground: 30 12% 68%;
--input: 30 12% 20%;
--placeholder: 30 8% 45%;
```

### Card Gradient Pattern

Use this gradient pattern for consistent card styling across all themes:
```jsx
className="bg-gradient-to-b from-card to-card/50 border border-border"
```

This ensures cards adapt properly to all theme combinations.

## Typography Scale

Use semantic HTML heading tags. Defined in `app/globals.css`:

| Tag | Size | Weight | Use Cases |
|-----|------|--------|-----------|
| `h1` | 30px (text-3xl) | Bold | Page titles, hero headings |
| `h2` | 24px (text-2xl) | Bold | Section headers, modal titles |
| `h3` | 20px (text-xl) | Semibold | Card titles (large), panel headers |
| `h4` | 18px (text-lg) | Semibold | Card titles (standard), list headers |
| `h5` | 16px (text-base) | Medium | Card subtitles, form labels |
| `h6` | 14px (text-sm) | Medium | Meta text, badges, timestamps |
| `p` | 16px (text-base) | Regular | Body text, descriptions |

Additional sizes: `text-sm` (14px), `text-xs` (12px)

## Font Stack

```css
--font-sans: 'Inter', sans-serif;        /* UI/Body text */
--font-display: 'Plus Jakarta Sans';     /* Headings */
--font-mono: 'JetBrains Mono';           /* Code/data */
```

## Color Semantics

| Role | Variable | Usage |
|------|----------|-------|
| Trust/Safe | `--accent` / `emerald-500` | Security scores, success states |
| Warning/Risk | `--destructive` / `red-500` | Threats, critical alerts |
| Primary text | `--foreground` | Headings, important text |
| Secondary text | `--muted-foreground` | Descriptions, labels |

## Component Conventions

### Buttons
- Primary: `bg-primary text-primary-foreground`
- Secondary: `bg-secondary text-secondary-foreground border`
- Accent: `bg-accent text-accent-foreground`

### Cards
- Standard: `bg-gradient-to-b from-card to-card/50 border border-border`
- Glass effect: `bg-card/80 backdrop-blur-xl border border-border`

### Inputs
- Use `bg-input` (not `bg-transparent`) for proper theme support
- Placeholder colors are theme-aware via `--placeholder` variable

### Interactive Elements
- All clickable elements must have `cursor-pointer`
- Use `hover:text-primary` or `hover:text-accent` for link hovers

## Key Files

- `app/globals.css` - Theme variables and base styles
- `docs/branding.md` - Full branding guidelines
- `components/ui/` - shadcn/ui components
- `tailwind.config.ts` - Tailwind configuration

## Common Patterns

### Text that adapts to themes
```jsx
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
```

### Accent/highlight text
```jsx
<span className="text-accent-foreground">Emerald accent</span>
<span className="text-destructive">Red warning</span>
```

### Border colors
```jsx
<div className="border border-border">Theme-aware border</div>
```
