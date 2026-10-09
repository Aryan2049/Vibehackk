import { useEffect, useState, type FormEvent, type JSX } from "react";
import type { CartLine } from "../types";
import { PRODUCT_BY_ID } from "../data/products";
import { money } from "../store";
import { Confetti } from "./Confetti";

export const ORDER_STAGES = [
  "Checking whether you really need this. We cannot stop you, we can only look.",
  "Consulting the shopping cart, which has now been consulted more than enough.",
  "The cart says yes. Your bank account has requested a meeting and is bringing a folder.",
  "Order confirmed. Your questionable decisions are on their way.",
];

const STEPS = ["Cart", "Your details", "Confirming", "Done"];

export interface PlacedOrder {
  number: string;
  total: number;
  count: number;
}

interface CheckoutModalProps {
  lines: CartLine[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string | null;
  couponPercent: number;
  reduced: boolean;
  onClose: () => void;
  onPlaced: (order: PlacedOrder) => void;
}

type Stage = "form" | "processing" | "done";

const FIELDS = [
  { id: "name", label: "Full name", placeholder: "Ada Lovelace", validate: (v: string) => v.trim().length >= 2 },
  {
    id: "email",
    label: "Email address",
    placeholder: "ada@example.com",
    validate: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  },
  { id: "address", label: "Delivery address", placeholder: "12 Wobble Street", validate: (v: string) => v.trim().length >= 4 },
  { id: "city", label: "Town or city", placeholder: "Milkford", validate: (v: string) => v.trim().length >= 2 },
  { id: "postal", label: "Postcode", placeholder: "ML1 4QX", validate: (v: string) => v.trim().length >= 3 },
] as const;

export function CheckoutModal({
  lines,
  subtotal,
  discount,
  total,
  couponCode,
  couponPercent,
  reduced,
  onClose,
  onPlaced,
}: CheckoutModalProps): JSX.Element {
  const [stage, setStage] = useState<Stage>("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [attempted, setAttempted] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [method, setMethod] = useState("optimism");
  const [orderNumber] = useState(
    () => `OM-${Math.floor(100000 + Math.random() * 899999)}`,
  );

  const count = lines.reduce((n, l) => n + l.qty, 0);

  useEffect(() => {
    if (stage !== "processing") return;
    const id = window.setInterval(() => {
      setStageIndex((i) => {
        if (i >= ORDER_STAGES.length - 1) {
          window.clearInterval(id);
          setStage("done");
          return i;
        }
        return i + 1;
      });
    }, reduced ? 350 : 1150);
    return () => window.clearInterval(id);
  }, [stage, reduced]);

  useEffect(() => {
    if (stage === "done") {
      onPlaced({ number: orderNumber, total, count });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  function submit(e: FormEvent) {
    e.preventDefault();
    setAttempted(true);
    const next: Record<string, boolean> = {};
    for (const f of FIELDS) {
      if (!f.validate(values[f.id] ?? "")) next[f.id] = true;
    }
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setStage("processing");
    }
  }

  const stepIndex = stage === "form" ? 1 : stage === "processing" ? 2 : 3;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Checkout">
      <div className="scrim" onClick={stage === "form" ? onClose : undefined} aria-hidden="true" />
      <div className="modal__panel">
        {stage === "done" ? <Confetti reduced={reduced} /> : null}

        <div className="modal__head">
          <h2 style={{ fontSize: 24 }}>{stage === "done" ? "Order placed" : "Checkout"}</h2>
          <button
            type="button"
            className="iconbtn modal__close"
            onClick={onClose}
            aria-label="Close checkout"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="progress" aria-hidden="true">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`progress__step${i < stepIndex ? " is-done" : ""}${i === stepIndex ? " is-active" : ""}`}
            >
              {s}
            </div>
          ))}
        </div>

