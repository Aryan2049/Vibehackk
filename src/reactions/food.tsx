import type { CSSProperties, JSX } from "react";
import { ProductArt } from "../components/Art";
import { Crumbs, ReactionShell, rand, type ReactionProps } from "./shell";
import { useAfter, useMessageCycle } from "./hooks";

/* ---------------- inline props ---------------- */
function Chick(): JSX.Element {
  return (
    <svg viewBox="0 0 120 100" aria-hidden="true">
      <ellipse cx="60" cy="66" rx="30" ry="26" fill="#ffd23f" stroke="#16213f" strokeWidth="3" />
      <circle cx="60" cy="38" r="22" fill="#ffd23f" stroke="#16213f" strokeWidth="3" />
      <circle cx="52" cy="34" r="3.2" fill="#16213f" />
      <circle cx="68" cy="34" r="3.2" fill="#16213f" />
      <path d="M60 42 l-8 6 8 6 8 -6 Z" fill="#ff8f3c" stroke="#16213f" strokeWidth="2.5" {...{ strokeLinejoin: "round" }} />
      <path d="M44 60 q-10 4 -12 -4 M76 60 q10 4 12 -4" stroke="#e0b52f" strokeWidth="3" fill="none" />
      <path d="M50 88 l-8 8 M70 88 l8 8" stroke="#ff8f3c" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function SlipGuy(): JSX.Element {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="70" cy="26" r="14" fill="#fffdf6" stroke="#16213f" strokeWidth="3" />
      <path d="M66 20 q4 -6 8 -1" stroke="#16213f" strokeWidth="2" fill="none" />
      <path d="M64 40 q10 8 6 22 q-4 14 -14 22" stroke="#16213f" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M70 62 l24 6 M70 62 l20 -16" stroke="#16213f" strokeWidth="5" strokeLinecap="round" />
      <path d="M56 84 l-18 16 M56 84 l4 22" stroke="#16213f" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 24 l-16 -8 M40 30 l-18 6" stroke="#16213f" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* ============================================================
   EGG: wobble, crack, chick
   ============================================================ */
export function EggReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const hatched = useAfter(reduced ? 300 : 2500);

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={hatched ? "🥚 YOUR EGG IS NOW A BIRD AND IT FLIES ON TUESDAYS" : "FRAGILE: WOBBLING WITH INTENT"}
      markTone="amber"
      rootClass="rx--egg"
    >
      {!hatched ? (
        <div className="rx-egg__egg">
          <ProductArt id="eggs" />
        </div>
      ) : (
        <>
          <div className="rx-egg__shell">
            <ProductArt id="eggs" />
          </div>
          <div className="rx-egg__chick">
            <Chick />
          </div>
        </>
      )}
    </ReactionShell>
  );
}

/* ============================================================
   BREAD: toast mode
   ============================================================ */
export function BreadReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="🍞 YOUR BREAD HAS BEEN PROMOTED TO BREAKFAST"
      markTone="amber"
      rootClass="rx--bread"
    >
      <div className="rx-bread__glow" />
      <div className="rx-bread__slice">
        <ProductArt id="bread" />
      </div>
      <Crumbs count={reduced ? 8 : 24} origin={{ x: 50, y: 34 }} />
    </ReactionShell>
  );
}

/* ============================================================
   BANANA: slip and incident report
   ============================================================ */
export function BananaReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const mark = useMessageCycle(
    [
      "⚠️ INCIDENT REPORT FILED",
      "Incident type: banana.",
      "Witnesses: the floor, two seagulls, and the banana.",
      "Liability: yours, somehow.",
    ],
    1250,
  );

  return (
    <ReactionShell product={product} onClose={onClose} mark={mark} markTone="amber" rootClass="rx--banana">
      <div className="rx-banana__peel">
        <ProductArt id="banana" />
      </div>
      <div className="rx-banana__guy">
        <SlipGuy />
      </div>
      {!reduced ? (
        <>
          <span className="rx-spark" style={{ left: "62%", top: "46%", animationDelay: "0.9s" }}>
            💥
          </span>
          <span className="rx-spark" style={{ left: "40%", top: "30%", animationDelay: "1.2s" }}>
            💫
          </span>
        </>
      ) : null}
    </ReactionShell>
  );
}

/* ============================================================
   CHIPS: crumb catastrophe
   ============================================================ */
export function ChipsReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="47 CRUMBS DELIVERED. ONE PACKET ORDERED. THE MATHS IS OURS."
      markTone="coral"
      rootClass="rx--chips"
    >
      <div className="rx-chips__bag">
        <ProductArt id="chips" />
      </div>
      <Crumbs count={reduced ? 10 : 46} origin={{ x: 50, y: 32 }} />
    </ReactionShell>
  );
}

/* ============================================================
   CHOCOLATE: emotional damage
   ============================================================ */
export function ChocolateReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const squares = Array.from({ length: reduced ? 4 : 10 }, () => ({
    left: rand(8, 90),
    bottom: rand(10, 40),
    delay: rand(0, 1.4),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={null}
      rootClass="rx--choco"
    >
      <div className="rx-choco__bar">
        <ProductArt id="chocolate" />
      </div>
      {squares.map((s, i) => (
        <span
          key={i}
          className="rx-choco__square"
          style={{ left: `${s.left}%`, bottom: `${s.bottom}%`, animationDelay: `${s.delay}s` } as CSSProperties}
        />
      ))}
      <div className="rx-choco__line" style={{ top: "58%", animationDelay: "0.3s" }}>
        "This chocolate understands you."
      </div>
      <div className="rx-choco__line" style={{ top: "66%", animationDelay: "1.1s", fontSize: 16 }}>
        "Better than your shopping cart, and the cart has been told."
      </div>
    </ReactionShell>
  );
}
