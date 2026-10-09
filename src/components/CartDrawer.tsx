import { useRef, useState, type FormEvent, type JSX } from "react";
import type { CartLine } from "../types";
import { PRODUCT_BY_ID } from "../data/products";
import { money } from "../store";
import { useDialogFocus } from "../hooks";
import { ProductArt } from "./Art";

export interface CouponMessage {
  ok: boolean;
  text: string;
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  couponCode: string | null;
  couponPercent: number;
  couponMessage: CouponMessage | null;
  quip: string | null;
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onApplyCoupon: (code: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  open,
  lines,
  subtotal,
  discount,
  couponCode,
  couponPercent,
  couponMessage,
  quip,
  onClose,
  onSetQty,
  onRemove,
  onApplyCoupon,
  onCheckout,
}: CartDrawerProps): JSX.Element | null {
  const [code, setCode] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  useDialogFocus(panelRef, open, onClose);

  if (!open) return null;

  const total = Math.max(subtotal - discount, 0);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  function apply(e: FormEvent) {
    e.preventDefault();
    onApplyCoupon(code.trim().toUpperCase());
  }

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <aside className="drawer" ref={panelRef} role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="drawer__head">
          <h2>Your cart</h2>
          <span className="drawer__count">
            {count} item{count === 1 ? "" : "s"}
          </span>
          <button type="button" className="iconbtn modal__close" onClick={onClose} aria-label="Close cart">
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className="drawer__body">
          {quip && lines.length > 0 ? (
            <div className="drawer__quip">
              <span aria-hidden="true">💬</span>
              <span>{quip}</span>
            </div>
          ) : null}

          {lines.length === 0 ? (
            <div style={{ textAlign: "center", padding: "46px 10px" }}>
              <div style={{ fontSize: 48 }} aria-hidden="true">
                🛒
              </div>
              <h3 style={{ margin: "14px 0 8px", fontSize: 22 }}>Your cart is empty</h3>
              <p style={{ color: "var(--grey)", fontSize: 14, lineHeight: 1.6 }}>
                Nothing in here. No wobbling eggs, no runaway shoes, no unresolved decisions. Yet.
              </p>
              <button type="button" className="btn btn--primary" style={{ marginTop: 18 }} onClick={onClose}>
                Go and add something chaotic
              </button>
            </div>
          ) : (
            lines.map((line) => {
              const p = PRODUCT_BY_ID[line.id];
              if (!p) return null;
              return (
                <div className="lineitem" key={line.id}>
                  <div className="lineitem__art">
                    <ProductArt id={p.id} />
                  </div>
                  <div>
                    <div className="lineitem__name">{p.name}</div>
                    <div className="lineitem__price">
                      {money(p.price)} each
                    </div>
                    <div className="qty">
                      <button
                        type="button"
                        className="qty__btn"
                        onClick={() => onSetQty(line.id, line.qty - 1)}
                        aria-label={`Decrease quantity of ${p.name}`}
                      >
                        −
                      </button>
                      <span className="qty__val" key={line.qty} aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="qty__btn"
                        onClick={() => onSetQty(line.id, line.qty + 1)}
                        aria-label={`Increase quantity of ${p.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="lineitem__right">
                    <span className="lineitem__total">{money(p.price * line.qty)}</span>
                    <button type="button" className="remove" onClick={() => onRemove(line.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {lines.length > 0 ? (
          <div className="drawer__foot">
            <form className="coupon__form" onSubmit={apply}>
              <label className="sr-only" htmlFor="coupon">
                Coupon code
              </label>
              <input
                id="coupon"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon code"
                autoComplete="off"
              />
              <button type="submit" className="btn btn--navy btn--sm">
                Apply
              </button>
            </form>

            {couponMessage ? (
              <div className={`coupon__msg coupon__msg--${couponMessage.ok ? "ok" : "bad"}`}>
                {couponMessage.text}
              </div>
            ) : (
              <p className="pill-note" style={{ marginBottom: 12 }}>
                Try <span className="kbd">CHAOS10</span> for a real 10% off. The others are a lifestyle choice.
              </p>
            )}

            <div className="totals">
              <div className="totalrow">
                <span>Subtotal</span>
                <span className="totalrow__val">{money(subtotal)}</span>
              </div>
              {couponCode && couponPercent > 0 ? (
                <div className="totalrow totalrow--bad">
                  <span className="discount-row">
                    Discount ({couponCode}, {couponPercent}%)
                    <span className="discount-badge">−{couponPercent}%</span>
                  </span>
                  <span className="totalrow__val">−{money(discount)}</span>
                </div>
              ) : null}
              <div className="totalrow">
                <span>Shipping (suspiciously free)</span>
                <span className="totalrow__val">{money(0)}</span>
              </div>
              <div className="totalrow">
                <span>Handling</span>
                <span className="totalrow__val">{money(0)}</span>
              </div>
              <div className="totalrow totalrow--grand">
                <span>Total</span>
                <span
                  key={couponCode ?? "no-coupon"}
                  className={`totalrow__val${couponCode && couponPercent > 0 ? " totalrow__val--pop" : ""}`}
                >
                  {money(total)}
                </span>
              </div>
            </div>

            <button type="button" className="btn btn--primary btn--block" onClick={onCheckout}>
              Checkout securely (ish)
            </button>
          </div>
        ) : null}
      </aside>
    </>
  );
}
