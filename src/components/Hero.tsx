import type { JSX } from "react";
import { HeroArt } from "./Art";

interface HeroProps {
  onShop: () => void;
  onMilk: () => void;
  productCount: number;
  reactionCount: number;
}

export function Hero({ onShop, onMilk, productCount, reactionCount }: HeroProps): JSX.Element {
  return (
    <section className="hero" id="top">
      <div>
        <span className="eyebrow">
          <span aria-hidden="true">⚠️</span> Serious storefront, unserious products
        </span>
        <h1 className="hero__title">
          Every product here has a <span className="hl">behaviour problem</span>.
        </h1>
        <p className="hero__sub">
          Oops!Mart looks like a premium shop and behaves like a group project finished at 3am. Search for milk and
          watch the price tags get washed off the screen. Chase a pair of shoes around the page. Get quietly roasted by
          a pillow. Then check out anyway, because the cart, the coupons and the totals all behave themselves perfectly.
        </p>
        <div className="hero__cta">
          <button type="button" className="btn btn--primary" onClick={onShop}>
            Start shopping
          </button>
          <button type="button" className="btn btn--navy" onClick={onMilk}>
            🥛 See the milk spill
          </button>
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
        <span className="hero__badge hero__badge--1">
          <span aria-hidden="true">🛒</span> Cart never breaks
        </span>
        <span className="hero__badge hero__badge--2">
          <span aria-hidden="true">💬</span> Reviews are parody
        </span>
        <span className="hero__badge hero__badge--3">
          <span aria-hidden="true">🎬</span> 28 animations
        </span>
      </div>
    </section>
  );
}
