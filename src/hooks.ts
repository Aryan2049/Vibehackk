import { useEffect, useRef, useState, type RefObject } from "react";
import { useMessageCycle } from "./reactions/hooks";
import { HEALTH_LINES } from "./data/comedy";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
}

/**
 * Dialog behaviour: focus the container on open, trap Tab inside it, close on
 * Escape, and hand focus back to whatever opened it.
 */
export function useDialogFocus(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
): void {
  /* Keep the latest close handler without re-running the focus effect. */
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    if (!node) return;

    const previous = document.activeElement as HTMLElement | null;
    node.setAttribute("tabindex", "-1");
    node.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables(node);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && node.contains(active);

      if (event.shiftKey && (!inside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!inside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      node.removeAttribute("tabindex");
      previous?.focus?.();
    };
  }, [open, ref]);
}

/**
 * A sale countdown that occasionally gains time instead of losing it.
 * Bounded at 1.6x the starting value so it never runs away.
 */
export function useAbsurdCountdown(startSeconds: number) {
  const [state, setState] = useState({ secs: startSeconds, added: 0, bump: 0 });
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setState((s) => ({ ...s, secs: s.secs <= 1 ? startSeconds : s.secs - 1 }));
    }, 1000);

    const bonus = window.setInterval(() => {
      setState((s) => {
        const add = 90 + Math.floor(Math.random() * 4) * 30;
        const next = s.secs + add;
        if (next > startSeconds * 1.6) return s;
        return { secs: next, added: add, bump: s.bump + 1 };
      });
    }, 14000);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(bonus);
    };
  }, [startSeconds]);

  useEffect(() => {
    if (state.bump === 0) return;
    setFlashing(true);
    const id = window.setTimeout(() => setFlashing(false), 4200);
    return () => window.clearTimeout(id);
  }, [state.bump]);

  return { seconds: state.secs, added: state.added, flashing };
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

/** Rotating system-health reassurance. */
export function useHealthStatus(): string {
  return useMessageCycle(HEALTH_LINES, 5200);
}

/**
 * Spotlights one product card at a time so the page has a pulse while the
 * visitor sits idle. Single interval, no stacked timers, one card at a time.
 */
export function useIdleSpotlight(count: number, reduced: boolean): number | null {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || count <= 0) return;
    setActive(null);
    const id = window.setInterval(() => {
      setActive((prev) => (prev === null ? Math.floor(Math.random() * count) : null));
    }, 6500);
    return () => window.clearInterval(id);
  }, [count, reduced]);

  return active;
}
