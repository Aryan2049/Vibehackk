export type Category =
  | "Dairy & Drinks"
  | "Food & Groceries"
  | "Electronics"
  | "Fashion"
  | "Home & Kitchen"
  | "Beauty"
  | "Toys, Books & Games";

export type ReactionKind =
  | "milk"
  | "coffee"
  | "water"
  | "soda"
  | "egg"
  | "bread"
  | "banana"
  | "chips"
  | "chocolate"
  | "phone"
  | "laptop"
  | "headphones"
  | "mouse"
  | "tshirt"
  | "shoes"
  | "sunglasses"
  | "hat"
  | "pillow"
  | "alarm"
  | "vacuum"
  | "fan"
  | "shampoo"
  | "perfume"
  | "toothpaste"
  | "teddy"
  | "book"
  | "puzzle"
  | "duck";

export interface Review {
  author: string;
  stars: number;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  blurb: string;
  tag?: string;
  reaction: ReactionKind;
  /** Short uppercase kicker shown on the reaction card. */
  reactionKicker: string;
  reactionTitle: string;
  reactionMessage: string;
  recoveryLabel?: string;
  reviews: Review[];
}

export interface CartLine {
  id: string;
  qty: number;
}

export type ToastTone = "navy" | "coral" | "teal" | "amber";

export interface Toast {
  id: number;
  tone: ToastTone;
  icon: string;
  title: string;
  message: string;
}

export interface CouponResult {
  ok: boolean;
  message: string;
  percent: number;
  label?: string;
}
