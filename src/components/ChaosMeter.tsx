import type { JSX } from "react";
import { REACTIONS } from "../reactions/registry";

interface ChaosMeterProps {
  discovered: number;
  total?: number;
  hidden?: boolean;
}

export function ChaosMeter({ discovered, total = Object.keys(REACTIONS).length, hidden = false }: ChaosMeterProps): JSX.Element | null {
  if (hidden) return null;
  const pct = Math.round((discovered / total) * 100);
  const label =
    discovered === 0
      ? "Nothing has gone wrong yet. Statistically suspicious."
      : discovered < 5
        ? "Mild chaos. The website is only slightly awake."
        : discovered < 12
          ? "Moderate chaos. Someone should check on the milk."
          : discovered < 22
            ? "Heavy chaos. The UI team has left the building."
            : discovered < total
              ? "Severe chaos. Remaining secrets: a few."
              : "Total chaos. You have found everything. Why are you still here?";

  return (
    <div className="chaos" role="status">
      <div className="chaos__head">
        <span>Chaos meter</span>
        <span className="chaos__val">{pct}%</span>
      </div>
      <div className="chaos__bar">
        <div className="chaos__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="chaos__label">
        {discovered} of {total} reactions discovered. {label}
      </div>
    </div>
  );
}
