import type { CSSProperties, JSX } from "react";
import { ProductArt } from "../components/Art";
import { ReactionShell, rand, type ReactionProps } from "./shell";
import { useMessageCycle } from "./hooks";

/* ============================================================
   T-SHIRT: fashion emergency
   ============================================================ */
export function TShirtReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const mark = useMessageCycle(
    [
      "PATTERN UPDATE APPLIED",
      "You did not approve this update.",
      "The shirt approved it. One vote, unanimous.",
      "No rollback is available and none was offered.",
    ],
    1250,
  );
  return (
    <ReactionShell product={product} onClose={onClose} mark={mark} markTone="coral" rootClass="rx--tee">
      <div className="rx-tee__shirt">
        <ProductArt id="tshirt" />
        {!reduced ? <div className="rx-tee__swatch" /> : null}
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   SHOES: runaway product
   ============================================================ */
export function ShoesReaction({ product, onClose, reduced, onAddToCart }: ReactionProps): JSX.Element {
  const dust = Array.from({ length: reduced ? 0 : 5 }, () => ({
    left: rand(10, 90),
    top: rand(46, 62),
    delay: rand(0, 0.7),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="👟 PRODUCT AT LARGE: LAST SEEN MOVING FAST AND TAKING THE BOX"
      markTone="coral"
      rootClass="rx--shoes"
      actions={[
        {
          label: product.recoveryLabel ?? "Chase the shoes",
          variant: "primary",
          onClick: () => {
            onAddToCart(product);
            onClose();
          },
        },
        { label: "Give up and walk barefoot", variant: "ghost", onClick: onClose },
      ]}
    >
      <div className="rx-shoe">
        <ProductArt id="shoes" />
      </div>
      {dust.map((d, i) => (
        <span
          key={i}
          className="rx-shoe__dust"
          style={{ left: `${d.left}%`, top: `${d.top}%`, animationDelay: `${d.delay}s` } as CSSProperties}
        />
      ))}
    </ReactionShell>
  );
}

/* ============================================================
   SUNGLASSES: dramatic entrance
   ============================================================ */
export function SunglassesReaction({ product, onClose }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={null}
      rootClass="rx--shades"
      actions={[{ label: product.recoveryLabel ?? "Remove the sunglasses", onClick: onClose, variant: "primary" }]}
    >
      <div className="rx-dim" style={{ background: "rgba(9,14,30,0.72)", animationDuration: "0.4s" }} onClick={onClose} />
      <div className="rx-shades__flip" />
      <div className="rx-shades__pair">
        <ProductArt id="sunglasses" />
      </div>
      <div className="rx__mark rx__mark--amber" style={{ top: "56%", position: "fixed", animationDelay: "0.5s" }}>
        DRAMATIC ENTRANCE ACHIEVED
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   HAT: hat takeover
   ============================================================ */
export function HatReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const minis = Array.from({ length: reduced ? 3 : 9 }, (_, i) => ({
    left: rand(4, 88),
    top: rand(12, 70),
    delay: rand(0, 2),
    scale: rand(0.6, 1.15),
    key: i,
  }));
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="🎩 THIS HAT IS NOW THE HEAD OF THE COMPANY"
      markTone="amber"
      rootClass="rx--hat"
    >
      <div className="rx-hat__big">
        <ProductArt id="hat" />
      </div>
      {minis.map((m) => (
        <span
          key={m.key}
          className="rx-hat__mini"
          style={{ left: `${m.left}%`, top: `${m.top}%`, animationDelay: `${m.delay}s`, transform: `scale(${m.scale})` } as CSSProperties}
        >
          <ProductArt id="hat" />
        </span>
      ))}
    </ReactionShell>
  );
}
