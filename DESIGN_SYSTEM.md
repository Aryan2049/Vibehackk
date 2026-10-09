# Oops!Mart Design System

This document covers both the **visual identity** and the **behavioural identity** of Oops!Mart. It is the reference for anyone changing the UI. The rule it exists to protect:

> The storefront must look like a premium shop and behave like an increasingly chaotic, malfunctioning platform.
> The contrast between premium design and ridiculous behaviour is the whole idea.

If a change makes the site uglier to serve the joke, it is the wrong change. The site must stay attractive with every animation disabled.

---

## 1. Visual identity

### 1.1 Palette

All colour flows through semantic custom properties declared once in `src/index.css` under `:root`. Components must never hardcode raw colour values.

| Token | Value | Role |
| --- | --- | --- |
| `--cream` | `#FFF8ED` | Warm cream page surface |
| `--cream-deep` | `#F7EAD6` | Recessed cream, inputs and tracks |
| `--paper` | `#FFFFFF` | Cards, panels, drawer |
| `--white` | `#FFFFFF` | Pure white for inner surfaces |
| `--ink` | `#1B1B22` | Default body text |
| `--navy` | `#17243D` | Deep navy. Headings, dark surfaces, outline text |
| `--navy-2` / `--navy-3` | `#27365A` / `#3C4F7E` | Navy steps for secondary text and borders |
| `--coral` | `#FF6248` | Primary accent and primary button fill |
| `--coral-ink` | `#C9351A` | Accessible coral for text on light surfaces |
| `--coral-soft` | `#FFDCD4` | Soft coral fill for notices |
| `--yellow` / `--amber` | `#FFD65A` | Bright yellow, sale stickers and dark-surface highlights |
| `--amber-soft` | `#FFF0C2` | Soft yellow fill for eyebrow and notice chips |
| `--mint` / `--teal-soft` | `#DDF3E4` / `#D9F2EE` | Soft mint fills |
| `--teal` / `--teal-2` | `#109C8E` / `#0B7A6F` | Success and confirmation. `teal-2` when text sits on light fills |
| `--grey` / `--grey-2` | `#636B7E` / `#8D96A9` | Supporting text |
| `--line` / `--line-2` | `#EADFCB` / `#EFE8DC` | Hairlines on cream and white |

**Never** use purple or violet gradients, stock gradient fills, or fully rounded pill buttons.

### 1.2 Contrast rules

Text colour is chosen so every label meets WCAG AA:

- Coral text on light surfaces uses `--coral-ink` (5.2:1), never `--coral`.
- Coral and teal filled buttons carry `--navy` or white text depending on the fill, verified by ratio, never by habit. `--coral` is a light-value colour, so white on `--coral` fails and is forbidden.
- `--btn--primary` inverts to navy on hover so the primary action stays high contrast in both states.
- Error messages on soft fills use `--navy`, not a saturated red.

### 1.3 Typography

Family is `Plus Jakarta Sans` for interface text and `Fraunces` for display headings, loaded in `index.html` with a system fallback chain. No additional font dependency is added.

| Token | Value | Use |
| --- | --- | --- |
| `--fs-base` | `16px` | Base text |
| `--fs-body` | `15.5px` | Body copy |
| `--fs-support` | `13.5px` | Supporting text, blurbs, meta |
| `--fs-label` | `12px` | Labels and captions |
| `--fs-h2` | `clamp(28px, 3.4vw, 36px)` | Section headings |
| `--fs-hero` | `clamp(40px, 6.4vw, 72px)` | Desktop hero heading, responsive down to mobile |

Body text sits at 15.5 to 16px. Hero headings are large and tight; section headings are confident; everything else is set for scanning a catalogue.

### 1.4 Spacing

A 4px base scale. Use the token, not an arbitrary number.

`--sp-1` 4, `--sp-2` 8, `--sp-3` 12, `--sp-4` 16, `--sp-5` 20, `--sp-6` 24, `--sp-7` 32, `--sp-8` 40, `--sp-9` 48, `--sp-10` 56, `--sp-11` 64, `--sp-12` 80.

`--space-section: 64px` sets vertical rhythm between sections.

### 1.5 Shape and elevation

Radii: `--r-xs` 6, `--r-sm` 9, `--r` 13, `--r-lg` 19. Corners are consistently rounded but never fully pill-shaped on buttons.

Shadows: `--shadow-sm` for resting cards, `--shadow` for hover, `--shadow-lg` for overlays and dialogs. Shadows are soft and navy-tinted so they read as depth, not haze.

### 1.6 Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--t-instant` | `120ms` | Press and focus feedback |
| `--t-quick` | `200ms` | Colour and border changes |
| `--t-standard` | `300ms` | Panels, reveals, value transitions |
| `--t-playful` | `550ms` | Bounces, stickers, playful movement |
| `--t-stage` | `1000ms` | Multi-stage reaction beats |

Easings: `--ease-spring` for playful overshoot, `--ease-out` for entrances and reveals, `--ease-in-out` for continuous oscillation.

Animate `transform`, `opacity`, `clip-path` and colour. Avoid animating layout properties.

### 1.7 Focus

`--focus-color` and `--focus-ring` drive every `:focus-visible` state. Focus rings must remain visible against cream, white and navy. Never remove outlines without replacing them.

