import type { CSSProperties, JSX } from "react";

const COLORS = ["#ff5a3c", "#ffb020", "#109c8e", "#16213f", "#ff8f7a", "#cdeee9"];

interface ConfettiProps {
  count?: number;
  reduced?: boolean;
}

export function Confetti({ count = 90, reduced = false }: ConfettiProps): JSX.Element {
  const n = reduced ? 18 : count;
  const pieces = Array.from({ length: n }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.9,
    dur: 2.4 + Math.random() * 2.2,
    size: 7 + Math.random() * 9,
    rot: Math.random() * 360,
    color: COLORS[i % COLORS.length],
    round: Math.random() > 0.72,
  }));

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5 }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          style={
            {
              position: "absolute",
              top: "-24px",
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.5,
              background: p.color,
              borderRadius: p.round ? "50%" : "2px",
              transform: `rotate(${p.rot}deg)`,
              animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(0.3,0.5,0.6,1) forwards`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
