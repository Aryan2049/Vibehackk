import { useEffect, useRef, useState, type FormEvent, type JSX } from "react";
import type { Product } from "../types";
import { STRIP_LINES } from "../data/comedy";

interface HeaderProps {
  query: string;
  onQueryChange: (v: string) => void;
  onSearch: (v: string) => void;
  suggestions: Product[];
  onPickSuggestion: (p: Product) => void;
  cartCount: number;
  cartBumped: boolean;
  onOpenCart: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export function Header({
  query,
  onQueryChange,
  onSearch,
  suggestions,
  onPickSuggestion,
  cartCount,
  cartBumped,
  onOpenCart,
  muted,
  onToggleMute,
}: HeaderProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    setOpen(false);
    onSearch(query);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = suggestions[active];
      if (pick) {
        setOpen(false);
        onPickSuggestion(pick);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="strip" aria-hidden="true">
        <div className="strip__track">
          {[0, 1].map((rep) => (
            <span key={rep} style={{ display: "inline-flex", gap: 46 }}>
              {STRIP_LINES.map((line, i) => (
                <span key={i}>
                  <b>●</b> {line}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <header className="nav">
        <div className="wrap">
          <div className="nav__inner">
            <a
              className="brand"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="brand__mark" aria-hidden="true">
                !
              </span>
              <span>
                <span className="brand__name">Oops!Mart</span>
                <span className="brand__tag">You shop. We make it worse.</span>
              </span>
            </a>

            <nav className="nav__links" aria-label="Sections">
              <button className="nav__link" type="button" onClick={() => scrollTo("shop")}>
                Shop
              </button>
              <button className="nav__link" type="button" onClick={() => scrollTo("promise")}>
                Our promise
              </button>
              <button className="nav__link" type="button" onClick={() => scrollTo("support")}>
                Support
              </button>
            </nav>

            <div className="nav__actions">
              <button
                type="button"
                className="iconbtn"
                onClick={onToggleMute}
                aria-pressed={!muted}
                title={muted ? "Sound effects are off. Click to enable." : "Sound effects are on. Click to mute."}
              >
                <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
                <span className="sr-only">{muted ? "Enable sound effects" : "Mute sound effects"}</span>
              </button>
              <button
                type="button"
                className={`cartbtn${cartBumped ? " is-bumped" : ""}`}
                onClick={onOpenCart}
                aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              >
                <span aria-hidden="true">🛒</span> Cart
                <span className="cartbtn__count">{cartCount}</span>
              </button>
            </div>
          </div>

          <div className="nav__row2">
            <div className="search" ref={boxRef}>
              <form className="search__form" onSubmit={submit} role="search">
                <span aria-hidden="true">🔎</span>
                <input
                  className="search__input"
                  type="search"
                  value={query}
                  placeholder="Search milk, shoes, a phone, anything you will regret"
                  aria-label="Search products"
                  autoComplete="off"
                  onChange={(e) => {
                    onQueryChange(e.target.value);
                    setActive(0);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={onKey}
                />
                {query ? (
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => {
                      onQueryChange("");
                      onSearch("");
                    }}
                  >
                    Clear
                  </button>
                ) : null}
                <button type="submit" className="btn btn--primary btn--sm">
                  Search
                </button>
              </form>

              {open && query.trim() && suggestions.length > 0 ? (
                <div className="search__hint" role="listbox" aria-label="Search suggestions">
                  {suggestions.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      role="option"
                      aria-selected={i === active}
                      className={i === active ? "is-active" : ""}
                      onClick={() => {
                        setOpen(false);
                        onPickSuggestion(p);
                      }}
                    >
                      <span aria-hidden="true">{p.reaction === "milk" ? "🥛" : "🛍️"}</span>
                      <strong>{p.name}</strong>
                      <em>{p.category}</em>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
