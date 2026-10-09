# Oops!Mart

> You shop. We make it worse.
>
> Your satisfaction is our biggest technical issue.

Oops!Mart is a fully working e-commerce storefront where every one of the 28 products has its own catastrophic behaviour. It looks like a polished shop and behaves like a group project finished at 3am. Searching for milk washes the price tags off the screen, the shoes run away from their own product card, and the shopping cart still adds up correctly the whole time.

This was built for a "world's worst e-commerce website" hackathon brief, with one hard rule: the comedy lives in the products, never in the shopping.

---

## What actually works

The joke only lands if the store is real, so all of this is genuine functionality:

- **Search** by product name, category, reaction keyword or blurb, with keyboard-navigable suggestions.
- **Filter and sort** by the 7 categories, price (both directions) and rating.
- **Cart** with add, remove, increase, decrease, correct subtotal, a live item count and a slide-in drawer.
- **Local persistence**, so the cart survives a refresh.
- **Coupons** with real discount maths, and honest messages for codes that do not change the price.
- **Checkout** with field validation, an order summary, a staged confirmation sequence, a fictional order number and confetti.
- **Reset and recovery** for every single animation, plus a discreet demo mode for live demos.

Every product interaction triggers a reaction. Each reaction has a trigger, a payoff, a recovery button and an automatic timeout, so nothing ever traps you on the page.

---

## Quick start

```bash
bun install      # install dependencies
bun run dev      # start the dev server
```

Then open the printed URL. The dev server binds `0.0.0.0`, reads `PORT` from the environment (falling back to `5173`) and runs with HMR disabled for the hosted preview.

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Vite dev server on `0.0.0.0` |
| `bun run build` | Typecheck (`tsc -b`) then build static output to `dist/` |
| `bun run preview` | Serve the built `dist/` locally |
| `bun run typecheck` | `tsc -b --noEmit` |
| `bun run smoke` | Run the smoke suite (57 checks, no browser required) |

No API keys, no backend, no database and no remote assets are required. Every product illustration is inline SVG, so nothing breaks if the network does.

---

## Stack

- **React 18** with function components and hooks
- **TypeScript 5** in strict mode (`noUnusedLocals` and `noUnusedParameters` are on)
- **Vite 5** for dev and build
- **Plain CSS** with custom properties, media queries and keyframes. No CSS framework, no animation library and no component kit, which keeps the dependency list tiny and makes the per-product motion easy to control.

The only runtime dependencies are `react` and `react-dom`.

---

## Project structure

```
index.html                 App shell, fonts, favicon
vite.config.ts             Dev and preview config (0.0.0.0, PORT, HMR disabled)
src/
  main.tsx                 Entry point
  App.tsx                  Orchestration: search, cart wiring, reactions, coupons, checkout
  index.css                Design tokens, layout, components, UI keyframes
  reactions.css            Reaction overlay styles and every per-product keyframe
  types.ts                 Product, CartLine, Toast, ReactionKind and friends
  search.ts                Single source of truth for product search and category scoping
  store.ts                 Cart hook with localStorage persistence, coupons, money formatting
  sound.ts                 Optional WebAudio blips (muted by default)
  data/
    products.ts            The 28 products, reactions config and parody reviews
    comedy.ts              Cart quips, achievements, empty state, chatbot script, strip lines
  components/
    Header.tsx             Announcement strip, brand, search with suggestions, cart button
    Hero.tsx               Landing hero with calls to action and stats
    ProductCard.tsx        Product card, reviews panel, add to cart, trigger reaction
    CartDrawer.tsx         Cart drawer, quantities, coupons, totals
    CheckoutModal.tsx      Validation, staged confirmation, order summary
    Confetti.tsx           Celebration burst for the order confirmation
    Sections.tsx           Promise band, support section, footer, scroll reveal
    Toasts.tsx             Notification stack
    ChaosMeter.tsx         Discovered reactions counter
    DemoControls.tsx       Demo mode panel
    SupportBot.tsx         Scripted support chatbot easter egg
    Ambient.tsx            Ambient background layer and decorative cursor trail
    Art.tsx                Inline SVG illustrations for all 28 products
  reactions/
    shell.tsx              ReactionShell, actions, particle primitives, ReactionProps
    hooks.ts               Message cycles, countdowns, staged reveals
    registry.tsx           Maps each ReactionKind to its component and auto-recovery time
    dairy.tsx              milk, coffee, water, soda
    food.tsx               egg, bread, banana, chips, chocolate
    electronics.tsx        phone, laptop, headphones, mouse
    fashion.tsx            tshirt, shoes, sunglasses, hat
    home.tsx               pillow, alarm, vacuum, fan
    beauty.tsx             shampoo, perfume, toothpaste
    toys.tsx               teddy, book, puzzle, duck
scripts/
  smoke.tsx                Server-render smoke suite covering the spec
```

