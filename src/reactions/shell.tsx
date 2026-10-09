import type { CSSProperties, JSX, ReactNode } from "react";
import type { Product } from "../types";
import { ProductArt } from "../components/Art";

export interface ReactionProps {
  product: Product;
  reduced: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export interface ReactionAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "navy" | "ghost" | "teal";
}

interface ShellProps {
  product: Product;
  onClose: () => void;
  children?: ReactNode;
  actions?: ReactionAction[];
  mark?: string | null;
  markTone?: "coral" | "amber" | "navy";
  rootClass?: string;
  hideArt?: boolean;
}

export function ReactionShell({
  product,
  onClose,
  children,
  actions,
  mark,
  markTone = "navy",
  rootClass = "",
  hideArt = false,
}: ShellProps): JSX.Element {
  const list: ReactionAction[] = actions ?? [
    {
      label: product.recoveryLabel ?? "Make it stop",
      onClick: onClose,
      variant: "primary",
    },
  ];

  return (
    <div className={`rx ${rootClass}`} aria-live="polite" role="status">
      <div className="rx__layer">{children}</div>
      {mark ? (
        <div className={`rx__mark${markTone === "navy" ? "" : ` rx__mark--${markTone}`}`}>{mark}</div>
      ) : null}
      {list.length === 0 ? null : (
      <div className="rx__bar">
        {hideArt ? null : (
          <div className="rx__art">
            <ProductArt id={product.id} />
          </div>
        )}
        <div>
          <div className="rx__kicker">{product.reactionKicker}</div>
          <h3 className="rx__title">{product.reactionTitle}</h3>
          <p className="rx__msg">{product.reactionMessage}</p>
          <div className="rx__actions">
            {list.map((a, i) => (
              <button
                key={i}
                type="button"
                className={`btn btn--sm${a.variant && a.variant !== "primary" ? ` btn--${a.variant}` : ""}${
                  a.variant === "primary" ? " btn--primary" : ""
                }`}
                onClick={a.onClick}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

/* ---------------- deterministic-ish particle helpers ---------------- */

export function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function Droplets({ count, color }: { count: number; color?: string }): JSX.Element {
  const drops = Array.from({ length: count }, () => ({
    left: rand(-4, 100),
    top: rand(-10, 40),
    size: rand(14, 46),
    delay: rand(0, 1.4),
    dur: rand(2.4, 4.2),
  }));
  return (
    <>
      {drops.map((d, i) => (
        <span
          key={i}
          className="rx-drop"
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: color ?? "#eef4ff",
              animation: `drop-fall ${d.dur}s ${d.delay}s cubic-bezier(0.5,0,0.9,1) forwards`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function Bubbles({ count, minSize = 12, maxSize = 46 }: { count: number; minSize?: number; maxSize?: number }): JSX.Element {
  const bubbles = Array.from({ length: count }, () => ({
    left: rand(0, 100),
    size: rand(minSize, maxSize),
    delay: rand(0, 1.8),
    dur: rand(2.6, 5),
  }));
  return (
    <>
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="rx-bubble"
          style={
            {
              left: `${b.left}%`,
              bottom: "-60px",
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function Crumbs({ count, origin }: { count: number; origin?: { x: number; y: number } }): JSX.Element {
  const crumbs = Array.from({ length: count }, () => ({
    left: (origin?.x ?? 50) + rand(-16, 16),
    top: (origin?.y ?? 30) + rand(-6, 6),
    size: rand(5, 13),
    dx: rand(-90, 90),
    delay: rand(0, 0.5),
    dur: rand(1.1, 2.1),
    bg: ["#d9a45b", "#c98f3f", "#e6b877"][Math.floor(rand(0, 3))],
  }));
  return (
    <>
      {crumbs.map((c, i) => (
        <span
          key={i}
          className="rx-crumb"
          style={
            {
              left: `${c.left}%`,
              top: `${c.top}%`,
              width: c.size,
              height: c.size * 0.72,
              background: c.bg,
              "--dx": `${c.dx}px`,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function Sparks({ count, chars = ["✦", "✧", "★"] }: { count: number; chars?: string[] }): JSX.Element {
  const sparks = Array.from({ length: count }, () => ({
    left: rand(6, 94),
    top: rand(20, 70),
    char: chars[Math.floor(rand(0, chars.length))],
    delay: rand(0, 1.6),
    size: rand(15, 30),
  }));
  return (
    <>
      {sparks.map((s, i) => (
        <span
          key={i}
          className="rx-spark"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              fontSize: s.size,
            } as CSSProperties
          }
        >
          {s.char}
        </span>
      ))}
    </>
  );
}