### 1.8 Z-index layers

`--z-ambient` 0, `--z-content` 1, `--z-nav` 55, `--z-strip` 60, `--z-chaos` 80, `--z-scrim` 90, `--z-drawer` 95, `--z-modal` 100, `--z-overlay` 110, `--z-cursor` 112, `--z-toast` 120, `--z-bot` 125, `--z-demo` 130.

Reactions sit above the page but below toasts, the support bot and demo controls, so help and control surfaces are never trapped behind an effect.

### 1.9 Breakpoints

`700px` for phone, `980px` for tablet and single-column layouts. CSS variables cannot be used in media queries, so these values are documented here and used directly.

---

## 2. Behavioural identity

This is the half that stops the site being a normal shop.

### 2.1 Personality at rest

Humour must be visible before the first click:

- The hero carries an absurd headline, a rotating announcement strip, a sale countdown that occasionally **adds** time, a system-health indicator that reports everything is "probably fine", and a promo label that changes its wording.
- Product cards carry a rotating sticker, a fictional review snippet, and occasional idle motion.
- Small details react on hover: the shoes dodge the pointer, the sticker wobbles, the illustration lifts.
- A fictional support notification appears once on its own.

**Restraint is part of the identity.** Not everything moves at once. Ambient motion is slow and low contrast. One card is spotlighted at a time. The page must remain readable while it misbehaves.

### 2.2 Product reaction contract

Every product declares a category, a reaction type, a headline, a comedic message, a duration and a recovery action. Every reaction:

1. Has a setup, a visible payoff, and a recovery.
2. Provides a recovery button, or an explicit in-effect action.
3. Auto-recovers after a positive timeout. No reaction runs forever.
4. Never mutates product or cart data.
5. Never blocks navigation, search, cart or keyboard use.
6. Supports rapid re-triggering without stacking timers or particles.

The reaction overlay sets `pointer-events: none`; only the action bar re-enables pointer events. This is enforced by a test.

### 2.3 Animation principles

- Instant feedback, quick transitions, standard transitions, playful movements and staged sequences follow the duration tokens above.
- Every motion has a clear trigger, a payoff, and a way back to normal.
- Particle counts are bounded and deterministic per effect.
- Timers, listeners and temporary nodes are cleaned up on unmount.
- Repeated activation must not accumulate state.
- `resetAllEffects()` is the single escape hatch: it clears the active reaction, particles, the shake state and the notification overlays without touching the shopping data.

### 2.4 Shopping integrity

Jokes never alter real data. Prices, quantities, subtotals, discounts and totals are plain arithmetic. Coupons apply only their stated benefit. The cart drawer, quantity controls and checkout stay usable during every reaction. Persistence uses `localStorage` under `oopsmart.cart.v2`.

### 2.5 Reviews and checkout

Reviews are fiction and are labelled as fiction in the interface. The checkout is a labelled demo, requests no payment credentials, validates required fields, and never traps the user in a loading state or allows an animation delay to create a duplicate order.

### 2.6 Accessibility

- Semantic HTML, labelled controls, accessible names on icon-only buttons.
- Dialogs are `role="dialog"`, `aria-modal`, trap focus while open, restore focus on close, and close on `Escape`.
- Status changes are announced through `aria-live` regions.
- Touch targets have a 44px floor on coarse pointers.
- `prefers-reduced-motion` is respected: big shakes become brief fades, particle counts drop, marquee and scroll motion stop, and **no functionality is removed**.
- The decorative cursor trail is pointer-events-none and only appears in selected scenes. The system cursor is never hidden or replaced.
- Continuous flashing and uncontrolled shake effects are forbidden.

### 2.7 Demo mode

Demo mode is discreet, separate from the customer experience, and must:

- reset active effects and restore the normal storefront
- clear temporary particles and notifications
- reset the cart only after explicit confirmation
- replay the signature milk spill
- launch any individual reaction on demand
- work reliably even when several effects are active at once

---

## 3. Component vocabulary

The shared building blocks, and where they live:

| Concern | Location |
| --- | --- |
| Tokens, layout, card and hero styles | `src/index.css` |
| Reaction overlay styles and per-product keyframes | `src/reactions.css` |
| Reaction shell, actions, particle primitives | `src/reactions/shell.tsx` |
| Reaction registry and auto-recovery timings | `src/reactions/registry.tsx` |
| Product data and reaction copy | `src/data/products.ts` |
| Quips, achievements, stickers, chatbot script | `src/data/comedy.ts` |
| Search and aliases | `src/search.ts` |
| Cart, coupons, persistence | `src/store.ts` |
| Artwork (inline SVG only, no remote images) | `src/components/Art.tsx` |

Reuse the shared primitives (`Droplets`, `Bubbles`, `Crumbs`, `Sparks`, `ReactionShell`, `Confetti`, `Toasts`) instead of writing new ones. Adding a joke means adding data, not a new architecture.

---

## 4. Non-goals

- No purple or violet gradients.
- No pill-shaped buttons.
- No ugliness for its own sake.
- No remote image dependency for core functionality.
- No animation that blocks shopping.
- No real payment collection.
- No external services for jokes: the chatbot, countdown and sound effects are all local and deterministic or synthesised.
