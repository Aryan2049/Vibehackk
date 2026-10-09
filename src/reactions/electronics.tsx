import type { CSSProperties, JSX } from "react";
import { ReactionShell, type ReactionProps } from "./shell";
import { useMessageCycle } from "./hooks";

/* ============================================================
   PHONE: notification apocalypse
   ============================================================ */
const PHONE_NOTES = [
  { icon: "📱", title: "Your phone wants a vacation.", text: "It has booked the flights and does not want you to come." },
  { icon: "🔋", title: "Battery at 101%.", text: "Mathematics has resigned and taken the calculator with it." },
  {
    icon: "🔔",
    title: "You have a new notification about notifications.",
    text: "We escalated it to the notification team and they sent a notification.",
  },
  { icon: "🛍️", title: "Oops!Mart would like your location.", text: "We already know. We just want to feel included." },
  { icon: "📸", title: "1,204 photos of the same cloud.", text: "The cloud has asked for some space and a moment to think." },
  { icon: "⚠️", title: "Storage almost full.", text: "Almost. Perpetually almost. Forever almost." },
  { icon: "📞", title: "Missed call from Unknown.", text: "They called about your extended warranty." },
  { icon: "🧠", title: "Screen time up 400%.", text: "Your phone is proud of itself." },
  { icon: "🎧", title: "Playback resumed.", text: "You never pressed play." },
  { icon: "🌙", title: "Do not disturb is disturbed.", text: "It is disturbing you about it." },
  { icon: "🐦", title: "Someone liked a post from 2011.", text: "It was your mother." },
  { icon: "🧾", title: "You have 47 unread receipts.", text: "You read all 47. The count will not change." },
];

export function PhoneReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const notes = PHONE_NOTES.slice(0, reduced ? 4 : PHONE_NOTES.length);
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark="📱 NOTIFICATION APOCALYPSE IN PROGRESS"
      markTone="coral"
      rootClass="rx--phone"
    >
      <div className="rx-storm" role="log" aria-label="Incoming notifications">
        {notes.map((n, i) => (
          <div
            key={i}
            className="rx-storm__note"
            style={{ animationDelay: `${i * 0.22}s` } as CSSProperties}
          >
            <span className="rx-storm__icon">{n.icon}</span>
            <div>
              <strong>{n.title}</strong>
              <span>{n.text}</span>
            </div>
          </div>
        ))}
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   LAPTOP: fake OS update
   ============================================================ */
const UPDATE_LINES = [
  "Downloading update 1 of 47…",
  "Downloading update 2 of 47 (you did not request this, we did)",
  "Installing feelings.dll",
  "Configuring features nobody has ever requested, anywhere",
  "Asking again whether Oops!Mart can be your default browser",
  "Applying update 46 of 47. Do not turn off your computer. Do not turn off anything.",
  "Update 47 of 47 is considering its options and taking its time about it",
  "Almost done. Definitely almost done. Possibly almost done.",
];

export function LaptopReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const status = useMessageCycle(UPDATE_LINES, reduced ? 900 : 780);
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={null}
      rootClass="rx--laptop"
      actions={[]}
    >
      <div className="rx-os">
        <div className="rx-os__logo">🪟</div>
        <h3 style={{ color: "#fff", fontSize: 26, marginBottom: 10 }}>Working on updates</h3>
        <div className="rx-os__status">{status}</div>
        <div className="rx-os__track">
          <div className="rx-os__fill" />
        </div>
        <div className="rx-os__meta">
          47 updates in total. You asked for zero. This may take several Tuesdays and one Wednesday.
        </div>
        <button type="button" className="btn btn--primary btn--sm" style={{ marginTop: 20 }} onClick={onClose}>
          {product.recoveryLabel ?? "Skip update"}
        </button>
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   HEADPHONES: main character mode
   ============================================================ */
export function HeadphonesReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  const bars = Array.from({ length: 9 }, (_, i) => i);
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={null}
      rootClass="rx--headphones"
      actions={[]}
    >
      <div className="rx-dim" onClick={onClose} />
      <div className="rx-player">
        <div className="rx-player__disc" />
        <div className="rx-player__title">Average Tuesday (Extended)</div>
        <div className="rx-player__artist">Performed by You. Recorded by Nobody. Track 1 of 1.</div>
        <div className="rx-player__bars">
          {bars.map((b) => (
            <i key={b} style={{ animationDelay: `${(b % 4) * 0.16}s`, height: reduced ? 18 : undefined }} />
          ))}
        </div>
        <button type="button" className="btn btn--primary btn--sm" onClick={onClose}>
          {product.recoveryLabel ?? "Take the headphones off"}
        </button>
      </div>
    </ReactionShell>
  );
}

/* ============================================================
   GAMING MOUSE: rage mode
   ============================================================ */
export function MouseReaction({ product, onClose, reduced }: ReactionProps): JSX.Element {
  return (
    <ReactionShell
      product={product}
      onClose={onClose}
      hideArt
      mark={reduced ? null : "🖱️ MOMENTARY SCREEN TREMOR DETECTED"}
      markTone="coral"
      rootClass="rx--mouse"
    >
      <div className="rx-achv">
        <div className="rx-achv__medal">🏆</div>
        <div>
          <strong>Achievement unlocked: Clicked a Mouse to Buy a Mouse</strong>
          <span>Rarity: extremely common. 26,000 DPI, 0 restraint.</span>
        </div>
      </div>
      {!reduced ? <span className="rx-spark" style={{ left: "18%", top: "22%", animationDelay: "0.2s" }}>⚡</span> : null}
    </ReactionShell>
  );
}
