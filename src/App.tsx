import { useCallback, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer, type CouponMessage } from "./components/CartDrawer";
import { CheckoutModal, type PlacedOrder } from "./components/CheckoutModal";
import { Toasts } from "./components/Toasts";
import { ChaosMeter } from "./components/ChaosMeter";
import { DemoControls } from "./components/DemoControls";
import { SupportBot } from "./components/SupportBot";
import { Band, Footer, PromiseBand, SupportSection } from "./components/Sections";
import { AmbientLayer, CursorTrail } from "./components/Ambient";
import { CATEGORIES, PRODUCTS, PRODUCT_BY_ID } from "./data/products";
import { ACHIEVEMENTS, CART_QUIPS, EMPTY_SEARCH } from "./data/comedy";
import { COUPONS, useCart, type CouponState } from "./store";
import { REACTIONS } from "./reactions/registry";
import { matches } from "./search";
import { blip } from "./sound";
import type { Category, Product, ReactionKind, Toast, ToastTone } from "./types";

const TOTAL_REACTIONS = Object.keys(REACTIONS).length;
const FOOD_REACTIONS: ReactionKind[] = ["egg", "bread", "banana", "chips", "chocolate"];
const BOT_TRIGGER = 12;

type SortKey = "featured" | "price-low" | "price-high" | "rating";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function pitchFor(kind: ReactionKind): "low" | "mid" | "high" {
  if (["milk", "water", "pillow", "vacuum", "book", "hat"].includes(kind)) return "low";
  if (["coffee", "soda", "phone", "mouse", "alarm", "fan", "shoes", "duck", "toothpaste"].includes(kind)) {
    return "high";
  }
  return "mid";
}

