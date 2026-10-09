import type { JSX } from "react";

/**
 * Hand-drawn SVG illustrations. Each product gets a distinct marking so the
 * storefront never depends on remotely hosted images.
 */

const S = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const art: Record<string, JSX.Element> = {
  milk: (
    <>
      <path d="M40 46 L60 24 L80 46 V104 a6 6 0 0 1 -6 6 H46 a6 6 0 0 1 -6 -6 Z" fill="#ffffff" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M40 46 H80" stroke="#16213f" strokeWidth="3" />
      <path d="M60 24 V46" stroke="#16213f" strokeWidth="3" />
      <path d="M54 24 h12 v6 h-12 z" fill="#e6dcc8" stroke="#16213f" strokeWidth="2.5" />
      <rect x="46" y="62" width="28" height="30" rx="3" fill="#109c8e" />
      <path d="M52 74 q8 -8 16 0" stroke="#fff" strokeWidth="3" fill="none" {...S} />
    </>
  ),
  coffee: (
    <>
      <path d="M34 44 h52 l-6 58 a8 8 0 0 1 -8 7 H48 a8 8 0 0 1 -8 -7 Z" fill="#ffffff" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M30 52 h60 l2 -8 H28 Z" fill="#6f4e37" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M50 36 q-6 -10 2 -18" stroke="#9aa0b2" strokeWidth="3" fill="none" {...S} />
      <path d="M64 36 q6 -10 -2 -18" stroke="#9aa0b2" strokeWidth="3" fill="none" {...S} />
      <path d="M46 70 h28 v20 a4 4 0 0 1 -4 4 H50 a4 4 0 0 1 -4 -4 Z" fill="#6f4e37" />
    </>
  ),
  water: (
    <>
      <path d="M50 16 h20 v12 h-20 z" fill="#98b7cc" stroke="#16213f" strokeWidth="3" />
      <path d="M46 30 h28 v66 a10 10 0 0 1 -10 10 H56 a10 10 0 0 1 -10 -10 Z" fill="#e8f6ff" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M46 52 h34 v44 a10 10 0 0 1 -10 10 H56 a10 10 0 0 1 -10 -10 Z" fill="#7fd4f0" opacity="0.75" />
      <rect x="52" y="62" width="18" height="20" rx="2" fill="#fff" stroke="#16213f" strokeWidth="2" />
    </>
  ),
  soda: (
    <>
      <path d="M42 30 h36 l-4 74 a6 6 0 0 1 -6 5 H52 a6 6 0 0 1 -6 -5 Z" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M42 30 h36 l1 -8 H41 Z" fill="#c8ccd4" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M46 58 h28 l-2 44 a4 4 0 0 1 -4 4 H52 a4 4 0 0 1 -4 -4 Z" fill="#fff8ea" />
      <circle cx="60" cy="74" r="6" fill="#ffb020" />
      <circle cx="52" cy="48" r="3" fill="#fff" opacity="0.8" />
      <circle cx="68" cy="42" r="2.4" fill="#fff" opacity="0.8" />
    </>
  ),
  eggs: (
    <>
      <path d="M20 70 h80 v26 a6 6 0 0 1 -6 6 H26 a6 6 0 0 1 -6 -6 Z" fill="#d9a45b" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M20 70 l8 -10 h64 l8 10 Z" fill="#e9bf82" stroke="#16213f" strokeWidth="3" {...S} />
      <ellipse cx="42" cy="56" rx="12" ry="16" fill="#fffdf6" stroke="#16213f" strokeWidth="2.5" />
      <ellipse cx="62" cy="54" rx="12" ry="16" fill="#fffdf6" stroke="#16213f" strokeWidth="2.5" />
      <ellipse cx="82" cy="56" rx="12" ry="16" fill="#fffdf6" stroke="#16213f" strokeWidth="2.5" />
      <path d="M20 96 h80" stroke="#16213f" strokeWidth="3" />
    </>
  ),
  bread: (
    <>
      <path d="M22 60 q0 -22 38 -22 t38 22 v38 a6 6 0 0 1 -6 6 H28 a6 6 0 0 1 -6 -6 Z" fill="#e9bf82" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M40 46 q-6 12 0 22" stroke="#c9924f" strokeWidth="3" fill="none" />
      <path d="M60 42 q-6 12 0 24" stroke="#c9924f" strokeWidth="3" fill="none" />
      <path d="M80 46 q-6 12 0 22" stroke="#c9924f" strokeWidth="3" fill="none" />
      <path d="M34 84 h52" stroke="#c9924f" strokeWidth="3" />
    </>
  ),
  banana: (
    <>
      <path d="M30 34 q6 52 44 58 q22 2 26 -14 q-30 8 -50 -14 Q34 52 30 34 Z" fill="#ffd23f" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M30 34 q-6 -8 2 -10 q6 -2 8 10" fill="#e9bf82" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M100 78 q6 2 6 10" stroke="#16213f" strokeWidth="3" fill="none" {...S} />
      <path d="M44 44 q10 30 40 42" stroke="#e0b52f" strokeWidth="2.5" fill="none" />
    </>
  ),
  chips: (
    <>
      <path d="M38 26 q22 -8 44 0 l6 74 a6 6 0 0 1 -6 6 H38 a6 6 0 0 1 -6 -6 Z" fill="#ffb020" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M32 40 h56" stroke="#16213f" strokeWidth="2.5" />
      <path d="M44 40 v66" stroke="#e39b00" strokeWidth="2" />
      <path d="M76 40 v66" stroke="#e39b00" strokeWidth="2" />
      <circle cx="60" cy="72" r="12" fill="#c9560f" />
      <circle cx="55" cy="68" r="2" fill="#fff" />
    </>
  ),
  chocolate: (
    <>
      <rect x="30" y="26" width="60" height="76" rx="6" fill="#6b4226" stroke="#16213f" strokeWidth="3" />
      <path d="M50 26 v76 M70 26 v76 M30 51 h60 M30 76 h60" stroke="#3f2413" strokeWidth="3" />
      <rect x="34" y="30" width="12" height="17" rx="2" fill="#8a5a35" />
      <rect x="54" y="55" width="12" height="17" rx="2" fill="#8a5a35" />
    </>
  ),
  phone: (
    <>
      <rect x="34" y="18" width="52" height="90" rx="12" fill="#16213f" stroke="#16213f" strokeWidth="3" />
      <rect x="39" y="26" width="42" height="70" rx="7" fill="#dff3ff" />
      <rect x="52" y="20" width="16" height="5" rx="2.5" fill="#0b1229" />
      <rect x="44" y="34" width="32" height="6" rx="3" fill="#109c8e" />
      <rect x="44" y="46" width="24" height="6" rx="3" fill="#ff5a3c" />
      <rect x="44" y="58" width="28" height="6" rx="3" fill="#ffb020" />
      <circle cx="60" cy="88" r="5" fill="#0b1229" />
    </>
  ),
  laptop: (
    <>
      <path d="M32 30 h56 a4 4 0 0 1 4 4 v46 H28 V34 a4 4 0 0 1 4 -4 Z" fill="#16213f" stroke="#16213f" strokeWidth="3" />
      <rect x="34" y="36" width="52" height="40" rx="3" fill="#dff3ff" />
      <path d="M18 80 h84 l6 12 a4 4 0 0 1 -4 6 H16 a4 4 0 0 1 -4 -6 Z" fill="#c8ccd4" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M40 88 h40" stroke="#8f97a8" strokeWidth="3" />
      <rect x="42" y="48" width="36" height="4" rx="2" fill="#109c8e" />
    </>
  ),
  headphones: (
    <>
      <path d="M24 66 V56 a36 36 0 0 1 72 0 v10" fill="none" stroke="#16213f" strokeWidth="4" {...S} />
      <rect x="16" y="60" width="20" height="34" rx="8" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" />
      <rect x="84" y="60" width="20" height="34" rx="8" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" />
      <circle cx="26" cy="77" r="5" fill="#fff" />
      <circle cx="94" cy="77" r="5" fill="#fff" />
    </>
  ),
  mouse: (
    <>
      <path d="M60 20 a26 34 0 0 1 26 34 v30 a26 20 0 0 1 -52 0 V54 A26 34 0 0 1 60 20 Z" fill="#16213f" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M60 22 v34" stroke="#2c3a63" strokeWidth="3" />
      <rect x="56" y="34" width="8" height="16" rx="4" fill="#ff5a3c" />
      <path d="M44 60 h32" stroke="#2c3a63" strokeWidth="2.5" />
      <rect x="38" y="72" width="8" height="8" rx="2" fill="#ffb020" />
    </>
  ),
  tshirt: (
    <>
      <path d="M40 24 l-22 12 8 18 10 -5 v50 a4 4 0 0 0 4 4 h40 a4 4 0 0 0 4 -4 V49 l10 5 8 -18 L78 24 q-8 8 -19 8 t-19 -8 Z" fill="#fff" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M41 32 q19 12 38 0" stroke="#16213f" strokeWidth="2.5" fill="none" />
      <circle cx="60" cy="72" r="11" fill="#ff5a3c" />
      <path d="M50 88 h20" stroke="#109c8e" strokeWidth="4" />
    </>
  ),
  shoes: (
    <>
      <path d="M16 80 q4 -20 22 -22 l14 -2 q4 -14 18 -14 q14 0 18 16 l4 14 q10 4 10 12 v6 a4 4 0 0 1 -4 4 H20 a4 4 0 0 1 -4 -4 Z" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M16 88 h86" stroke="#16213f" strokeWidth="3" />
      <path d="M52 60 q14 8 30 6" stroke="#fff" strokeWidth="3" fill="none" />
      <circle cx="42" cy="76" r="4" fill="#fff" />
    </>
  ),
  sunglasses: (
    <>
      <rect x="14" y="48" width="40" height="28" rx="12" fill="#16213f" stroke="#16213f" strokeWidth="3" />
      <rect x="66" y="48" width="40" height="28" rx="12" fill="#16213f" stroke="#16213f" strokeWidth="3" />
      <path d="M54 58 q6 -8 12 0" fill="none" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M14 54 l-8 -6 M106 54 l8 -6" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M22 56 l10 14" stroke="#7fb0ff" strokeWidth="3" opacity="0.8" />
      <path d="M74 56 l10 14" stroke="#7fb0ff" strokeWidth="3" opacity="0.8" />
    </>
  ),
  hat: (
    <>
      <ellipse cx="60" cy="88" rx="46" ry="10" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" />
      <path d="M30 86 q2 -40 30 -40 t30 40" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M30 86 q30 -10 60 0" stroke="#c9351a" strokeWidth="4" fill="none" />
      <path d="M40 60 q20 -8 40 0" stroke="#c9351a" strokeWidth="3" fill="none" />
    </>
  ),
  pillow: (
    <>
      <path d="M18 40 q42 -12 84 0 q10 16 0 42 q-42 12 -84 0 q-10 -26 0 -42 Z" fill="#fff" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M26 46 q34 -8 68 0" stroke="#e6dcc8" strokeWidth="3" fill="none" />
      <circle cx="42" cy="66" r="4" fill="#c9e7d4" />
      <circle cx="60" cy="70" r="4" fill="#ffd9d0" />
      <circle cx="78" cy="66" r="4" fill="#ffe9bd" />
    </>
  ),
  alarm: (
    <>
      <path d="M30 34 l-12 -8 M90 34 l12 -8" stroke="#16213f" strokeWidth="4" {...S} />
      <circle cx="60" cy="64" r="34" fill="#fff" stroke="#16213f" strokeWidth="3" />
      <circle cx="60" cy="64" r="26" fill="#fbf4e6" stroke="#e6dcc8" strokeWidth="2" />
      <path d="M60 64 V46 M60 64 l12 8" stroke="#16213f" strokeWidth="4" {...S} />
      <path d="M44 88 l-6 12 M76 88 l6 12" stroke="#16213f" strokeWidth="4" {...S} />
      <circle cx="60" cy="64" r="3" fill="#ff5a3c" />
    </>
  ),
  vacuum: (
    <>
      <path d="M66 22 h12 a4 4 0 0 1 4 4 v44" fill="none" stroke="#16213f" strokeWidth="4" {...S} />
      <rect x="58" y="16" width="28" height="14" rx="5" fill="#109c8e" stroke="#16213f" strokeWidth="3" />
      <path d="M52 70 h36 a6 6 0 0 1 6 6 v18 a6 6 0 0 1 -6 6 H50 a6 6 0 0 1 -6 -6 V76 a6 6 0 0 1 6 -6 Z" fill="#ff5a3c" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M44 100 h48" stroke="#16213f" strokeWidth="4" />
      <circle cx="70" cy="85" r="6" fill="#fff" />
    </>
  ),
  fan: (
    <>
      <circle cx="60" cy="58" r="30" fill="#e8f6ff" stroke="#16213f" strokeWidth="3" />
      <path d="M60 58 q0 -22 16 -22 q10 12 -16 22 Z" fill="#109c8e" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M60 58 q-18 -10 -10 -24 q16 -4 10 24 Z" fill="#109c8e" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M60 58 q18 12 8 24 q-16 0 -8 -24 Z" fill="#109c8e" stroke="#16213f" strokeWidth="2.5" {...S} />
      <circle cx="60" cy="58" r="6" fill="#ffb020" stroke="#16213f" strokeWidth="2.5" />
      <path d="M60 88 v14 M44 102 h32" stroke="#16213f" strokeWidth="3.5" {...S} />
    </>
  ),
  shampoo: (
    <>
      <path d="M52 24 h16 v8 h-16 z" fill="#109c8e" stroke="#16213f" strokeWidth="3" />
      <path d="M56 32 v-8 q6 -4 12 0" fill="none" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M44 40 h24 l6 10 v56 a6 6 0 0 1 -6 6 H44 a6 6 0 0 1 -6 -6 V50 Z" fill="#cdeee9" stroke="#16213f" strokeWidth="3" {...S} />
      <rect x="42" y="66" width="28" height="24" rx="3" fill="#109c8e" />
      <circle cx="52" cy="54" r="3" fill="#fff" />
      <circle cx="64" cy="60" r="3" fill="#fff" />
    </>
  ),
  perfume: (
    <>
      <rect x="50" y="16" width="20" height="16" rx="3" fill="#16213f" stroke="#16213f" strokeWidth="2.5" />
      <path d="M42 34 h36 v66 a6 6 0 0 1 -6 6 H48 a6 6 0 0 1 -6 -6 Z" fill="#ffe9bd" stroke="#16213f" strokeWidth="3" {...S} />
      <rect x="48" y="58" width="24" height="28" rx="3" fill="#ffb020" />
      <path d="M50 24 l-4 -8 M70 24 l4 -8" stroke="#16213f" strokeWidth="2.5" {...S} />
    </>
  ),
  toothpaste: (
    <>
      <path d="M34 44 h48 v40 a10 10 0 0 1 -10 10 H44 a10 10 0 0 1 -10 -10 Z" fill="#e8f6ff" stroke="#16213f" strokeWidth="3" {...S} />
      <rect x="76" y="56" width="26" height="14" rx="4" fill="#109c8e" stroke="#16213f" strokeWidth="3" />
      <path d="M30 44 h56" stroke="#16213f" strokeWidth="3" />
      <path d="M40 62 h36" stroke="#c8ccd4" strokeWidth="3" />
      <path d="M40 74 h36" stroke="#c8ccd4" strokeWidth="3" />
      <rect x="46" y="30" width="24" height="14" rx="4" fill="#109c8e" />
    </>
  ),
  teddy: (
    <>
      <circle cx="34" cy="34" r="12" fill="#d9a45b" stroke="#16213f" strokeWidth="3" />
      <circle cx="86" cy="34" r="12" fill="#d9a45b" stroke="#16213f" strokeWidth="3" />
      <circle cx="60" cy="58" r="30" fill="#e9bf82" stroke="#16213f" strokeWidth="3" />
      <path d="M42 46 l14 -6 M78 46 l-14 -6" stroke="#c9924f" strokeWidth="3" {...S} />
      <circle cx="50" cy="56" r="3.5" fill="#16213f" />
      <circle cx="70" cy="56" r="3.5" fill="#16213f" />
      <path d="M60 64 v6 M52 76 q8 8 16 0" stroke="#16213f" strokeWidth="3" fill="none" {...S} />
      <circle cx="60" cy="68" r="3" fill="#16213f" />
    </>
  ),
  book: (
    <>
      <path d="M60 34 q-16 -10 -40 -8 v58 q24 -2 40 8 q16 -10 40 -8 V26 q-24 -2 -40 8 Z" fill="#fffdf6" stroke="#16213f" strokeWidth="3" {...S} />
      <path d="M60 34 v58" stroke="#16213f" strokeWidth="3" />
      <path d="M30 44 h22 M30 54 h22 M68 44 h22 M68 54 h22" stroke="#9aa0b2" strokeWidth="2.5" {...S} />
      <rect x="52" y="20" width="16" height="12" rx="2" fill="#ff5a3c" />
    </>
  ),
  puzzle: (
    <>
      <path d="M28 28 h26 a8 8 0 1 1 0 16 v0 h26 v26 a8 8 0 1 0 0 16 H28 Z" fill="#109c8e" stroke="#16213f" strokeWidth="3" {...S} transform="translate(6 0)" />
      <path d="M60 44 h26 a8 8 0 1 1 0 16 h0 v26 H60 a8 8 0 1 0 0 -16 v-26 Z" fill="#ffb020" stroke="#16213f" strokeWidth="3" {...S} opacity="0.95" />
    </>
  ),
  duck: (
    <>
      <ellipse cx="60" cy="76" rx="34" ry="22" fill="#ffd23f" stroke="#16213f" strokeWidth="3" />
      <circle cx="44" cy="46" r="20" fill="#ffd23f" stroke="#16213f" strokeWidth="3" />
      <circle cx="38" cy="42" r="3.5" fill="#16213f" />
      <path d="M24 48 l-16 6 16 6 Z" fill="#ff5a3c" stroke="#16213f" strokeWidth="2.5" {...S} />
      <path d="M78 66 q16 -8 18 4" stroke="#e0b52f" strokeWidth="3" fill="none" />
      <circle cx="52" cy="38" r="2.5" fill="#fff" />
    </>
  ),
};

