import { useEffect, useState } from "react";

/** Cycles through a list of messages, one every `delay` ms. */
export function useMessageCycle(words: string[], delay: number): string {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = window.setInterval(() => {
      setI((prev) => Math.min(prev + 1, words.length - 1));
    }, delay);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, words.length]);
  return words[i] ?? words[0] ?? "";
}

/** Counts down from `from` to 0, one step per `stepMs`. */
export function useCountdown(from: number, stepMs: number): number {
  const [value, setValue] = useState(from);
  useEffect(() => {
    setValue(from);
    const id = window.setInterval(() => {
      setValue((v) => Math.max(v - 1, 0));
    }, stepMs);
    return () => window.clearInterval(id);
  }, [from, stepMs]);
  return value;
}

/** Returns true after `delay` ms. Useful for staged reveals. */
export function useAfter(delay: number): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);
  return on;
}

export function useNow(active: boolean): number {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setT((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [active]);
  return t;
}
