import { useState, type CSSProperties, type JSX } from "react";
import { ProductArt } from "../components/Art";
import { ReactionShell, rand, type ReactionProps } from "./shell";

/* ============================================================
   TEDDY BEAR: emotional support
   ============================================================ */
export function TeddyReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const hearts = Array.from({ length: reduced ? 4 : 12 }, () => ({
    left: rand(24, 76),
    top: rand(28, 62),
    delay: rand(0, 2),
    size: rand(16, 30),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="🧸 YOUR CART ASKED FOR EMOTIONAL SUPPORT. THE BEAR SAID YES INSTANTLY."
      markTone="coral"
      rootClass="rx--teddy"
    >
      <div className="rx-teddy">
        <ProductArt id="teddy" />
      </div>
      {hearts.map((h, i) => (
        <span
          key={i}
          className="rx-heart"
          style={{ left: `${h.left}%`, top: `${h.top}%`, animationDelay: `${h.delay}s`, fontSize: h.size } as CSSProperties}
        >
          ♥
        </span>
      ))}
    </ReactionShell>
  );
}

/* ============================================================
   BOOK: spoiler emergency
   ============================================================ */
export function BookReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const pages = Array.from({ length: reduced ? 3 : 7 }, (_, i) => i);
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="📖 SPOILER ALERT: THE BUTLER DID IT. THE BUTLER ALWAYS DID IT."
      markTone="coral"
      rootClass="rx--book"
    >
      <div className="rx-book">
        <ProductArt id="book" />
      </div>
      {pages.map((p) => (
        <span key={p} className="rx-book__page" style={{ animationDelay: `${p * 0.14}s` } as CSSProperties} />
      ))}
      <div className="rx-note" style={{ bottom: 128 }}>
        Spoiler: the receipt is longer than the story.
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   PUZZLE: missing piece
   ============================================================ */
export function PuzzleReaction({ product, onClose }: ReactionProps): JSX.Element {
  const [found, setFound] = useState(false);

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={found ? "✅ PIECE RECOVERED. IT WAS BEHIND THE SOFA AND IT IS SMUG." : "🧩 ONE PIECE HAS LEFT THE BUILDING AND IS NOT COMING BACK"}
      markTone={found ? "navy" : "amber"}
      rootClass="rx--puzzle"
      actions={
        found
          ? [{ label: "Finish the puzzle", onClick: onClose, variant: "primary" }]
          : [
              { label: product.recoveryLabel ?? "Find the piece", variant: "primary", onClick: () => setFound(true) },
              { label: "Enjoy 99% of the puzzle", variant: "ghost", onClick: onClose },
            ]
      }
    >
      <div className="rx-puzzle">
        <ProductArt id="puzzle" />
      </div>
      {!found ? (
        <div className="rx-puzzle__piece" style={{ left: "50%", top: "34%" }}>
          <ProductArt id="puzzle" />
        </div>
      ) : (
        <span className="rx-spark" style={{ left: "58%", top: "36%", fontSize: 34, animationDelay: "0.1s" }}>
          🧩
        </span>
      )}
    </ReactionShell>
  );
}

/* ============================================================
   RUBBER DUCK: duck invasion
   ============================================================ */
export function DuckReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const [leaving, setLeaving] = useState(false);
  const ducks = Array.from({ length: reduced ? 5 : 14 }, (_, i) => ({
    top: rand(16, 80),
    dy: rand(-70, 40),
    delay: rand(0, 2),
    dur: rand(2.4, 4),
    size: rand(30, 54),
    key: i,
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={leaving ? "🚚 DUCKS ARE HEADING HOME. THEY ARE NOT SORRY AND THEY WOULD DO IT AGAIN." : "🦆 A SERIOUS QUACKCIDENT HAS OCCURRED"}
      markTone={leaving ? "navy" : "amber"}
      rootClass="rx--duck"
      actions={
        leaving
          ? [{ label: "Count the ducks again", onClick: onClose, variant: "primary" }]
          : [{ label: product.recoveryLabel ?? "Send ducks home", variant: "primary", onClick: () => setLeaving(true) }]
      }
    >
      {ducks.map((d) => (
        <span
          key={d.key}
          className="rx-duck"
          style={
            {
              top: `${d.top}%`,
              width: d.size,
              "--dy": `${d.dy}px`,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.dur}s`,
              animationDirection: leaving ? "reverse" : "normal",
              opacity: leaving ? 0.7 : 1,
            } as CSSProperties
          }
        >
          <ProductArt id="duck" />
        </span>
      ))}
    </ReactionShell>
  );
}