export function ProductArt({ id }: { id: string }): JSX.Element {
  const node = art[id] ?? art.duck;
  return (
    <svg viewBox="0 0 120 120" role="img" aria-hidden="true" focusable="false">
      {node}
    </svg>
  );
}

export function HeroArt(): JSX.Element {
  return (
    <svg viewBox="0 0 240 220" role="img" aria-label="A shopping bag with a milk carton tipping out of it">
      <ellipse cx="120" cy="200" rx="86" ry="14" fill="#16213f" opacity="0.12" />
      <path d="M54 78 h132 l14 100 a10 10 0 0 1 -10 12 H50 a10 10 0 0 1 -10 -12 Z" fill="#ff5a3c" stroke="#16213f" strokeWidth="4" {...S} />
      <path d="M54 78 h132" stroke="#c9351a" strokeWidth="4" />
      <path d="M92 78 q28 -30 56 0" fill="none" stroke="#16213f" strokeWidth="5" {...S} />
      <circle cx="120" cy="140" r="22" fill="#fff8ea" />
      <text x="120" y="149" textAnchor="middle" fontFamily="Georgia, serif" fontSize="26" fontWeight="900" fill="#16213f">
        !
      </text>
      <g transform="rotate(24 190 60)">
        <path d="M172 40 L190 20 L208 40 V92 a6 6 0 0 1 -6 6 H178 a6 6 0 0 1 -6 -6 Z" fill="#ffffff" stroke="#16213f" strokeWidth="3.5" {...S} />
        <path d="M172 40 H208" stroke="#16213f" strokeWidth="3.5" />
        <rect x="178" y="56" width="24" height="24" rx="3" fill="#109c8e" />
      </g>
      <circle cx="44" cy="52" r="6" fill="#ffb020" />
      <circle cx="212" cy="120" r="5" fill="#109c8e" />
      <path d="M28 108 q8 -8 16 0" stroke="#ffb020" strokeWidth="4" fill="none" {...S} />
    </svg>
  );
}
