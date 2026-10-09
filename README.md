# Oops!Mart

> You shop. We make it worse.
>
> Your satisfaction is our biggest technical issue.

Oops!Mart is a fully functional, self-contained interactive parody e-commerce storefront where the items are faulty, gravity is negotiable, and the checkout experience is a test of emotional endurance. 

Built with zero external CSS/UI frameworks, an inline Web Audio synthesizer, an antigravity `requestAnimationFrame` physics loop, and procedural visual penalties, the store delivers an escalating comedic experience while maintaining an accurate, persisted shopping cart.

---

## What's New & Architecture Overview

### 1. Editorial Hero Section
- **Typography & Aesthetics**: Designed with Google Fonts (`Fraunces` 900 serif headlines & `Plus Jakarta Sans`), warm cream palette (`#fcfaf6`), coral accents (`#ff6248`), and dark navy cards (`#0f172a`).
- **Live Countdown Clock**: Ticking timer (`10:44:44`) with tabular numerals and custom tick logic.
- **System Status Health Indicator**: Live pulsing teal beacon reporting *"All systems nominally nominal"*.
- **Interactive Action CTAs**:
  - `SHOP THE CHAOS`: Smooth-scrolls directly to the product section.
  - `🥛 See the milk spill`: Smooth-scrolls and triggers the signature sentient milk cascade catalyst.
- **Hero Art Visual Card**: Stylized Oops!Mart shopping bag illustration with tipped milk carton, hovering `-400% off` wobbling sticker, price badges, and parody guarantees.

### 2. Kinetic Products Section & Entropy Pipeline
- **Seamless Stage**: Blends directly into the page's warm cream backdrop, ditching isolated boxed enclosures for an open, magazine-grade layout.
- **Pristine Load Phase**: 12 parody products across 3 categories initialized into an aligned 4×3 grid with `transform: rotate(0deg)`. Physics calculations run silently while elements stay stationary until interaction.
- **Zero-Patient Catalyst**: Clicking "Add to Cart" on any product kicks off `chaosTriggered = true`, immediately detaches that card, assigns it an upward kinetic explosion vector (`vx = 5, vy = -6`), and triggers its procedural visual penalty.
- **1,500ms Chain-Reaction Entropy**: A background scheduler randomly selects and detaches remaining static cards one by one, spinning and drifting them upward into an interactive antigravity orbit.
- **Procedural Screen-Wipes**:
  - Fluid milk/water washes with countdown wipe-down buttons.
  - Violent screen shakes and chromatic shatter glitches.
  - Cascading banana slips and blackout pinhole vignettes.
- **Escaping Checkout Bubble**: A floating, pulsing coral badge that physically repels away from the mouse cursor when approached.
- **Cart Sabotage & Torture Modals**:
  - Calculates real item weight in addition to price.
  - Cart collapse explosion when cumulative weight surpasses 50kg.
  - Interactive multi-step verification modals:
    - Impossible CAPTCHA ("Click all images containing existential dread").
    - Terms and Conditions reading speed trap (must scroll for 4.2 seconds).
    - Uncooperative confirmation button that changes text.

### 3. Support That Will Not Support You
- **Phone Support**: `Ring 0800–OOPS. A recorded message will sigh, then the line will cut out, then it will text you.`
- **Email Support**: `Write to help@oopsmart.example. Replies arrive within 30 days and one apology, usually in that order, occasionally swapped.`
- **Postal Support**: `Send a letter to our head office. It is a milk crate behind a laundrette. It is waterproof. Mostly.`
- Interactive modal alerts on card clicks.

### 4. Comprehensive Site Footer
- **Dark Navy Palette (`#0b1329`)**: Seamlessly anchors the page with white/slate typography and yellow star badge.
- **Footer Navigation**:
  - **SHOP**: Category quick filters (`Dairy & Drinks`, `Food & Groceries`, `Electronics`, `Fashion`) that scroll and filter the inventory dynamically.
  - **COMPANY**: Links to *Our promise*, *Careers (still hiring an animator)*, *Press (do not press it)*, and *Blog (abandoned in 2019)*.
  - **LEGAL**: Links for *Terms of mild chaos*, *Privacy (we know your cart)*, *Returns within 30 days*, and *Cookie policy (chocolate, 70%)*.
- **Footer Credentials**: Hackathon metadata, reduced motion indicators, and local persistence status.

---

## Storefront Inventory

| Product | Category | Weight | Wipe / Effect |
| --- | --- | --- | --- |
| **Dehydrated Water (Canned)** | Absurd Groceries & Edibles | 5kg | Solid matte dry run block |
| **Spicy Ice Cubes** | Absurd Groceries & Edibles | 12kg | Icy/crimson chromatic screen shake |
| **Fresh Milk (Sentient)** | Absurd Groceries & Edibles | 18kg | Sentient milk fluid screen flood |
| **Banana Wraps** | Absurd Groceries & Edibles | 12kg | Slippery cascade banner |
| **Used Bubble Wrap (100% Popped)** | Hostile Homeware & Gadgets | 2kg | 100 clickable popped spans |
| **Inverted Flashlight (Emits Shadows)** | Hostile Homeware & Gadgets | 20kg | Blackout vignette pinhole |
| **Used Toaster (Sparks Daily)** | Hostile Homeware & Gadgets | 24kg | Shatter screen & spark sound |
| **Unstable Laptop (Do Not Bump)** | Hostile Homeware & Gadgets | 35kg | Glitch font scramble |
| **Invisible Socks (Guaranteed Missing)** | Existential Fashion & Apparel | 0kg | Text color transparency toggle |
| **Cement Sneakers (True Heavyweight)** | Existential Fashion & Apparel | 60kg | Heavy weight cart trigger |
| **Emotional Overcoat (Heavy)** | Existential Fashion & Apparel | 40kg | Screen dim & heavy sighs |
| **Reverse Sunglasses (Only Night)** | Existential Fashion & Apparel | 1kg | High-contrast neon filter |

---

## Quick Start

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
```

Open `http://localhost:5173` in your browser.

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the Vite dev server on port `5173` |
| `npm run build` | Compiles production assets |
| `npm run preview` | Serves the build output locally |

---

## Technology Stack

- **Single-File Architecture**: Self-contained `index.html` orchestrating CSS variables, responsive typography, HTML markup, and JavaScript engine.
- **Physics Engine**: Pure vanilla `requestAnimationFrame` velocity vector loop calculating elastic border bounces and repulsion vectors.
- **Audio Synthesizer**: Web Audio API oscillator synthesizing custom UI pops, shatter cracks, and warning buzzers without external audio files.
- **Persistence**: Cart and state stored locally in `localStorage`.
- **Zero Heavy Runtime Dependencies**: Pure vanilla HTML/CSS/JS served blazing fast via Vite.
