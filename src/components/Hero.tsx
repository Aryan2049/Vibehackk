import type { JSX } from "react";
import { HeroArt } from "./Art";
import { formatClock, useAbsurdCountdown, useHealthStatus } from "../hooks";
import { PROMO_LABELS } from "../data/comedy";
import { useMessageCycle } from "../reactions/hooks";

interface HeroProps {
  onShop: () => void;
  onMilk: () => void;
  productCount: number;
  reactionCount: number;
}

/** Six hours, forty four minutes, nine seconds. It will not stay that way. */
const SALE_START = 6 * 3600 + 44 * 60 + 9;

export function Hero({ onShop, onMilk, productCount, reactionCount }: HeroProps): JSX.Element {
  const promo = useMessageCycle(PROMO_LABELS, 5400);
  const health = useHealthStatus();
  const { seconds, added, flashing } = useAbsurdCountdown(SALE_START);
  const healthIsWobbly = health.includes("probably");

  return (
    <section className="hero" id="top">
      <div>
        <span className="promo">
          <span className="promo__text" key={promo}>
            {promo}
          </span>
        </span>

        <h1 className="hero__title">
          THE BIGGEST SALE THAT <span className="hl">SHOULDN'T EXIST</span>.
        </h1>

        <p className="hero__sub">
          Unbelievable prices. Questionable decisions. A checkout experience your therapist may hear about. And behind
          all of it, a cart that adds up perfectly every single time.
        </p>

        <div className="hero__cta">
          <button type="button" className="btn btn--primary" onClick={onShop}>
            SHOP THE CHAOS
          </button>
          <button type="button" className="btn btn--navy" onClick={onMilk}>
            <span aria-hidden="true">🥛</span> See the milk spill
          </button>
        </div>

        <div className="hero__panel">
          <div className="countdown">
            <div className="countdown__label">Sale ends in</div>
            <div className={`countdown__value${flashing ? " is-bump" : ""}`}>{formatClock(seconds)}</div>
            <div className={`countdown__note${flashing ? " is-add" : ""}`}>
              {flashing
                ? `+${Math.floor(added / 60)}:${String(added % 60).padStart(2, "0")} added. Please do not ask.`
                : "Our clock. The clock is a team player."}
            </div>
          </div>

          <div className="health" role="status">
            <span className={`health__dot${healthIsWobbly ? " is-fine" : ""}`} aria-hidden="true" />
            <div>
              <span className="health__label">System status</span>
              <span className="health__text" key={health}>
                {health}
              </span>
            </div>
          </div>
        </div>

        <div className="hero__stats">
          <div className="stat">
            <div className="stat__num">{productCount}</div>
            <div className="stat__label">Products, all misbehaving</div>
          </div>
          <div className="stat">
            <div className="stat__num">{reactionCount}</div>
            <div className="stat__label">Unique reactions</div>
          </div>
          <div className="stat">
            <div className="stat__num">100%</div>
            <div className="stat__label">Working cart, honestly</div>
          </div>
        </div>
      </div>

      <div className="hero__art" aria-label="Illustration of a shopping bag with a milk carton tipping out of it">
        <HeroArt />

        <span className="hero__sticker" aria-hidden="true">
          <b>-400%</b>
          <small>off everything</small>
        </span>

        <span className="hero__price-tag hero__price-tag--1" aria-hidden="true">
          <s>$4.00</s> <em>$19.99</em>
        </span>
        <span className="hero__price-tag hero__price-tag--2" aria-hidden="true">
          <s>$129.00</s> <em>$412.00</em>
        </span>

        <span className="hero__badge hero__badge--1">
          <span aria-hidden="true">🛒</span> Cart never breaks
        </span>
        <span className="hero__badge hero__badge--2">
          <span aria-hidden="true">💬</span> Reviews are parody
        </span>
        <span className="hero__badge hero__badge--3">
          <span aria-hidden="true">🎬</span> {reactionCount} animations
        </span>
      </div>
    </section>
  );
}
