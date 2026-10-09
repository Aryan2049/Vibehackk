import { useEffect, useState, type JSX } from "react";
import { PRODUCTS } from "../data/products";
import type { Product } from "../types";

interface DemoControlsProps {
  onResetEffects: () => void;
  onResetCart: () => void;
  onReplayMilk: () => void;
  onSummonBot: () => void;
  onTrigger: (product: Product) => void;
}

export function DemoControls({
  onResetEffects,
  onResetCart,
  onReplayMilk,
  onSummonBot,
  onTrigger,
}: DemoControlsProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);

  /* Two-step cart reset, and the prompt times out so it cannot get stuck. */
  useEffect(() => {
    if (!confirming) return;
    const id = window.setTimeout(() => setConfirming(false), 4000);
    return () => window.clearTimeout(id);
  }, [confirming]);

  function resetCart() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setConfirming(false);
    setListOpen(false);
    onResetCart();
  }

  return (
    <div className="demo">
      {open ? (
        <div className="demo__panel" role="dialog" aria-label="Demo mode controls">
          <h4>Demo mode</h4>

          <button
            type="button"
            className="btn btn--sm"
            onClick={() => {
              setListOpen((v) => !v);
            }}
            aria-expanded={listOpen}
          >
            🎬 Trigger a reaction
          </button>

          {listOpen ? (
            <div className="demo__list" role="group" aria-label="Choose a reaction to demonstrate">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onTrigger(p);
                    setOpen(false);
                    setListOpen(false);
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          ) : null}

          <button type="button" className="btn btn--sm" onClick={onReplayMilk}>
            🥛 Replay the milk spill
          </button>
          <button type="button" className="btn btn--sm" onClick={onResetEffects}>
            🧽 Reset active effects
          </button>
          <button type="button" className="btn btn--sm" onClick={onResetEffects}>
            🪄 Restore the normal storefront
          </button>
          <button type="button" className="btn btn--sm" onClick={onSummonBot}>
            🤖 Summon the support bot
          </button>
          <button
            type="button"
            className={`btn btn--sm${confirming ? " btn--danger" : ""}`}
            onClick={resetCart}
            aria-live="polite"
          >
            {confirming ? "⚠️ Press again to erase the cart" : "🗑️ Reset the shopping cart"}
          </button>
        </div>
      ) : null}

      <button type="button" className="demo__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "CLOSE DEMO MODE" : "DEMO MODE"}
      </button>
    </div>
  );
}
