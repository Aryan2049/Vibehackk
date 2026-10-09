import type { ReactionKind } from "../types";

export const STRIP_LINES = [
  "Our prices are supervised by an unsupervised intern.",
  "Free shipping! The package may take the scenic route.",
  "Buy now. Regret responsibly.",
  "Our AI has reviewed your cart and has concerns.",
  "Customer satisfaction is currently buffering.",
  "Sale ends when the clock feels like it. The clock negotiates.",
  "Everything on this page has been approved by nobody.",
];

/** Rotating reassurance in the hero system-health meter. */
export const HEALTH_LINES = [
  "Everything is probably fine.",
  "Recalibrating confidence.",
  "Still probably fine, probably.",
  "The intern has been consulted.",
  "All systems nominally nominal.",
];

/** The promotional label rewrites itself. */
export const PROMO_LABELS = [
  "400% OFF (we have not explained how)",
  "Prices adjusted by an intern",
  "Door crasher: doors removed for safety",
  "Seen nowhere. Reviewed by nobody.",
  "Now with fewer refunds",
];

/** Sticker wording on each product card. One per product. */
export const CARD_STICKERS: Record<ReactionKind, string> = {
  milk: "CEO approved by nobody",
  coffee: "Too much, on purpose",
  water: "Certified void",
  soda: "3,000 bubbles free",
  egg: "Future career: bird",
  bread: "Promoted to breakfast",
  banana: "Slip hazard (legal)",
  chips: "47 crumbs included",
  chocolate: "Therapy in a bar",
  phone: "Battery: 101%",
  laptop: "47 updates ready",
  headphones: "Main character energy",
  mouse: "Rage included",
  tshirt: "Pattern: unapproved",
  shoes: "Likely to flee",
  sunglasses: "Extremely vibes",
  hat: "Now the boss",
  pillow: "8 hour life support",
  alarm: "Snooze warranted",
  vacuum: "Cleans your tabs",
  fan: "Wind warning",
  shampoo: "Hair: happier",
  perfume: "Smells expensive",
  toothpaste: "Visible from orbit",
  teddy: "Certified hugger",
  book: "Spoilers inside",
  puzzle: "99% complete",
  duck: "Twelve suspects",
};

/** Idle bubble shown when a card is spotlighted while you do nothing. */
export const IDLE_LABELS: Record<ReactionKind, string> = {
  milk: "Slightly unstable",
  coffee: "Do not shake",
  water: "Floating since Tuesday",
  soda: "Shake at your own risk",
  egg: "Wobbling",
  bread: "Thinking about toast",
  banana: "Slip hazard",
  chips: "Crumbs on standby",
  chocolate: "Emotionally available",
  phone: "47 unread alerts",
  laptop: "Updating (always)",
  headphones: "Scoring your walk",
  mouse: "Rage idling",
  tshirt: "Needs a word",
  shoes: "Do not make eye contact",
  sunglasses: "Too cool for this",
  hat: "Running the company",
  pillow: "Do not disturb",
  alarm: "Snoozing (again)",
  vacuum: "Judging your floor",
  fan: "Gust incoming",
  shampoo: "More lather than needed",
  perfume: "Trail detected",
  toothpaste: "Smile charging",
  teddy: "Requests a hug",
  book: "Ready to spoil",
  puzzle: "One piece short",
  duck: "Twelve ducks, no alibi",
};

export const BAND_LINES = [
  "You shop. We make it worse.",
  "Your satisfaction is our biggest technical issue.",
  "Premium storefront. Catastrophic product behaviour.",
  "Thirty day returns. Ninety day flashbacks.",
  "Now with 100% more milk than any competitor.",
];

export const CART_QUIPS = [
  "Your cart has developed expensive taste and no supervision.",
  "Your cart contains 3 items and 47 unresolved decisions.",
  "Your cart would like to know whether this purchase is emotionally necessary. It has prepared a slide.",
  "Your cart has started a group chat with your other carts. They have reached an agreement.",
  "Your cart is fine. Your cart is definitely fine. Your cart has not opened the spreadsheet.",
  "Your cart has developed a personality and yours is quieter.",
];

export const EMPTY_SEARCH = {
  title: "Nothing. Not one thing.",
  message:
    "We searched every corner of the internet and the internet has filed a complaint against us. Try a different word, or press the button and we will improvise something worse.",
};