        <div className="modal__body">
          {stage === "form" ? (
            <form onSubmit={submit} noValidate>
              <div className="demo-note">
                <span aria-hidden="true">🧪</span>
                <span>
                  Demo checkout. We do not ask for card details, partly because we do not want them and mostly because we
                  cannot be trusted with them.
                </span>
              </div>

              <div className="checkout-grid">
                <div>
                  <div className="form__grid">
                    {FIELDS.map((f) => (
                      <div key={f.id} className={`field${errors[f.id] ? " has-error" : ""}`}>
                        <label htmlFor={`co-${f.id}`}>{f.label}</label>
                        <input
                          id={`co-${f.id}`}
                          value={values[f.id] ?? ""}
                          placeholder={f.placeholder}
                          autoComplete="off"
                          aria-invalid={Boolean(errors[f.id])}
                          onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                        />
                        {errors[f.id] ? (
                          <div className="field__err">
                            {attempted
                              ? `Please enter a valid ${f.label.toLowerCase()}. The form insists.`
                              : "Required"}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="field">
                    <label htmlFor="co-method">Payment method</label>
                    <select id="co-method" value={method} onChange={(e) => setMethod(e.target.value)}>
                      <option value="optimism">Optimism (recommended)</option>
                      <option value="vibes">Good vibes only</option>
                      <option value="later">Pay later, feel it sooner</option>
                      <option value="chaos">Chaos, as usual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="summary">
                    <h4>Order summary</h4>
                    {lines.map((l) => {
                      const p = PRODUCT_BY_ID[l.id];
                      if (!p) return null;
                      return (
                        <div className="summary__row" key={l.id}>
                          <span>
                            {p.name} × {l.qty}
                          </span>
                          <span>{money(p.price * l.qty)}</span>
                        </div>
                      );
                    })}
                    <div className="summary__row">
                      <span>Subtotal</span>
                      <span>{money(subtotal)}</span>
                    </div>
                    {couponCode && couponPercent > 0 ? (
                      <div className="summary__row">
                        <span>
                          Discount {couponCode} ({couponPercent}%)
                        </span>
                        <span>−{money(discount)}</span>
                      </div>
                    ) : null}
                    <div className="summary__row">
                      <span>Shipping</span>
                      <span>{money(0)}</span>
                    </div>
                    <div className="summary__grand">
                      <span>Total</span>
                      <span>{money(total)}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary btn--block" style={{ marginTop: 16 }}>
                    Place order ({count} item{count === 1 ? "" : "s"})
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          {stage === "processing" ? (
            <div style={{ padding: "8px 0 12px" }}>
              <div className="stages">
                {ORDER_STAGES.map((s, i) => (
                  <div
                    key={s}
                    className={`stage${i === stageIndex ? " is-on" : ""}${i < stageIndex ? " is-done" : ""}`}
                  >
                    <span className="stage__dot" aria-hidden="true">
                      {i < stageIndex ? "✓" : i + 1}
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="bigbar">
                <div
                  className="bigbar__fill"
                  style={{ width: `${((stageIndex + 1) / ORDER_STAGES.length) * 100}%` }}
                />
              </div>
            </div>
          ) : null}

          {stage === "done" ? (
            <div className="confirm">
              <div className="confirm__mark" aria-hidden="true">
                <span style={{ fontSize: 40 }}>✓</span>
              </div>
              <h3 style={{ fontSize: 32 }}>Your questionable decisions are on their way.</h3>
              <p style={{ color: "var(--grey)", marginTop: 10, lineHeight: 1.6 }}>
                We have dispatched {count} item{count === 1 ? "" : "s"} toward you. One of them is the milk. It knows
                what it did and it is not finished.
              </p>
              <div className="confirm__order">Order {orderNumber}</div>

              <div className="summary" style={{ textAlign: "left", marginBottom: 18 }}>
                <h4>Purchased</h4>
                {lines.map((l) => {
                  const p = PRODUCT_BY_ID[l.id];
                  if (!p) return null;
                  return (
                    <div className="summary__row" key={l.id}>
                      <span>
                        {p.name} × {l.qty}
                      </span>
                      <span>{money(p.price * l.qty)}</span>
                    </div>
                  );
                })}
                <div className="summary__grand">
                  <span>Final total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <button type="button" className="btn btn--primary" onClick={onClose}>
                Shop again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
