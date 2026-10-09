import type { Category, Product } from "./types";
import { CATEGORIES, PRODUCTS } from "./data/products";

const CATEGORY_LOOKUP = new Map(CATEGORIES.map((c) => [c.toLowerCase(), c]));

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

export function searchProducts(query: string, category: Category | "All" = "All"): Product[] {
  return PRODUCTS.filter((p) => (category === "All" ? true : p.category === category)).filter((p) =>
    matches(p, query),
  );
}
