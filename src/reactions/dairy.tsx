import type { CSSProperties, JSX } from "react";
import { ProductArt } from "../components/Art";
import { Bubbles, Droplets, ReactionShell, rand, type ReactionProps } from "./shell";
import { useMessageCycle } from "./hooks";

/* ============================================================
   MILK: the signature spill that washes the storefront away
   ============================================================ */
export function MilkReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const mark = useMessageCycle(
    [
      "DAIRY EMERGENCY DETECTED",
      "Your prices have been pasteurized.",
      "The reviews dissolved on contact.",
      "Our UI team is currently swimming.",
    ],
    1250,
  );

  return (
    <ReactionShell product={product} onClose={onClose} mark={mark} markTone="coral" rootClass="rx--milk">
      <div className="rx-milk__splash" />
      <div className="rx-milk__puddle" />
      <div className="rx-milk__carton">
        <ProductArt id="milk" />
      </div>
      {!reduced ? <Droplets count={16} /> : null}
      <div className="rx-milk__wave" />
    </ReactionShell>
  );
}

/* ============================================================
   COFFEE: caffeine overload
   ============================================================ */
export function CoffeeReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const beans = Array.from({ length: reduced ? 4 : 10 }, () => ({
    left: rand(4, 92),
    top: rand(12, 74),
    delay: rand(0, 1.6),
    size: rand(18, 30),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="☕ WARNING: THIS WEBSITE HAS HAD FOUR ESPRESSOS"
      markTone="amber"
      rootClass="rx--coffee"
    >
      {beans.map((b, i) => (
        <span
          key={i}
          className="rx-coffee__bean"
          style={{ left: `${b.left}%`, top: `${b.top}%`, animationDelay: `${b.delay}s`, fontSize: b.size } as CSSProperties}
        >
          🫘
        </span>
      ))}
      <div className="rx-coffee__meter">
        <h5>Caffeine meter</h5>
        <div className="rx-coffee__track">
          <div className="rx-coffee__fill" />
        </div>
        <div className="rx-coffee__reading">1,480 bpm and rising</div>
        <p style={{ fontSize: 11.5, marginTop: 6, color: "#ffcf9b" }}>
          The cards are bouncing, the alerts are arriving before they happen, and nobody is steering.
        </p>
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   WATER: rising waterline with floating cards
   ============================================================ */
export function WaterReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="FLOOD WARNING: THE CARD FLOOR IS NOW AFLOAT AND LOVING IT"
      markTone="navy"
      rootClass="rx--water"
    >
      <div className="rx-water__rise" />
      <div className="rx-water__wave" />
      {!reduced ? <Bubbles count={12} minSize={10} maxSize={26} /> : null}
    </ReactionShell>
  );
}

/* ============================================================
   SODA: carbonation explosion
   ============================================================ */
export function SodaReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="3,000 UNNECESSARY BUBBLES DEPLOYED. ALL HEADING FOR THE CEILING."
      markTone="coral"
      rootClass="rx--soda"
    >
      <div className="rx-soda__pop" />
      <div className="rx-soda__foam" />
      <div className="rx-soda__foam" style={{ animationDelay: "0.35s" }} />
      {!reduced ? <Bubbles count={20} minSize={14} maxSize={52} /> : null}
    </ReactionShell>
  );
}