export interface AchievementDef {
  id: string;
  title: string;
  detail: string;
  icon: string;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-mistake", title: "FIRST MISTAKE", detail: "You added an item to your cart. There is no undo for the feeling.", icon: "🛒" },
  { id: "dairy-survivor", title: "DAIRY SURVIVOR", detail: "You escaped the milk spill with your router mostly intact.", icon: "🥛" },
  { id: "athletic", title: "ATHLETIC CUSTOMER", detail: "You chased your shoes and caught them. Your legs are certified.", icon: "👟" },
  { id: "shoes-left", title: "SHOES HAVE LEFT THE BUILDING", detail: "The shoes fled their own product card. Nobody has recovered them.", icon: "🏃" },
  { id: "chaos-agent", title: "CERTIFIED CHAOS AGENT", detail: "Five product reactions triggered. Facilities has been notified.", icon: "🔥" },
  { id: "snack", title: "SNACK SITUATION", detail: "Three food reactions. Your keyboard is now 4% crumbs by weight.", icon: "🍫" },
  { id: "technician", title: "ACCIDENTAL TECHNICIAN", detail: "You silenced a phone and skipped an update in one sitting.", icon: "🖥️" },
  { id: "coupon-club", title: "COUPON ENTHUSIAST", detail: "You found a coupon that actually worked. Frame it.", icon: "🏷️" },
  { id: "checkout-champion", title: "CHECKOUT CHAMPION", detail: "You placed an order and answered every question. The bank account is in a meeting.", icon: "🧾" },
  { id: "why-still-here", title: "WHY ARE YOU STILL HERE?", detail: "You have discovered every secret on this website. There are no more. Please go outside.", icon: "👑" },
];

/** One joke line revealed when a shopper opens the reviews. */
export const REVIEW_JOKES: Record<ReactionKind, string> = {
  milk: "Five stars. Arrived as milk, exactly as advertised, then arrived as the floor.",
  coffee: "This reviewer has not blinked since Tuesday and is now legally classed as weather.",
  water: "Reviewed from a boat. Left in the boat. No notes on the boat.",
  soda: "Written from the top of a stepladder while the ceiling dries.",
  egg: "Cracked one open. It had a plan and executed it. Now it flies on Tuesdays.",
  bread: "Reviewer reports the loaf toasted itself and now answers only to Breakfast.",
  banana: "Five stars. Slipped on its own marketing and took the reviewer with it.",
  chips: "Ordered one packet. Received 47 crumbs and a handwritten apology from the crumbs.",
  chocolate: "Ate one square and forgave someone from a previous decade. Progress.",
  phone: "The phone has more social interaction than I do and better battery management too.",
  laptop: "This reviewer has been updating something for a living since the review began.",
  headphones: "Walked to the shop in slow motion. Currently the main character. Bill unpaid.",
  mouse: "Clicked once and accidentally selected a spreadsheet, a campaign, and a new lifestyle.",
  tshirt: "Shirt now shows a picture of a smaller shirt. Nobody approved this and the shirt is not sorry.",
  shoes: "Great shoes. Difficult to review because they ran away and took the box.",
  sunglasses: "Cannot see the review I have just written. Confidence remains extremely high.",
  hat: "Reviewer now reports to the hat. The hat reports to a bigger hat. Nobody reports to the reviewer.",
  pillow: "I tested it for eight hours. Accidentally. The second time was on purpose.",
  alarm: "Nine alarms snoozed and one entire order. Both are still asleep. Both are thriving.",
  vacuum: "It cleaned the floor. Then it attempted to clean my browser. I let it. Improvement.",
  fan: "Set it to speed three and have not seen my paperwork, my receipts, or my neighbour since.",
  shampoo: "Reviewer has excellent hair and a bathroom full of very enthusiastic bubbles.",
  perfume: "Smells expensive. The bank app has stopped texting and started leaving letters.",
  toothpaste: "Smiled once. A small ship used it to find the harbour and thanked me personally.",
  teddy: "The cart asked for emotional support. The bear said yes instantly and did not check its phone.",
  book: "Was told the twist before the title page and remains grateful for the efficiency.",
  puzzle: "Completed 999 pieces and now lives with a permanent, very specific question mark.",
  duck: "Counted eleven ducks. There are now twelve. Nobody will admit to anything.",
};

/** Deterministic support chatbot script. No external service involved. */
export interface BotTopic {
  q: string;
  a: string;
  follow: string;
}

export const BOT_OPENING =
  "Hi, you are chatting with Oops!Mart Support. I am a script with a headset and no authority. How can I misunderstand you today?";

export const BOT_TOPICS: BotTopic[] = [
  {
    q: "My milk flooded the screen.",
    a: "Have you tried turning the milk off and on again?",
    follow: "If that fails, place the router in rice and the milk in the bin, then swap them and try once more.",
  },
  {
    q: "My shoes ran away.",
    a: "Have you tried running faster?",
    follow: "Our records show the shoes are employed elsewhere now. They left us a five star review, which stings.",
  },
  {
    q: "The website is broken.",
    a: "Thank you for your positive feedback.",
    follow: "I have passed your compliment to the website. The website passed it to nobody and is pleased with itself.",
  },
  {
    q: "My cart is judging me.",
    a: "That is a premium feature and cannot be turned off.",
    follow: "You may mute your cart for $0.00. It will still judge you, but it will judge you quietly.",
  },
  {
    q: "Can I speak to a human?",
    a: "A human has been dispatched. Estimated arrival: 47 updates.",
    follow: "While you wait, may I interest you in our extended warranty? The answer is yes and there is no second question.",
  },
  {
    q: "My alarm will not stop.",
    a: "It stopped, then snoozed your request, then stopped again.",
    follow: "Try placing the alarm clock in rice. That will not help, but it is traditional and the clock enjoys it.",
  },
];
