import type { Category, Product } from "./types";
import { CATEGORIES, PRODUCTS } from "./data/products";

const CATEGORY_LOOKUP = new Map(CATEGORIES.map((c) => [c.toLowerCase(), c]));

/**
 * Sensible aliases so natural words reach the seeded catalogue, for example
 * "smartphone" or "mobile" for the phone and "sneakers" for the shoes.
 * Aliases only apply when the query itself already matches nothing, so they
 * can never override a real product name.
 */
const ALIASES: Record<string, string> = {
  smartphone: "phone",
  "smart phone": "phone",
  mobile: "phone",
  cell: "phone",
  handset: "phone",
  computer: "laptop",
  notebook: "laptop",
  macbook: "laptop",
  pc: "laptop",
  earphones: "headphones",
  headset: "headphones",
  cans: "headphones",
  sneakers: "shoes",
  trainers: "shoes",
  runners: "shoes",
  footwear: "shoes",
  tee: "tshirt",
  "t shirt": "tshirt",
  top: "tshirt",
  shirt: "tshirt",
  shades: "sunglasses",
  eyewear: "sunglasses",
  glasses: "sunglasses",
  cap: "hat",
  headwear: "hat",
  beanie: "hat",
  duvet: "pillow",
  cushion: "pillow",
  sleep: "pillow",
  timer: "alarm",
  wake: "alarm",
  hoover: "vacuum",
  cleaner: "vacuum",
  breeze: "fan",
  cooling: "fan",
  lather: "shampoo",
  hair: "shampoo",
  fragrance: "perfume",
  cologne: "perfume",
  scent: "perfume",
  toothbrush: "toothpaste",
  brushing: "toothpaste",
  plush: "teddy",
  bear: "teddy",
  novel: "book",
  reading: "book",
  jigsaw: "puzzle",
  "board game": "puzzle",
  bird: "duck",
  bath: "duck",
  moo: "milk",
  cow: "milk",
  dairy: "milk",
  espresso: "coffee",
  latte: "coffee",
  caffeine: "coffee",
  cuppa: "coffee",
  h2o: "water",
  bottle: "water",
  pop: "soda",
  fizzy: "soda",
  cola: "soda",
  coke: "soda",
  omelette: "eggs",
  eggbox: "eggs",
  loaf: "bread",
  sourdough: "bread",
  plantain: "banana",
  crisps: "chips",
  snacks: "chips",
  candy: "chocolate",
  sweets: "chocolate",
  cocoa: "chocolate",
};

/**
 * Single source of truth for product search. A product matches when the query
 * appears in its name, its category, its reaction keyword or its blurb, so
 * searching "milk", "shoes" or "dairy" all reach the right products.
 *
 * An exact category name is treated as a category filter so that searching
 * "electronics" cannot drag in a milk advert that happens to mention the word.
 */
export function matches(product: Product, query: string): boolean {
  const s = query.trim().toLowerCase();
  if (!s) return true;

  const exactCategory = CATEGORY_LOOKUP.get(s);
  if (exactCategory) return product.category === exactCategory;

  return (
    product.name.toLowerCase().includes(s) ||
    product.category.toLowerCase().includes(s) ||
    product.reaction.includes(s) ||
    product.blurb.toLowerCase().includes(s)
  );
}

/** Returns the query that will actually be used: expanded only if nothing matched. */
export function resolveQuery(query: string): string {
  const s = query.trim().toLowerCase();
  if (!s) return query;
  if (PRODUCTS.some((p) => matches(p, s))) return query;
  const alias = ALIASES[s];
  return alias ?? query;
}

export function searchProducts(query: string, category: Category | "All" = "All"): Product[] {
  const resolved = resolveQuery(query);
  return PRODUCTS.filter((p) => (category === "All" ? true : p.category === category)).filter((p) =>
    matches(p, resolved),
  );
}
