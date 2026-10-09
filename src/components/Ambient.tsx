import { useEffect, useRef, type JSX } from "react";

/* Fixed positions so the layer never re-randomises between renders. */
const SHAPES = [
  { x: 6, y: 14, size: 26, dur: 15, delay: 0, kind: "star" },
  { x: 88, y: 22, size: 34, dur: 19, delay: 2.2, kind: "bag" },
  { x: 16, y: 62, size: 22, dur: 17, delay: 1.1, kind: "ring" },
  { x: 74, y: 74, size: 30, dur: 21, delay: 3.4, kind: "star" },
  { x: 46, y: 6, size: 20, dur: 16, delay: 0.6, kind: "ring" },
  { x: 92, y: 52, size: 24, dur: 18, delay: 2.9, kind: "bag" },
  { x: 32, y: 88, size: 26, dur: 20, delay: 1.7, kind: "star" },
];

function Shape({ kind }: { kind: string }): JSX.Element {
  if (kind === "star") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2 l2.6 6.4 6.9 .5 -5.3 4.4 1.7 6.7 -5.9 -3.6 -5.9 3.6 1.7 -6.7 -5.3 -4.4 6.9 -.5 Z"
          fill="#ffb020"
          opacity="0.75"
        />
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8 h16 l1.4 12 a2 2 0 0 1 -2 2.2 H4.6 a2 2 0 0 1 -2 -2.2 Z" fill="none" stroke="#109c8e" strokeWidth="1.8" />
        <path d="M8.5 8 a3.5 3.5 0 0 1 7 0" fill="none" stroke="#109c8e" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="#ff5a3c" strokeWidth="1.8" opacity="0.8" />
    </svg>
  );
}

export function AmbientLayer({ reduced }: { reduced: boolean }): JSX.Element | null {
  if (reduced) return null;
  return (
    <div className="ambient" aria-hidden="true">
      {SHAPES.map((s, i) => (
        <span
          key={i}
          className="ambient__shape"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <Shape kind={s.kind} />
        </span>
      ))}
    </div>
  );
}

/**
 * A decorative trail that follows the pointer during a few chosen scenes. It
 * never hides or replaces the real, accessible system cursor.
 */
export function CursorTrail({ enabled }: { enabled: boolean }): JSX.Element | null {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(hover: none)").matches) return;
    const container = ref.current;
    if (!container) return;

    const dots = Array.from(container.children) as HTMLElement[];
    const pos = dots.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      let tx = mx;
      let ty = my;
      dots.forEach((d, i) => {
        pos[i].x += (tx - pos[i].x) * 0.3;
        pos[i].y += (ty - pos[i].y) * 0.3;
        d.style.transform = `translate(${pos[i].x}px, ${pos[i].y}px) translate(-50%, -50%)`;
        tx = pos[i].x;
        ty = pos[i].y;
      });
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="cursor-trail" ref={ref} aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="cursor-trail__dot"
          style={{ width: 15 - i * 3, height: 15 - i * 3, opacity: 0.55 - i * 0.11 }}
        />
      ))}
    </div>
  );
}
