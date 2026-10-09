import type { CSSProperties, JSX } from "react";
import { ProductArt } from "../components/Art";
import { ReactionShell, Sparks, rand, type ReactionProps } from "./shell";

/* ============================================================
   SHAMPOO: foam party
   ============================================================ */
export function ShampooReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const foam = Array.from({ length: reduced ? 10 : 34 }, () => ({
    left: rand(2, 94),
    top: rand(10, 82),
    size: rand(28, 96),
    delay: rand(0, 1.6),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="🫧 YOUR BROWSER NOW HAS EXCELLENT HAIR. WE CANNOT RINSE A BROWSER."
      markTone="navy"
      rootClass="rx--shampoo"
    >
      {foam.map((f, i) => (
        <span
          key={i}
          className="rx-foam"
          style={
            {
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s`,
            } as CSSProperties
          }
        />
      ))}
      <div className="rx-bottle" style={{ top: "34%" }}>
        <ProductArt id="shampoo" />
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   PERFUME: invisible luxury
   ============================================================ */
export function PerfumeReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const trail = Array.from({ length: reduced ? 6 : 22 }, () => ({
    left: rand(24, 74),
    top: rand(34, 70),
    sx: rand(-120, 160),
    sy: rand(-240, -80),
    delay: rand(0, 2.4),
    size: rand(8, 18),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="✨ SMELLS EXPENSIVE, COSTS YOUR REMAINING PATIENCE"
      markTone="amber"
      rootClass="rx--perfume"
    >
      {trail.map((t, i) => (
        <span
          key={i}
          className="rx-scent"
          style={
            {
              left: `${t.left}%`,
              top: `${t.top}%`,
              width: t.size,
              height: t.size,
              "--sx": `${t.sx}px`,
              "--sy": `${t.sy}px`,
              animationDelay: `${t.delay}s`,
            } as CSSProperties
          }
        />
      ))}
      <div className="rx-bottle">
        <ProductArt id="perfume" />
      </div>
      <div className="rx-note" style={{ bottom: 128 }}>
        Notes of sandalwood, ambition, and one financial concern nobody has mentioned yet.
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   TOOTHPASTE: smile overload
   ============================================================ */
function BigSmile(): JSX.Element {
  return (
    <svg viewBox="0 0 240 160" aria-hidden="true">
      <path
        d="M24 52 q96 -52 192 0 q-16 92 -96 96 q-80 -4 -96 -96 Z"
        fill="#fffdf6"
        stroke="#16213f"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M44 60 q76 -30 152 0" stroke="#e6dcc8" strokeWidth="4" fill="none" />
      <path d="M46 84 q74 44 148 0" stroke="#ff8f7a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M56 68 v18 M92 62 v22 M128 62 v22 M164 68 v18" stroke="#c8ccd4" strokeWidth="4" />
    </svg>
  );
}

export function ToothpasteReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="😁 YOUR SMILE IS NOW BRIGHTER THAN OUR BUSINESS MODEL"
      markTone="amber"
      rootClass="rx--paste"
      actions={[
        { label: product.recoveryLabel ?? "Tone the smile down", onClick: onClose, variant: "primary" },
      ]}
    >
      <div className="rx-smile">
        <BigSmile />
      </div>
      <Sparks count={reduced ? 6 : 16} chars={["✨", "✦", "★", "✧"]} />
    </ReactionShell>
  );
}
