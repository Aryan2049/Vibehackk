import type { JSX } from "react";
import type { Toast } from "../types";

interface ToastsProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

export function Toasts({ toasts, onDismiss }: ToastsProps): JSX.Element | null {
  if (toasts.length === 0) return null;
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.tone}`} role="status">
          <span className="toast__icon" aria-hidden="true">
            {t.icon}
          </span>
          <div>
            <div className="toast__title">{t.title}</div>
            <div className="toast__msg">{t.message}</div>
          </div>
          <button
            type="button"
            className="toast__close"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
