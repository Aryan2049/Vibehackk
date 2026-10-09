import { useState, type JSX } from "react";

interface DemoControlsProps {
  onResetEffects: () => void;
  onResetCart: () => void;
  onReplayMilk: () => void;
  onSummonBot: () => void;
}

export function DemoControls({
  onResetEffects,
  onResetCart,
  onReplayMilk,
  onSummonBot,
}: DemoControlsProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="demo">
      {open ? (
        <div className="demo__panel" role="dialog" aria-label="Demo mode controls">
          <h4>Demo mode</h4>
          <button type="button" className="btn btn--sm" onClick={onReplayMilk}>
            🥛 Replay the milk spill
          </button>
          <button type="button" className="btn btn--sm" onClick={onResetEffects}>
            🧽 Reset all active effects
          </button>
          <button type="button" className="btn btn--sm" onClick={onResetEffects}>
            🪄 Restore the normal storefront
          </button>
          <button type="button" className="btn btn--sm" onClick={onResetCart}>
            🗑️ Reset the shopping cart
          </button>
          <button type="button" className="btn btn--sm" onClick={onSummonBot}>
            🤖 Summon the support bot
          </button>
        </div>
      ) : null}
      <button
        type="button"
        className="demo__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "CLOSE DEMO MODE" : "DEMO MODE"}
      </button>
    </div>
  );
}
