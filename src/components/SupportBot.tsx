import { useEffect, useRef, useState, type FormEvent, type JSX } from "react";
import { BOT_OPENING, BOT_TOPICS } from "../data/comedy";

interface SupportBotProps {
  open: boolean;
  onClose: () => void;
}

interface Msg {
  id: number;
  from: "them" | "me";
  text: string;
}

function matchTopic(text: string): { a: string; follow: string } {
  const t = text.toLowerCase();
  const rules: [string[], number][] = [
    [["milk", "dairy", "flood"], 0],
    [["shoe", "run", "ran"], 1],
    [["broken", "website", "bug", "error"], 2],
    [["cart", "basket", "judg"], 3],
    [["human", "person", "manager", "someone"], 4],
    [["alarm", "clock", "snooze", "sleep"], 5],
  ];
  for (const [keys, idx] of rules) {
    if (keys.some((k) => t.includes(k))) return BOT_TOPICS[idx];
  }
  return {
    a: "Thank you for your positive feedback.",
    follow: "I have marked this conversation as resolved, delighted, and slightly confusing.",
  };
}

export function SupportBot({ open, onClose }: SupportBotProps): JSX.Element | null {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "them", text: BOT_OPENING }]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, typing]);

  if (!open) return null;

  function send(question: string) {
    if (!question.trim()) return;
    const reply = matchTopic(question);
    const myId = idRef.current++;
    setMsgs((m) => [...m, { id: myId, from: "me", text: question }]);
    setText("");
    setTyping(true);
    const t1 = window.setTimeout(() => {
      const botId = idRef.current++;
      setMsgs((m) => [...m, { id: botId, from: "them", text: reply.a }]);
      const t2 = window.setTimeout(() => {
        const botId2 = idRef.current++;
        setMsgs((m) => [...m, { id: botId2, from: "them", text: reply.follow }]);
        setTyping(false);
      }, 900);
      timers.current.push(t2);
    }, 900);
    timers.current.push(t1);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    send(text);
  }

  return (
    <div className="bot" role="dialog" aria-label="Oops!Mart support chat">
      <div className="bot__head">
        <div className="bot__avatar" aria-hidden="true">
          🤖
        </div>
        <div>
          <div className="bot__name">Oops!Mart Support</div>
          <div className="bot__status">
            <span className="dot-live" /> Online and misinformed
          </div>
        </div>
        <button
          type="button"
          className="toast__close"
          style={{ color: "#fff" }}
          onClick={onClose}
          aria-label="Close support chat"
        >
          ✕
        </button>
      </div>

      <div className="bot__log" ref={logRef}>
        {msgs.map((m) => (
          <div key={m.id} className={`bot__msg bot__msg--${m.from === "me" ? "me" : "them"}`}>
            {m.text}
          </div>
        ))}
        {typing ? (
          <div className="bot__msg bot__msg--them" aria-live="polite">
            typing three dots with great confidence…
          </div>
        ) : null}
      </div>

      <form className="bot__quick" onSubmit={submit}>
        {BOT_TOPICS.slice(0, 3).map((t) => (
          <button key={t.q} type="button" onClick={() => send(t.q)}>
            {t.q}
          </button>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a complaint"
          aria-label="Type your complaint"
          style={{
            width: "100%",
            border: "1px solid var(--line)",
            borderRadius: 8,
            padding: "8px 10px",
            fontSize: 12.5,
            background: "#fff",
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