---

## The reaction engine

Shopping logic and visual effects are deliberately separate. `App.tsx` owns the cart, coupons and search and simply decides *when* a reaction should fire. The `reactions/` module owns *what* happens, and knows nothing about the cart beyond a callback.

### The interface

Every effect is a component with the same props:

```ts
interface ReactionProps {
  product: Product;                 // all copy and colours come from the product data
  reduced: boolean;                 // prefers-reduced-motion is active
  onClose: () => void;              // dismiss and recover the storefront
  onAddToCart: (product: Product) => void; // used by effects that "reward" recovery
}
```

Each kind is registered with an auto-recovery time in milliseconds:

```ts
interface ReactionDef {
  Component: (props: ReactionProps) => JSX.Element;
  duration: number;   // auto-close after this long
}
```

Every registered effect has a positive duration, so an unattended reaction always recovers on its own.

### Triggering a reaction

A reaction fires from three places, all funnelled through one function:

1. Clicking a product illustration, or its **Try it** button.
2. Submitting a search that matches at least one product, which plays the top match.
3. Demo mode, which can replay the signature milk spill on demand.

### Adding a product

Append an entry to `PRODUCTS` in `src/data/products.ts`. Prices, copy, ratings, parody reviews and the reaction reference all live there:

```ts
{
  id: "beans",
  name: "Tin Of Existential Beans, 400g",
  category: "Food & Groceries",
  price: 1.2,
  rating: 4.0,
  reviewCount: 12,
  blurb: "Beans that have read too much philosophy.",
  reaction: "egg",                 // reuse an existing motion language
  reactionKicker: "Legume event",
  reactionTitle: "Bean Situation",
  reactionMessage: "The beans have formed a committee and it is not good news.",
  recoveryLabel: "Disband the committee",
  reviews: [{ author: "Tin Opener", stars: 4, text: "The beans asked me questions." }],
}
```

Adding a product that reuses an existing `reaction` needs no new code at all.

### Adding a new motion language

1. Add the new name to `ReactionKind` in `src/types.ts`.
2. Write the component in the relevant `src/reactions/*.tsx` file, wrapping your animation in `ReactionShell`. The shell provides the headline card, the kicker, the message, the recovery button and the accessible live region, so an effect only has to describe its own scene.
3. Register it in `src/reactions/registry.tsx` with its auto-recovery duration.

Shared particle primitives (`Droplets`, `Bubbles`, `Crumbs`, `Sparks`) and hooks (`useMessageCycle`, `useCountdown`, `useAfter`) are exported from the reactions module so effects do not duplicate work.

---

## The catalogue

Twenty eight products across seven categories, each with its own animation.

| Product | Category | Reaction |
| --- | --- | --- |
| Farmer's Despair Whole Milk, 2L | Dairy & Drinks | Giant spill that washes the interface, then a mop-up |
| Espresso Yourself Cold Brew | Dairy & Drinks | Caffeine overload, bouncing cards, live caffeine meter |
| Bottled Void Still Water, 6 Pack | Dairy & Drinks | Rising waterline with floating product cards |
| Fizz Kebab Cola, 330ml Can | Dairy & Drinks | Carbonation burst with bubbles and a fizzy pop |
| Free Range Regret Eggs | Food & Groceries | Wobble, crack, and a chick emerging |
| Bread Pitt Sourdough Loaf | Food & Groceries | Golden toast transformation with flying crumbs |
| Slip Risk Bananas, Bunch of 5 | Food & Groceries | Banana peel slides, a figure slips, incident report filed |
| Crunch Roulette Chips | Food & Groceries | Packet bursts open in a shower of crumbs |
| Emotional Damage Dark Chocolate | Food & Groceries | Floating squares and dramatic emotional text |
| Panic Phone 12 Pro Max Ultra | Electronics | Notification storm stacking in a contained panel |
| UpdateBook Air 14 inch | Electronics | Fake system update with an animated progress bar |
| Main Character Studio Headphones | Electronics | Background dims, dramatic music player overlay |
| Clickbait Gaming Mouse 26K | Electronics | Brief screen shake and a gamer achievement popup |
| Plain White T-Shirt With Regrets | Fashion | Printed pattern morphs into something ridiculous |
| Runaway Runners, Size 41 | Fashion | Shoes sprint across the page, then a chase button adds them to the cart |
| Sunglasses Of Extreme Coolness | Fashion | Screen darkens and shades descend with a title card |
| Boardroom Fedora, Adjustable | Fashion | Hat grows oversized while miniature hats float around |
| Eight Hour Pillow, Memory Foam | Home & Kitchen | Gentle floating with a live sleep countdown |
| Snooze Forever Alarm Clock | Home & Kitchen | Ringing, a ticking countdown and escalating snooze messages |
| Obsessive Compulsive Vacuum 3000 | Home & Kitchen | Vacuum travels the screen, sucking up visual debris |
| Windstorm Desk Fan, 3 Speeds | Home & Kitchen | Contained gust sends loose shapes flying |
| Hair Party Shampoo, 400ml | Beauty | Foam expands and accumulates around the card |
| Invisible Luxury Eau de Oops | Beauty | Curved sparkling scent trails drift and fade |
| Mega Smile Toothpaste, Mint Blast | Beauty | Giant cartoon smile with floating sparkles |
| Emotional Support Bear, 45cm | Toys, Books & Games | Animated hug with floating hearts |
| Spoilers And How To Avoid Them | Toys, Books & Games | Pages flip rapidly then an absurd spoiler warning |
| Almost There 1000 Piece Puzzle | Toys, Books & Games | One piece slides away and can be recovered |
| Rubber Duck Emergency Squad | Toys, Books & Games | Tiny ducks waddle across the viewport, then head home |

