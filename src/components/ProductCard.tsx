import { useState, type CSSProperties, type JSX } from "react";
import type { Product } from "../types";
import { money } from "../store";
import { CARD_STICKERS, IDLE_LABELS, REVIEW_JOKES } from "../data/comedy";
import { ProductArt } from "./Art";

interface ProductCardProps {
  product: Product;
  index: number;
  /** True while this card holds the idle spotlight. */
  idle?: boolean;
  onReact: (product: Product) => void;
  onAdd: (product: Product) => void;
}

function stars(rating: number): string {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

export function ProductCard({ product, index, idle = false, onReact, onAdd }: ProductCardProps): JSX.Element {
  const [showReviews, setShowReviews] = useState(false);
  const [joke, setJoke] = useState<string | null>(null);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const sticker = product.oldPrice ? `-${discount}% off` : CARD_STICKERS[product.reaction];
  const isDiscountSticker = Boolean(product.oldPrice);
  const idleLabel = IDLE_LABELS[product.reaction];
  const snippet = product.reviews[0]?.text ?? "";
  const showMeter = idle && product.id === "laptop";

  function toggleReviews() {
    setShowReviews((s) => !s);
    setJoke(REVIEW_JOKES[product.reaction]);
  }

  return (
    <article
      className={`card${idle ? " is-idle" : ""}`}
      data-id={product.id}
      style={{ animationDelay: `${Math.min(index * 45, 400)}ms` } as CSSProperties}
    >
      <button
        type="button"
        className="card__art"
        onClick={() => onReact(product)}
        title={`See what ${product.name} does`}
        style={{ cursor: "pointer", border: 0, width: "100%" }}
      >
        {product.tag ? <span className="card__tag">{product.tag}</span> : null}
        <span className="card__warn">{product.reactionKicker}</span>
        <ProductArt id={product.id} />
        <span className={`card__sticker${isDiscountSticker ? " card__sticker--discount" : ""}`}>{sticker}</span>
        {idle && idleLabel ? <span className="card__idle">{idleLabel}</span> : null}
        <span className="sr-only">Trigger the {product.reactionTitle} reaction</span>
      </button>

      <div className="card__body">
        <div className="card__cat">{product.category}</div>
        <h3 className="card__name">{product.name}</h3>
        <p className="card__blurb">{product.blurb}</p>

        <p className="card__snippet">
          <b>Fictional review</b>
          “{snippet}”
        </p>

        {showMeter ? (
          <div className="meter" aria-hidden="true">
            <div className="meter__label">
              <span>Emotional stability</span>
              <span>34%</span>
            </div>
            <div className="meter__fill" style={{ width: "34%" }} />
          </div>
        ) : null}

        <div className="card__row">
          <div className="price">
            <span className="price__now">{money(product.price)}</span>
            {product.oldPrice ? <span className="price__was">{money(product.oldPrice)}</span> : null}
            {discount > 0 ? <span className="discount-badge">-{discount}%</span> : null}
          </div>
          <span className="rating" title={`${product.rating} out of 5`}>
            <span className="rating__stars">{stars(product.rating)}</span>
            {product.rating.toFixed(1)}
          </span>
        </div>

        <button type="button" className="reviewbtn" onClick={toggleReviews} aria-expanded={showReviews}>
          {showReviews ? "Hide reviews" : `Read reviews (${product.reviewCount.toLocaleString()})`}
        </button>

        {showReviews ? (
          <div className="reviews">
            {joke ? (
              <p className="review__text" style={{ color: "var(--coral-ink)", fontStyle: "normal", fontWeight: 700 }}>
                {joke}
              </p>
            ) : null}
            {product.reviews.map((r, i) => (
              <div key={i}>
                <div className="review__head">
                  <span className="review__author">{r.author}</span>
                  <span className="review__stars">{stars(r.stars)}</span>
                </div>
                <p className="review__text">“{r.text}”</p>
              </div>
            ))}
            <p className="review__note">
              Parody reviews written for a demo. These are not real customer feedback and no real customer said any of
              this.
            </p>
          </div>
        ) : null}

        <div className="card__actions">
          <button type="button" className="btn btn--primary btn--sm" onClick={() => onAdd(product)}>
            Add to cart
          </button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => onReact(product)}>
            Try it
          </button>
        </div>
      </div>
    </article>
  );
}
