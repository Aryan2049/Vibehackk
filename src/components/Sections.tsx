import { useEffect, useRef, useState, type JSX, type ReactNode } from "react";
import { BAND_LINES } from "../data/comedy";

export function Band(): JSX.Element {
  return (
    <div className="band" aria-hidden="true">
      <div className="band__track">
        {[0, 1].map((rep) => (
          <span key={rep} style={{ display: "inline-flex", gap: 40 }}>
            {BAND_LINES.map((line, i) => (
              <span key={i}>
                {line} <i>✦</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}${inView ? " is-in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const PROMISES = [
  {
    icon: "🧮",
    title: "The cart always works",
    body: "Add, remove, increase, decrease, subtotal, discount, total. Real arithmetic, every single time. The comedy lives in the products and never in your receipt.",
  },
  {
    icon: "🧯",
    title: "Every reaction is dismissable",
    body: "Each animation has its own recovery button plus an automatic timeout, so nothing ever traps you on the page and the navigation stays clickable.",
  },
  {
    icon: "🎭",
    title: "Reviews are labelled parody",
    body: "The quotes are written comedy and clearly marked as fiction. No real customer was quoted, harmed, or turned into a puddle of milk.",
  },
  {
    icon: "🫧",
    title: "Reduced motion respected",
    body: "Ask your device for less movement and the reactions simplify, cut their particle counts, and drop the big shakes instead of vanishing.",
  },
];

const SUPPORT = [
  {
    icon: "☎️",
    title: "Phone support",
    body: "Ring 0800-OOPS. A recorded message will sigh, the line will cut out, and then it will text you about your cart.",
  },
  {
    icon: "✉️",
    title: "Email support",
    body: "Write to help@oopsmart.example. Replies arrive within 30 days and one apology, occasionally in that order, occasionally reversed.",
  },
  {
    icon: "🕳️",
    title: "Postal support",
    body: "Send a letter to head office. It is a milk crate behind a laundrette. It is waterproof. Mostly.",
  },
];

export function PromiseBand(): JSX.Element {
  return (
    <section className="section" id="promise">
      <div className="wrap">
        <Reveal>
          <div className="section__head">
            <div>
              <h2 className="section__title">The promise that keeps this usable</h2>
              <p className="section__note">
                A ridiculous storefront is only funny if it still behaves like a store. These four rules are enforced on
                every single product.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="trust">
          {PROMISES.map((it, i) => (
            <Reveal className="trust__item" delay={i * 90} key={it.title}>
              <div className="trust__icon" aria-hidden="true">
                {it.icon}
              </div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupportSection(): JSX.Element {
  return (
    <section className="section" id="support">
      <div className="wrap">
        <Reveal>
          <div className="section__head">
            <div>
              <h2 className="section__title">Support that will not support you</h2>
              <p className="section__note">
                Our support desk is staffed entirely by a script that has been asked to remain calm. It appears on its
                own once you have been sufficiently chaotic. Keep shopping and see if it shows up.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="trust">
          {SUPPORT.map((it, i) => (
            <Reveal className="trust__item" delay={i * 90} key={it.title}>
              <div className="trust__icon" aria-hidden="true">
                {it.icon}
              </div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer(): JSX.Element {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <span className="brand__name">Oops!Mart</span>
            <p style={{ marginTop: 12 }}>
              You shop. We make it worse. Twenty eight products, each with its own catastrophic animation, and a shopping
              cart that still adds up correctly every time you ask it to.
            </p>
            <p style={{ marginTop: 12, color: "#8794b3" }}>
              Parody project. All reviews, coupons, support staff and order numbers are fictional on purpose.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li>Dairy &amp; Drinks</li>
              <li>Food &amp; Groceries</li>
              <li>Electronics</li>
              <li>Fashion</li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>Our promise</li>
              <li>Careers (still hiring an animator)</li>
              <li>Press (do not press it)</li>
              <li>Blog (abandoned in 2019)</li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li>Terms of mild chaos</li>
              <li>Privacy (we know your cart)</li>
              <li>Returns within 30 days</li>
              <li>Cookie policy (chocolate, 70%)</li>
            </ul>
          </div>
        </div>
        <div className="foot__legal">
          <span>Built for a six hour hackathon. Reduced motion supported. Cart persisted locally.</span>
          <span>No real payment details are ever requested.</span>
        </div>
      </div>
    </footer>
  );
}