---

## Coupons

The coupon box in the cart drawer is real. Type a code and press Apply.

| Code | Effect |
| --- | --- |
| `CHAOS10` | Applies a genuine 10% discount to the total |
| `MILKSPILL` | No discount. Triggers the milk spill as a free bonus |
| `FREEWISDOM` | No discount. Returns unsolicited shopping advice instead |
| `BROKEMODE` | No discount. Reads your situation and respects it |

Any unrecognised code is rejected with a message, and the total is never reduced by a coupon that does not grant a discount. The discount line in the drawer and the checkout summary both show the arithmetic.

---

## Easter eggs and extras

- **Chaos meter** counts how many distinct reactions you have discovered and escalates its own commentary.
- **Achievements** unlock as you go, including first add to cart, surviving the milk, catching the shoes, and finding every secret.
- **Demo mode** is a discreet control in the corner for live demos. It resets all active effects, restores the normal storefront, clears the cart on request, replays the milk animation, and can summon support early.
- **Support chatbot** appears by itself once you have been sufficiently chaotic (12 interactions). It is a deterministic script with keyword matching, so it needs no AI API and gives the same comedy every run.
- **Ambient layer**, **scroll reveals** and a decorative **cursor trail** used only in a few chosen scenes. The real cursor is never hidden or replaced.

---

## Accessibility and motion

- **Reduced motion is respected.** The app reads `prefers-reduced-motion`, and every effect receives a `reduced` flag that strips the large shakes and cuts particle counts rather than deleting the joke. Global CSS also shortens every animation.
- **Reactions never block the interface.** The overlay ignores pointer events (`pointer-events: none`) while the action bar re-enables them, so the navigation, search and cart stay clickable mid-animation.
- **Everything recovers.** Each reaction has an explicit recovery button and an automatic timeout, and the review panel, drawer and modal all transition cleanly.
- Semantic buttons and labelled inputs, visible focus rings, `aria-live` regions for toasts and the chaos meter, and descriptive labels on icon-only controls.
- **Sound is optional and muted by default**, with a header toggle. It is generated with the Web Audio API, so there is no audio file or third-party service.

---

## Verification

```bash
bun run typecheck   # strict typecheck
bun run smoke       # spec smoke suite, no browser needed
bun run build       # typecheck and production bundle
```

`bun run smoke` runs `scripts/smoke.tsx`, which server-renders the app and every reaction and asserts the parts of the brief that are easy to break:

- the app renders and produces 28 product cards
- the catalogue and reaction registry both contain 28 unique entries, with unique ids
- no two products share a reaction component, and no two products share the same joking copy
- every product offers a recovery action, and every reaction auto-recovers after a positive delay
- all 28 reactions render in both normal and reduced-motion modes
- every product is findable by its own name and by its reaction keyword
- an exact category name is scoped to that category, unknown queries match nothing, and an empty query returns everything
- coupon maths: `CHAOS10` removes exactly 10%, no other code can discount, unknown codes cannot discount
- the reaction overlay ignores pointer events while its action bar stays clickable

---

## Notes and limitations

- **The reviews are parody.** They are written comedy and are labelled as such in the interface and in the data file. No real customer said any of it and none of it should be read as genuine feedback.
- **The checkout is a simulation.** It validates your input and produces a fictional order number, and it never asks for or wants payment details.
- **The cart is local.** It persists in `localStorage` under `oopsmart.cart.v2`, so it is per browser and not tied to any account.
- **Animation playback is not covered by an automated browser test.** Effects are verified structurally (server rendering in both motion modes, plus the CSS pointer-events contract) and by the running preview rather than by a headless browser session.
- **The catalogue is fixed.** Adding products or reactions is a data and component change, documented above, rather than a CMS.
