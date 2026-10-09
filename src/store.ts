import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCT_BY_ID } from "./data/products";
import type { CartLine } from "./types";

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

/* ---------------- coupons ---------------- */

export interface CouponDef {
  percent: number;
  ok: boolean;
  message: string;
  label: string;
  advice?: string;
  reaction?: "milk";
}

export const COUPONS: Record<string, CouponDef> = {
  CHAOS10: {
    percent: 10,
    ok: true,
    label: "CHAOS10",
    message: "CHAOS10 applied. 10% off your total. Chaos itself remains full price.",
  },
  MILKSPILL: {
    percent: 0,
    ok: true,
    label: "MILKSPILL",
    message: "MILKSPILL accepted. No money saved. We have instead spilled the milk for you.",
    reaction: "milk",
  },
  FREEWISDOM: {
    percent: 0,
    ok: true,
    label: "FREEWISDOM",
    message: "No discount applied.",
    advice:
      "Unsolicited advice: buy the pillow, skip the alarm clock. Sleep is free and alarms are a subscription to stress.",
  },
  BROKEMODE: {
    percent: 0,
    ok: false,
    label: "BROKEMODE",
    message: "BROKEMODE recognised. The price has not changed, which is exactly what BROKEMODE means. Respect.",
  },
};

export interface CouponState {
  code: string;
  percent: number;
}

export const CART_KEY = "oopsmart.cart.v2";

function readCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (l): l is CartLine =>
          typeof l === "object" &&
          l !== null &&
          typeof (l as CartLine).id === "string" &&
          typeof (l as CartLine).qty === "number" &&
          (l as CartLine).qty > 0 &&
          Boolean(PRODUCT_BY_ID[(l as CartLine).id]),
      )
      .map((l) => ({ id: l.id, qty: Math.min(Math.max(Math.round(l.qty), 1), 99) }));
  } catch {
    return [];
  }
}

export interface CartApi {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

export function useCart(): CartApi {
  const [lines, setLines] = useState<CartLine[]>(() =>
    typeof window === "undefined" ? [] : readCart(),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable, cart still works for this session */
    }
  }, [lines]);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === productId);
      if (found) {
        return prev.map((l) => (l.id === productId ? { ...l, qty: Math.min(l.qty + qty, 99) } : l));
      }
      return [...prev, { id: productId, qty }];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.id !== productId));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== productId)
        : prev.map((l) => (l.id === productId ? { ...l, qty: Math.min(qty, 99) } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const l of lines) {
      const p = PRODUCT_BY_ID[l.id];
      if (!p) continue;
      c += l.qty;
      s += p.price * l.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  return { lines, add, remove, setQty, clear, count, subtotal };
}
