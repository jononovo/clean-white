---
name: clawbranding
description: >-
  CreditClaw brand identity and design system with "Fun Consumer" theme, color
  palette, typography, and UI conventions. Use when building or modifying UI
  components for this project.
enabled: true
---

# CreditClaw Brand Identity & Design System

CreditClaw is a fun, consumer-facing service that gives AI agents ("Claw Agents") secure spending power. The brand is playful, approachable, and designed to feel like a modern fintech product for the AI era—without the cold, corporate feel of traditional finance or the complex jargon of crypto.

## Core Identity

- **Name:** CreditClaw
- **Tagline:** Pocket money for your bots!
- **Mission:** The fun, safe way to give your OpenClaw agent an allowance.
- **Tone:** Playful, helpful, lighthearted, trustworthy, "consumer-tech" (not "enterprise-saas").

## Visual Language

The visual style is defined by "Soft Clay 3D" aesthetics, rounded geometry, and a vibrant pastel color palette. It feels tactile, friendly, and modern.

### Logo & Iconography
- **Primary Logo:** "The Golden Claw Chip" – A golden credit card EMV chip where the internal metallic lines subtly form the shape of a lobster claw.
- **Mascot:** A friendly 3D clay-style lobster (often just the claw/pincer) holding a credit card.
- **Style:** Minimalist 3D render, soft lighting, "claymation" texture, isometric views.

### Typography

Rounded, geometric sans-serifs to maintain the friendly, modern vibe.

- **Primary Font (Headings):** `Plus Jakarta Sans`
  - Weights: Bold (700), ExtraBold (800)
  - Usage: Headlines, major calls to action, hero text.
- **Secondary Font (Body):** `Plus Jakarta Sans` (or fallback to system sans)
  - Weights: Regular (400), Medium (500)
  - Usage: Body copy, UI elements, buttons.
- **Monospace (Code/Data):** `JetBrains Mono`
  - Usage: Transaction IDs, code snippets, technical data.

### CSS Font Variables
```css
--font-sans: 'Plus Jakarta Sans', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

## Color Palette

The palette is vibrant but soft, avoiding harsh neons. Uses "Lobster Orange" as the primary brand color, supported by ocean blues and fun purples.

| Color Name | HSL Value | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Lobster Orange** | `hsl(10 85% 55%)` | `--primary` | Primary actions, brand accents, the "Claw" |
| **Ocean Blue** | `hsl(200 95% 60%)` | `--secondary` | Secondary actions, trust indicators |
| **Fun Purple** | `hsl(260 90% 65%)` | `--accent` | Accents, gradients, "magic" moments |
| **Deep Navy** | `hsl(222 47% 11%)` | `--foreground` | Primary text, strong contrast elements |
| **Soft Cloud** | `hsl(210 40% 98%)` | `--background` | Page backgrounds, subtle surfaces |
| **White** | `hsl(0 0% 100%)` | `--card` | Cards, input fields, popovers |
| **Muted** | `hsl(210 40% 96%)` | `--muted` | Muted backgrounds |
| **Muted Text** | `hsl(215 16% 47%)` | `--muted-foreground` | Secondary text, descriptions |
| **Border** | `hsl(214 32% 91%)` | `--border` | Borders, dividers |

### Color Usage in Code
All colors use HSL format without the `hsl()` wrapper. Usage: `hsl(var(--variable-name))`

```jsx
<p className="text-foreground">Primary text (Deep Navy)</p>
<p className="text-muted-foreground">Secondary text</p>
<span className="text-primary">Lobster Orange accent</span>
<span className="text-secondary">Ocean Blue accent</span>
<span className="text-accent">Fun Purple accent</span>
```

## UI Design System ("Fun Consumer")

### Theme
- **Single theme only** – light mode, no dark mode
- Theme variables defined in `app/globals.css` under `:root`

### Rounded Corners
Generous border radius (`1rem` / `16px`) on buttons, cards, and inputs.
```css
--radius: 1rem;
```

### Depth & Effects
- Soft, colorful shadows: `shadow-xl shadow-primary/20`
- Backdrop blurs: `backdrop-blur-md` for glassmorphism on nav bars and floating elements
- Grainy noise-textured gradients for dark section backgrounds

### Buttons
- **Primary:** Solid Lobster Orange with rounded full caps
  ```jsx
  <Button className="rounded-full bg-primary text-white hover:bg-primary/90 font-bold shadow-lg shadow-primary/25">
  ```
- **Secondary/Ghost:** White with subtle borders
  ```jsx
  <Button variant="ghost" className="font-bold text-neutral-600 hover:bg-neutral-50">
  ```
- **Icon Buttons:** Circular, transparent until hovered
  ```jsx
  <Button size="icon" className="rounded-full bg-transparent hover:bg-neutral-900 hover:text-white">
  ```

### Cards
```jsx
<div className="p-8 rounded-3xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all border border-neutral-100">
```

### Inputs
```jsx
<Input className="h-16 rounded-full bg-white border-2 border-neutral-100 shadow-xl text-xl focus-visible:ring-primary focus-visible:border-primary" />
```

### Interactive Elements
- All clickable elements must have `cursor-pointer`
- Generous hover transitions: `transition-all duration-300`
- Scale on hover for icons: `group-hover:scale-110 transition-transform`

## Animations

Defined in `app/globals.css`:

| Class | Effect | Usage |
| :--- | :--- | :--- |
| `animate-fade-in-up` | Fade in + slide up (0.5s) | Staggered content reveals |
| `animate-pop-in` | Rotate + scale bounce (0.8s) | Hero images, cards |
| `animate-float` | Gentle vertical float (4s loop) | Floating badges, decorative elements |
| `animate-float-delayed` | Float with 1s delay (5s loop) | Secondary floating elements |

Stagger with inline `animationDelay`:
```jsx
<div style={{ animationDelay: '0.2s' }} className="animate-fade-in-up">
```

## Brand Assets

Located in `public/images/creditclaw/`:

| File | Description |
| :--- | :--- |
| `logo-claw-chip.png` | The Golden Claw Chip logo (favicon) |
| `logo-claw.png` | Full logo mark |
| `fun-lobster-black-card.png` | Hero image – lobster with black card |
| `fun-claw-card.png` | OG/social media card image |
| `fun-lobster-pink-card.png` | Pink card variant |
| `fun-whole-lobster-card.png` | Full lobster with card |
| `avatar_1.jpg` - `avatar_3.jpg` | Community avatars |

## Key Files

- `app/globals.css` - Theme variables, animations, base styles
- `app/layout.tsx` - Fonts, metadata, favicon
- `components/landing/` - Landing page section components
- `components/ui/` - shadcn/ui primitives

---
*Created: February 2026*