export default function App(): JSX.Element {
  const reduced = usePrefersReducedMotion();
  const cart = useCart();

  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<SortKey>("featured");

  const [cartOpen, setCartOpen] = useState(false);
  const [cartBumped, setCartBumped] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);

  const [coupon, setCoupon] = useState<CouponState | null>(null);
  const [couponMessage, setCouponMessage] = useState<CouponMessage | null>(null);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const [reaction, setReaction] = useState<{ product: Product; seq: number } | null>(null);
  const [discovered, setDiscovered] = useState<ReactionKind[]>([]);
  const [achieved, setAchieved] = useState<string[]>([]);

  const [botOpen, setBotOpen] = useState(false);
  const [botShown, setBotShown] = useState(false);
  const [muted, setMuted] = useState(true);
  const interactions = useRef(0);

  /* ---------------- toasts ---------------- */
  const pushToast = useCallback((tone: ToastTone, icon: string, title: string, message: string) => {
    const id = ++toastId.current;
    setToasts((prev) => [...prev.slice(-3), { id, tone, icon, title, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4600);
  }, []);

  const award = useCallback(
    (id: string) => {
      setAchieved((prev) => {
        if (prev.includes(id)) return prev;
        const def = ACHIEVEMENTS.find((a) => a.id === id);
        if (def) {
          pushToast("amber", def.icon, `Achievement unlocked: ${def.title}`, def.detail);
        }
        return [...prev, id];
      });
    },
    [pushToast],
  );

  /* ---------------- reaction control ---------------- */
  const triggerReaction = useCallback(
    (product: Product) => {
      const kind = product.reaction;
      setReaction({ product, seq: Date.now() });
      if (!muted && !reduced) blip(pitchFor(kind));

      const nextDiscovered = discovered.includes(kind) ? discovered : [...discovered, kind];
      setDiscovered(nextDiscovered);
      interactions.current += 1;
      if (interactions.current >= BOT_TRIGGER && !botShown) {
        setBotShown(true);
        setBotOpen(true);
        pushToast(
          "teal",
          "🤖",
          "A support agent has appeared",
          "It misunderstood the ticket before you finished typing it.",
        );
      }

      if (!discovered.includes(kind)) {
        if (kind === "milk") award("dairy-survivor");
        if (nextDiscovered.length >= 5) award("chaos-agent");
        if (FOOD_REACTIONS.filter((k) => nextDiscovered.includes(k)).length >= 3) award("snack");
        if (nextDiscovered.includes("phone") && nextDiscovered.includes("laptop")) award("technician");
        if (nextDiscovered.length === TOTAL_REACTIONS) award("why-still-here");
      }
    },
    [award, botShown, discovered, muted, pushToast, reduced],
  );

  const resetAllEffects = useCallback(() => {
    setReaction(null);
    delete document.body.dataset.reaction;
  }, []);

  useEffect(() => {
    if (reaction) document.body.dataset.reaction = reaction.product.reaction;
    else delete document.body.dataset.reaction;
    return () => {
      delete document.body.dataset.reaction;
    };
  }, [reaction]);

  useEffect(() => {
    if (!reaction) return;
    const duration = REACTIONS[reaction.product.reaction].duration;
    if (!duration) return;
    const id = window.setTimeout(() => setReaction(null), duration);
    return () => window.clearTimeout(id);
  }, [reaction]);

  /* ---------------- body scroll lock ---------------- */
  useEffect(() => {
    const lock = cartOpen || checkoutOpen;
    document.body.classList.toggle("no-scroll", lock);
    return () => document.body.classList.remove("no-scroll");
  }, [cartOpen, checkoutOpen]);

  /* ---------------- cart actions ---------------- */
  const handleAdd = useCallback(
    (product: Product, quiet = false) => {
      cart.add(product.id);
      setCartBumped(true);
      window.setTimeout(() => setCartBumped(false), 620);
      award("first-mistake");
      if (product.reaction === "shoes") award("athletic");
      if (Math.random() < 0.4) setQuip(CART_QUIPS[Math.floor(Math.random() * CART_QUIPS.length)]);
      if (!quiet) {
        pushToast("navy", "🛒", "Added to cart", `${product.name} is now in the way of your savings.`);
      }
    },
    [award, cart, pushToast],
  );

  /* ---------------- search ---------------- */
  const suggestions = useMemo(
    () => (query.trim() ? PRODUCTS.filter((p) => matches(p, query)).slice(0, 6) : []),
    [query],
  );

  const runSearch = useCallback(
    (value: string) => {
      setSubmitted(value);
      if (value.trim()) {
        const found = PRODUCTS.filter((p) => matches(p, value));
        if (found.length > 0) triggerReaction(found[0]);
      }
      document.getElementById("shop")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced, triggerReaction],
  );

  const pickSuggestion = useCallback(
    (product: Product) => {
      setQuery(product.name);
      setSubmitted(product.name);
      triggerReaction(product);
    },
    [triggerReaction],
  );

  const visible = useMemo(() => {
    const list = PRODUCTS.filter((p) => (category === "All" ? true : p.category === category)).filter((p) =>
      matches(p, submitted),
    );
    const sorted = [...list];
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [category, submitted, sort]);

  const showMeSomethingElse = useCallback(() => {
    const pick = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
    setQuery(pick.reaction);
    setSubmitted(pick.reaction);
    triggerReaction(pick);
    pushToast("coral", "🎲", "Improvising", `We found ${pick.name} instead. It is not better. It is just different.`);
  }, [pushToast, triggerReaction]);

  /* ---------------- coupons & checkout ---------------- */
  const discount = coupon ? (cart.subtotal * coupon.percent) / 100 : 0;
  const total = Math.max(cart.subtotal - discount, 0);

  const applyCoupon = useCallback(
    (code: string) => {
      if (!code) {
        setCouponMessage({ ok: false, text: "Enter a code first. The box is waiting." });
        return;
      }
      const def = COUPONS[code];
      if (!def) {
        setCoupon(null);
        setCouponMessage({
          ok: false,
          text: `${code} is not a code we recognise. We checked twice, then once more out of pure anxiety.`,
        });
        return;
      }
      setCoupon(def.percent > 0 ? { code: def.label, percent: def.percent } : null);
      setCouponMessage({
        ok: def.ok,
        text: def.advice ? `${def.message} ${def.advice}` : def.message,
      });
      if (def.percent > 0) award("coupon-club");
      if (def.reaction === "milk") triggerReaction(PRODUCT_BY_ID.milk);
    },
    [award, triggerReaction],
  );

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
    if (lastOrder) {
      cart.clear();
      setCoupon(null);
      setCouponMessage(null);
      setQuip(null);
      setLastOrder(null);
      pushToast("teal", "🧾", `Order ${lastOrder.number} dispatched`, "Your cart is empty again. Begin your next mistake.");
    }
  }, [cart, lastOrder, pushToast]);

  const onPlaced = useCallback(
    (order: PlacedOrder) => {
      setLastOrder(order);
      award("checkout-champion");
    },
    [award],
  );

  function replayMilk() {
    triggerReaction(PRODUCT_BY_ID.milk);
  }

  const ActiveReaction = reaction ? REACTIONS[reaction.product.reaction].Component : null;

  const cursorScene =
    reaction !== null && ["milk", "shoes", "vacuum", "fan", "duck"].includes(reaction.product.reaction);

  return (
    <div className="app">
      <AmbientLayer reduced={reduced} />

      <Header
        query={query}
        onQueryChange={setQuery}
        onSearch={runSearch}
        suggestions={suggestions}
        onPickSuggestion={pickSuggestion}
        cartCount={cart.count}
        cartBumped={cartBumped}
        onOpenCart={() => {
          setCartOpen(true);
          setQuip(CART_QUIPS[Math.floor(Math.random() * CART_QUIPS.length)]);
        }}
        muted={muted}
        onToggleMute={() => {
          setMuted((m) => {
            if (m) blip("mid");
            return !m;
          });
        }}
      />

      <main>
        <div className="wrap">
          <Hero
            onShop={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
            onMilk={replayMilk}
            productCount={PRODUCTS.length}
            reactionCount={TOTAL_REACTIONS}
          />
        </div>

        <Band />

        <section className="section" id="shop">
          <div className="wrap">
            <div className="section__head">
              <div>
                <h2 className="section__title">The whole catalogue, all of it faulty</h2>
                <p className="section__note">
                  {submitted
                    ? `Showing results for “${submitted}”. Click any illustration to find out what that product does to this page.`
                    : "Thirty seconds in and nothing has gone wrong yet, which is itself suspicious. Click any illustration to fix that. Every reaction can be dismissed, reset, or replayed from demo mode."}
                </p>
              </div>
              <div className="chips" role="group" aria-label="Filter by category">
                {(["All", ...CATEGORIES] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`chip${category === c ? " is-active" : ""}`}
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="filters-row">
              <span className="pill-note">
                {visible.length} product{visible.length === 1 ? "" : "s"} shown
              </span>
              <div className="sort">
                <label htmlFor="sortby">Sort by</label>
                <select id="sortby" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price, low to high</option>
                  <option value="price-high">Price, high to low</option>
                  <option value="rating">Highest rated</option>
                </select>
              </div>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  setQuery("");
                  setSubmitted("");
                  setCategory("All");
                  setSort("featured");
                }}
              >
                Reset filters
              </button>
            </div>

            <div className="grid" key={`${submitted}|${category}|${sort}`}>
              {visible.length === 0 ? (
                <div className="empty">
                  <div style={{ fontSize: 54 }} aria-hidden="true">
                    🕳️
                  </div>
                  <h3>{EMPTY_SEARCH.title}</h3>
                  <p>{EMPTY_SEARCH.message}</p>
                  <button type="button" className="btn btn--primary" onClick={showMeSomethingElse}>
                    Show me something else
                  </button>
                </div>
              ) : (
                visible.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    onReact={triggerReaction}
                    onAdd={handleAdd}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        <PromiseBand />
        <SupportSection />
      </main>

      <Footer />

      <ChaosMeter discovered={discovered.length} total={TOTAL_REACTIONS} hidden={Boolean(reaction)} />

      <Toasts toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <DemoControls
        onResetEffects={resetAllEffects}
        onResetCart={() => {
          cart.clear();
          setQuip(null);
          setCoupon(null);
          setCouponMessage(null);
          pushToast("navy", "🗑️", "Cart reset", "Everything you regret is gone. The cart is calm again.");
        }}
        onReplayMilk={replayMilk}
        onSummonBot={() => {
          setBotShown(true);
          setBotOpen(true);
        }}
      />

      <SupportBot open={botOpen} onClose={() => setBotOpen(false)} />

      {ActiveReaction && reaction ? (
        <ActiveReaction
          key={reaction.seq}
          product={reaction.product}
          reduced={reduced}
          onClose={() => setReaction(null)}
          onAddToCart={(p) => handleAdd(p)}
        />
      ) : null}

      <CursorTrail enabled={cursorScene && !reduced} />

      <CartDrawer
        open={cartOpen}
        lines={cart.lines}
        subtotal={cart.subtotal}
        discount={discount}
        couponCode={coupon?.code ?? null}
        couponPercent={coupon?.percent ?? 0}
        couponMessage={couponMessage}
        quip={quip}
        onClose={() => setCartOpen(false)}
        onSetQty={cart.setQty}
        onRemove={cart.remove}
        onApplyCoupon={applyCoupon}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen ? (
        <CheckoutModal
          lines={cart.lines}
          subtotal={cart.subtotal}
          discount={discount}
          total={total}
          couponCode={coupon?.code ?? null}
          couponPercent={coupon?.percent ?? 0}
          reduced={reduced}
          onClose={closeCheckout}
          onPlaced={onPlaced}
        />
      ) : null}

      <span className="sr-only" aria-live="polite">
        {achieved.length} achievements unlocked of {ACHIEVEMENTS.length}.
      </span>
    </div>
  );
}
