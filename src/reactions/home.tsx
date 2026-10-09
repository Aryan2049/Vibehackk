import type { CSSProperties, JSX } from "react";
import { ProductArt } from "../components/Art";
import { ReactionShell, rand, type ReactionProps } from "./shell";
import { useCountdown, useMessageCycle } from "./hooks";

/* ============================================================
   PILLOW: sleep mode
   ============================================================ */
export function PillowReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const hoursLeft = useCountdown(8, reduced ? 500 : 900);
  const zzz = Array.from({ length: reduced ? 2 : 5 }, (_, i) => ({
    left: rand(20, 74),
    top: rand(30, 56),
    delay: rand(0, 2),
    size: 18 + i * 6,
    key: i,
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={`😴 SLEEP MODE ENGAGED. ${hoursLeft} HOUR(S) OF PRODUCTIVITY REMAINING LOST`}
      markTone="navy"
      rootClass="rx--pillow"
    >
      <div className="rx-pillow__item">
        <ProductArt id="pillow" />
      </div>
      {zzz.map((z) => (
        <span
          key={z.key}
          className="rx-zzz"
          style={{ left: `${z.left}%`, top: `${z.top}%`, animationDelay: `${z.delay}s`, fontSize: z.size } as CSSProperties}
        >
          Z
        </span>
      ))}
    </ReactionShell>
  );
}

/* ============================================================
   ALARM CLOCK: snooze forever
   ============================================================ */
const SNOOZE_LINES = [
  "You snoozed the alarm.",
  "The alarm has snoozed your order.",
  "Your order has snoozed your delivery.",
  "The courier has snoozed their entire life plan.",
  "Everyone is having a lovely lie-in and the courier has joined a band. Nobody is coming.",
];

export function AlarmReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const mark = useMessageCycle(SNOOZE_LINES, reduced ? 900 : 1200);
  const snoozes = useCountdown(9, 1200);

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={mark}
      markTone="coral"
      rootClass="rx--alarm"
    >
      <div className="rx-alarm__ring" />
      <div className="rx-alarm__bell">
        <ProductArt id="alarm" />
      </div>
      <div className="rx-alarm__count">{snoozes > 0 ? `0${snoozes}` : "00"}</div>
      <div className="rx-note" style={{ bottom: 120 }}>
        Snoozes used: {9 - snoozes} of 9
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   VACUUM: interface cleanup
   ============================================================ */
export function VacuumReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const debris = Array.from({ length: reduced ? 6 : 18 }, () => ({
    left: rand(4, 96),
    top: rand(18, 74),
    size: rand(9, 22),
    tx: rand(-160, -40),
    ty: rand(-26, 26),
    delay: rand(0.2, 1.8),
    color: ["#e6dcc8", "#ffd9d0", "#cdeee9", "#ffe9bd", "#d7dbe6"][Math.floor(rand(0, 5))],
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="🧹 CLEANING UP YOUR SHOPPING DECISIONS SINCE APPROXIMATELY NOW"
      markTone="navy"
      rootClass="rx--vacuum"
    >
      {debris.map((d, i) => (
        <span
          key={i}
          className="rx-vac__debris"
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size * 0.8,
              background: d.color,
              "--tx": `${d.tx}px`,
              "--ty": `${d.ty}px`,
              animationDelay: `${d.delay}s`,
            } as CSSProperties
          }
        />
      ))}
      <div className="rx-vac__unit">
        <ProductArt id="vacuum" />
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   FAN: windstorm
   ============================================================ */
export function FanReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const items = Array.from({ length: reduced ? 6 : 18 }, () => ({
    left: rand(10, 88),
    top: rand(14, 74),
    gx: rand(320, 900),
    gy: rand(-160, 90),
    delay: rand(0, 1.2),
    dur: rand(1.2, 2.2),
    paper: rand(0, 1) > 0.5,
    size: rand(20, 32),
  }));

  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="💨 YOUR CART HAS EXPERIENCED UNEXPECTED WIND CONDITIONS"
      markTone="navy"
      rootClass="rx--fan"
    >
      <div className="rx-fan__blades">
        <ProductArt id="fan" />
      </div>
      {items.map((it, i) =>
        it.paper ? (
          <span
            key={i}
            className="rx-fan__paper"
            style={
              {
                left: `${it.left}%`,
                top: `${it.top}%`,
                "--gx": `${it.gx}px`,
                "--gy": `${it.gy}px`,
                animationDelay: `${it.delay}s`,
                animationDuration: `${it.dur}s`,
              } as CSSProperties
            }
          />
        ) : (
          <span
            key={i}
            className="rx-fan__gust"
            style={
              {
                left: `${it.left}%`,
                top: `${it.top}%`,
                fontSize: it.size,
                "--gx": `${it.gx}px`,
                "--gy": `${it.gy}px`,
                animationDelay: `${it.delay}s`,
                animationDuration: `${it.dur}s`,
              } as CSSProperties
            }
          >
            🍃
          </span>
        ),
      )}
    </ReactionShell>
  );
}
