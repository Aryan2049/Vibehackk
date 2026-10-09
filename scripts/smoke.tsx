import { readFileSync } from "node:fs";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import { PRODUCTS, PRODUCT_BY_ID, CATEGORIES } from "../src/data/products";
import { REACTIONS } from "../src/reactions/registry";
import { matches, searchProducts } from "../src/search";
import { COUPONS, money } from "../src/store";
import type { ReactionKind, Product } from "../src/types";

const noop = () => {};
let failed = 0;

function check(name: string, ok: boolean) {
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
}

/* 1. full app render */
const html = renderToString(<App />);
check("brand name renders", html.includes("Oops!Mart"));
check("tagline renders", html.includes("You shop. We make it worse."));
check("promise section renders", html.includes("The cart always works"));
check("footer renders", html.includes("Reduced motion supported"));
check("app renders 28 product cards", (html.match(/class="card"/g) ?? []).length === 28);

/* 2. catalogue integrity */
check("catalogue has 28 products", PRODUCTS.length === 28);
check("product ids are unique", new Set(PRODUCTS.map((p) => p.id)).size === PRODUCTS.length);
check("every product maps to a registered reaction", PRODUCTS.every((p) => Boolean(REACTIONS[p.reaction])));
check("reaction registry has 28 entries", Object.keys(REACTIONS).length === 28);
check("every product has at least one parody review", PRODUCTS.every((p) => p.reviews.length >= 1));
check("every category is populated", CATEGORIES.every((c) => PRODUCTS.some((p) => p.category === c)));
check(
  "every product has comedy copy",
  PRODUCTS.every((p) => p.reactionTitle.length > 3 && p.reactionMessage.length > 20),
);
check("every product offers a recovery action", PRODUCTS.every((p) => Boolean(p.recoveryLabel)));

/* 3. every reaction owns distinct art and copy, and auto-recovers */
const kinds = Object.keys(REACTIONS) as ReactionKind[];
check(
  "no two products share one reaction component",
  new Set(kinds.map((k) => REACTIONS[k].Component)).size === kinds.length,
);
check(
  "every reaction auto-recovers after a delay",
  kinds.every((k) => REACTIONS[k].duration > 0),
);
for (const field of ["reactionKicker", "reactionTitle", "reactionMessage"] as const) {
  const values = PRODUCTS.map((p) => p[field]);
  check(`reaction ${field} is unique per product (no duplicated jokes)`, new Set(values).size === values.length);
}

/* 4. every reaction renders in both motion modes */
for (const kind of kinds) {
  const product = PRODUCTS.find((p) => p.reaction === kind) as Product;
  const Component = REACTIONS[kind].Component;
  try {
    const normal = renderToString(<Component product={product} reduced={false} onClose={noop} onAddToCart={noop} />);
    const reducedHtml = renderToString(<Component product={product} reduced={true} onClose={noop} onAddToCart={noop} />);
    check(`reaction "${kind}" renders (normal + reduced)`, normal.length > 200 && reducedHtml.length > 100);
  } catch (err) {
    check(`reaction "${kind}" renders (normal + reduced)`, false);
    console.error(err);
  }
}

/* 5. search reaches every seeded product */
check(
  "every product is findable by its own name",
  PRODUCTS.every((p) => matches(p, p.name)),
);
check(
  "every product is findable by its reaction keyword",
  PRODUCTS.every((p) => searchProducts(p.reaction).some((r) => r.id === p.id)),
);
check(
  "every category is findable and scoped correctly",
  CATEGORIES.every((c) => {
    const results = searchProducts(c);
    return results.length > 0 && results.every((r) => r.category === c);
  }),
);
check("an unknown search matches nothing", searchProducts("zzzqqq nothing here").length === 0);
check("an empty search returns the whole catalogue", searchProducts("").length === PRODUCTS.length);

/* 6. coupon and pricing maths */
const milk = PRODUCT_BY_ID.milk;
const basket = milk.price * 3 + PRODUCT_BY_ID.coffee.price;
const chaos = basket - (basket * COUPONS.CHAOS10.percent) / 100;
check("CHAOS10 removes exactly 10%", COUPONS.CHAOS10.percent === 10 && Math.abs(chaos - basket * 0.9) < 1e-9);
check(
  "only CHAOS10 changes the price",
  Object.entries(COUPONS).filter(([code]) => code !== "CHAOS10").every(([, def]) => def.percent === 0),
);
check("an unknown coupon cannot discount", !Object.prototype.hasOwnProperty.call(COUPONS, "NOTACODE"));
check("money formats to two decimals", money(3.5) === "$3.50");

/* 7. reactions never block the storefront controls */
const rx = readFileSync("src/reactions.css", "utf8");
check("reaction overlay ignores pointer events", /\.rx\s*\{[^}]*pointer-events:\s*none/.test(rx));
check("reaction action bar stays clickable", /\.rx__bar\s*\{[^}]*pointer-events:\s*auto/.test(rx));

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed.");
