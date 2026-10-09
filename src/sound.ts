type Pitch = "low" | "mid" | "high";

const FREQ: Record<Pitch, number> = { low: 220, mid: 440, high: 720 };

let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

/**
 * Plays a very short synthesised blip. Sound is optional, muted by default and
 * never required for the experience to work.
 */
export function blip(pitch: Pitch = "mid"): void {
  const ac = context();
  if (!ac) return;
  try {
    if (ac.state === "suspended") void ac.resume();
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    const now = ac.currentTime;
    osc.type = pitch === "low" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(FREQ[pitch], now);
    osc.frequency.exponentialRampToValueAtTime(FREQ[pitch] * 1.6, now + 0.12);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch {
    /* audio is a bonus, never a requirement */
  }
}
