// Single source of truth for the Kitchen 149 menu.
// To change a dish price / name / image, edit it here.
// To change what shows under each mood (Craving Meter / Night Personality),
// just change the dish ids in the `hungerLevels` and `personalities` exports
// at the bottom of this file.

export type DishCategory = 'Starters' | 'Rice' | 'Noodles' | 'Combos' | 'Eggs' | 'Maggi';

export type Dish = {
  id: string;
  name: string;
  price: number;       // in INR, no symbol
  desc: string;
  cat: DishCategory;
  img: string;
  hot?: boolean;
  ingredients: string[];
};

export const menu: Dish[] = [
  // ─── Chicken Starters ───
  { id: 'classic-chicken-65', name: 'Classic Chicken 65', price: 199, desc: 'Fiery deep-fried chicken with curry leaves.', cat: 'Starters', img: '/images/dish-chicken-65.jpg', hot: true, ingredients: ['Chicken', 'Curry leaves', 'Spice 65 masala', 'Green chillies'] },
  { id: 'classic-chicken-kebab', name: 'Classic Chicken Kebab', price: 149, desc: 'Smoky charcoal-grilled chicken.', cat: 'Starters', img: '/images/food-ghee-chicken.jpg', ingredients: ['Chicken', 'Yogurt marinade', 'Charcoal smoked', 'Spices'] },
  { id: 'signature-umami-kebab', name: 'Signature Umami Kebab', price: 149, desc: 'Secret marinade, perfectly grilled.', cat: 'Starters', img: '/images/dish-ghee-chicken.jpg', ingredients: ['Chicken', 'Secret marinade', 'Soy sauce', 'Garlic'] },
  { id: 'special-ghee-chicken-dry', name: 'Special Ghee Chicken Dry', price: 249, desc: 'Wok-tossed in pure ghee, garlic & dark soy.', cat: 'Starters', img: '/images/food-chicken-manchurian.jpg', hot: true, ingredients: ['Chicken', 'Pure ghee', 'Garlic', 'Dark soy'] },
  { id: 'chilli-chicken', name: 'Chilli Chicken', price: 199, desc: 'The late night classic. Bell peppers & soy.', cat: 'Starters', img: '/images/dish-chilli-chicken.jpg', hot: true, ingredients: ['Chicken', 'Bell peppers', 'Soy sauce', 'Green chillies'] },
  { id: 'chicken-manchurian', name: 'Chicken Manchurian', price: 199, desc: 'Dark, savory classic with spring onions.', cat: 'Starters', img: '/images/dish-manchurian.jpg', ingredients: ['Chicken mince', 'Soy sauce', 'Ginger-garlic', 'Spring onions'] },
  { id: 'garlic-chicken', name: 'Garlic Chicken', price: 199, desc: 'Punchy, dark roasted garlic sauce.', cat: 'Starters', img: '/images/food-chilli-chicken.jpg', hot: true, ingredients: ['Chicken', 'Roasted garlic', 'Soy sauce', 'Chilli'] },
  { id: 'crispy-chicken-pepper-fry', name: 'Crispy Chicken Pepper Fry', price: 199, desc: 'Fiery dry fry with black pepper & lemon.', cat: 'Starters', img: '/images/food-chicken-65.jpg', hot: true, ingredients: ['Chicken', 'Black pepper', 'Lemon', 'Curry leaves'] },
  { id: 'chicken-lollypop', name: 'Chicken Lollypop', price: 199, desc: 'Crispy wings with tangy szechuan dip.', cat: 'Starters', img: '/images/food-lollypop.jpg', ingredients: ['Chicken drumettes', 'Schezwan sauce', 'Crispy coating', 'Spices'] },

  // ─── Vegetarian Starters ───
  { id: 'gobi-manchurian', name: 'Gobi Manchurian', price: 149, desc: 'Crispy cauliflower in dark soy & garlic.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Cauliflower', 'Soy sauce', 'Garlic', 'Ginger'] },
  { id: 'chilli-gobi', name: 'Chilli Gobi', price: 149, desc: 'Wok-tossed with sharp green chillies.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Cauliflower', 'Green chillies', 'Soy sauce', 'Onions'] },
  { id: 'crunchy-gobi-pakoda', name: 'Crunchy Gobi Pakoda', price: 149, desc: 'Gram flour coated, deep fried to a crunch.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Cauliflower', 'Gram flour', 'Spices', 'Deep fried'] },
  { id: 'mix-veg-manchurian', name: 'Mix Veg Manchurian', price: 149, desc: 'Mixed vegetable dumplings in soy glaze.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Corn flour'] },
  { id: 'paneer-manchurian', name: 'Paneer Manchurian', price: 199, desc: 'Soft paneer cubes in savory sauce.', cat: 'Starters', img: '/images/food-chilli-paneer.jpg', ingredients: ['Paneer', 'Soy sauce', 'Ginger-garlic', 'Spring onions'] },
  { id: 'chilli-paneer', name: 'Chilli Paneer', price: 199, desc: 'Paneer seared with onions, soy & chilli.', cat: 'Starters', img: '/images/dish-chilli-paneer.jpg', hot: true, ingredients: ['Paneer', 'Onions', 'Soy sauce', 'Chilli'] },
  { id: 'spicy-paneer-pepper-grilled', name: 'Spicy Paneer Pepper Grilled', price: 249, desc: 'Dry roasted paneer with crushed pepper.', cat: 'Starters', img: '/images/food-paneer-grilled.jpg', hot: true, ingredients: ['Paneer', 'Black pepper', 'Capsicum', 'Onions'] },
  { id: 'mushroom-manchurian', name: 'Mushroom Manchurian', price: 149, desc: 'Earthy mushrooms in ginger-garlic-soy base.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Mushrooms', 'Ginger-garlic', 'Soy sauce', 'Spring onions'] },
  { id: 'chilli-mushroom', name: 'Chilli Mushroom', price: 149, desc: 'Hot & fiery wok-tossed with green chillies.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Mushrooms', 'Green chillies', 'Soy sauce', 'Onions'] },
  { id: 'baby-corn-manchurian', name: 'Baby Corn Manchurian', price: 149, desc: 'Crispy baby corn in savory manchurian gravy.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Baby corn', 'Manchurian gravy', 'Garlic', 'Soy'] },
  { id: 'chilli-baby-corn', name: 'Chilli Baby Corn', price: 149, desc: 'Crunchy baby corn with bell peppers & soy.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Baby corn', 'Bell peppers', 'Soy sauce', 'Chilli'] },

  // ─── Non-Veg Rice ───
  { id: 'egg-fried-rice', name: 'Egg Fried Rice', price: 149, desc: 'Classic smoky rice with scrambled egg.', cat: 'Rice', img: '/images/dish-egg-rice.jpg', ingredients: ['Rice', 'Scrambled egg', 'Spring onions', 'Soy sauce'] },
  { id: 'chicken-fried-rice', name: 'Chicken Fried Rice', price: 199, desc: 'Smoky wok-tossed rice with chicken.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', ingredients: ['Rice', 'Chicken', 'Egg', 'Soy sauce'] },
  { id: 'house-special-mixed-fried-rice', name: 'House Special Mixed Fried Rice', price: 299, desc: 'Egg, chicken, veggies & byadgi chilli.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', ingredients: ['Rice', 'Chicken', 'Egg', 'Byadgi chilli'] },
  { id: 'schezwan-egg-fried-rice', name: 'Schezwan Egg Fried Rice', price: 149, desc: 'Fiery red schezwan with egg.', cat: 'Rice', img: '/images/food-egg-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Egg', 'Spring onions'] },
  { id: 'schezwan-chicken-fried-rice', name: 'Schezwan Chicken Fried Rice', price: 199, desc: 'Fiery red schezwan with chicken.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Chicken', 'Egg'] },

  // ─── Veg Rice ───
  { id: 'street-style-veg-fried-rice', name: 'Street Style Veg Fried Rice', price: 149, desc: 'Mixed veggies, smoky & satisfying.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Carrot', 'Beans', 'Corn', 'Soy'] },
  { id: 'schezwan-veg-fried-rice', name: 'Schezwan Veg Fried Rice', price: 149, desc: 'Fiery schezwan with mixed vegetables.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Mixed veggies'] },

  // ─── Comfort Bowls Indian ───
  { id: 'classic-jeera-rice', name: 'Classic Jeera Rice', price: 99, desc: 'Fragrant cumin tempered basmati.', cat: 'Rice', img: '/images/dish-garlic-rice.jpg', ingredients: ['Basmati rice', 'Cumin', 'Ghee', 'Salt'] },
  { id: 'loaded-veg-masala-rice', name: 'Loaded Veg Masala Rice', price: 149, desc: 'Masala-loaded vegetable rice.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Mixed vegetables', 'Masala', 'Onions'] },
  { id: 'zesty-lemon-rice', name: 'Zesty Lemon Rice', price: 99, desc: 'Tangy, light & refreshing.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Lemon', 'Mustard seeds', 'Curry leaves'] },
  { id: 'signature-butter-rice', name: 'Signature Butter Rice', price: 149, desc: 'Rich, buttery & indulgent.', cat: 'Rice', img: '/images/dish-garlic-rice.jpg', ingredients: ['Rice', 'Butter', 'Salt', 'Pepper'] },

  // ─── Clean Cut High Protein ───
  { id: 'lean-egg-protein-toss', name: 'Lean Egg Protein Toss', price: 149, desc: 'Egg whites, lean & protein-packed.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg whites', 'Salt', 'Pepper', 'Spring onions'] },
  { id: 'byadgi-burn-protein-omelette', name: 'Byadgi Burn Protein Omelette', price: 199, desc: 'Egg whites with byadgi chilli burn.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg whites', 'Byadgi chilli', 'Salt', 'Pepper'] },

  // ─── Noodles ───
  { id: 'schezwan-noodles', name: 'Schezwan Noodles', price: 149, desc: 'Fiery schezwan-tossed noodles.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', hot: true, ingredients: ['Noodles', 'Schezwan sauce', 'Veggies', 'Garlic'] },
  { id: 'hakka-chicken-noodles', name: 'Hakka Chicken Noodles', price: 199, desc: 'Classic hakka style with chicken.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', ingredients: ['Noodles', 'Chicken', 'Soy sauce', 'Veggies'] },
  { id: 'hakka-egg-noodles', name: 'Hakka Egg Noodles', price: 149, desc: 'Bestseller. Egg-loaded hakka noodles.', cat: 'Noodles', img: '/images/food-hakka-noodles.jpg', ingredients: ['Noodles', 'Egg', 'Soy sauce', 'Veggies'] },
  { id: 'classic-hakka-veg-noodles', name: 'Classic Hakka Veg Noodles', price: 149, desc: 'Garden fresh veggies, wok-tossed.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', ingredients: ['Noodles', 'Carrot', 'Cabbage', 'Capsicum', 'Soy'] },
  { id: 'chilli-garlic-veg-noodles', name: 'Chilli Garlic Veg Noodles', price: 149, desc: 'Garlic-forward with green chillies.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', hot: true, ingredients: ['Noodles', 'Garlic', 'Green chillies', 'Veggies'] },
  { id: 'chilli-garlic-egg-noodles', name: 'Chilli Garlic Egg Noodles', price: 149, desc: 'Garlic kick with scrambled egg.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', hot: true, ingredients: ['Noodles', 'Egg', 'Garlic', 'Chilli'] },
  { id: 'chilli-garlic-chicken-noodles', name: 'Chilli Garlic Chicken Noodles', price: 199, desc: 'Garlic, chilli & chicken combo.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', hot: true, ingredients: ['Noodles', 'Chicken', 'Garlic', 'Chilli'] },

  // ─── The Egg Cart ───
  { id: 'classic-bread-omelette', name: 'Classic Bread Omelette', price: 129, desc: 'Ghee-toasted bread wrapped in masala egg.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Bread', 'Ghee', 'Masala', 'Onions'] },
  { id: 'desi-masala-omelette', name: 'Desi Masala Omelette', price: 99, desc: 'Loaded with onions, tomatoes & chillies.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Onions', 'Tomatoes', 'Green chillies'] },
  { id: 'ghee-roast-omelette', name: 'Ghee Roast Omelette', price: 129, desc: 'Cooked purely in ghee, dusted with spice.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Pure ghee', 'Spices', 'Salt'] },
  { id: 'indo-chinese-omelette', name: 'Indo Chinese Omelette', price: 99, desc: 'Whisked with soy, chilli & spring onions.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Soy sauce', 'Chilli', 'Spring onions'] },
  { id: 'roadside-egg-bhurji', name: 'Roadside Egg Bhurji', price: 99, desc: 'Aggressively tossed spicy scrambled eggs.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Onions', 'Tomatoes', 'Spices'] },
  { id: 'nati-style-egg-roast', name: 'Nati Style Egg Roast [Double]', price: 89, desc: 'Slow roasted in spicy byadgi paste.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Byadgi chilli', 'Onions', 'Spices'] },
  { id: 'boiled-egg-masala-fry', name: 'Boiled Egg Masala Fry', price: 149, desc: 'Rich tomato & ginger-garlic gravy.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Boiled egg', 'Tomato', 'Ginger-garlic', 'Gravy'] },
  { id: 'spicy-omelette-sherva', name: 'Spicy Omelette Sherva', price: 149, desc: 'Fluffy omelette with deeply spiced sherva.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Sherva gravy', 'Spices', 'Onions'] },

  // ─── The Box Combo ───
  { id: 'late-night-saver-box', name: 'Late Night Saver Box', price: 249, desc: 'Ghee rice + kebabs + sherva. Full meal.', cat: 'Combos', img: '/images/food-saver-box.jpg', ingredients: ['Ghee rice', 'Chicken kebab', 'Sherva gravy', 'Raita'] },
  { id: 'desi-fix-box', name: 'Desi Fix Box', price: 199, desc: 'Masala rice + egg fry. Quick fix.', cat: 'Combos', img: '/images/dish-egg-rice.jpg', ingredients: ['Masala rice', 'Egg fry', 'Salad'] },
  { id: 'ultimate-bachelor-box', name: 'Ultimate Bachelor Box', price: 299, desc: 'Ghee rice + kebab + egg. The works.', cat: 'Combos', img: '/images/food-chicken-rice.jpg', ingredients: ['Ghee rice', 'Chicken kebab', 'Egg', 'Salad'] },
  { id: 'wok-box-veg', name: 'Wok Box Veg', price: 199, desc: 'Noodles + rice + veg starter.', cat: 'Combos', img: '/images/dish-veg-rice.jpg', ingredients: ['Noodles', 'Veg fried rice', 'Veg starter'] },
  { id: 'wok-box-non-veg', name: 'Wok Box Non Veg', price: 249, desc: 'Noodles + rice + chicken starter.', cat: 'Combos', img: '/images/food-chicken-rice.jpg', ingredients: ['Noodles', 'Chicken rice', 'Chicken starter'] },

  // ─── Maggi Station ───
  { id: 'classic-veg-maggi', name: 'Classic Veg Maggi', price: 89, desc: 'The midnight classic. Simple comfort.', cat: 'Maggi', img: '/images/food-maggi.jpg', ingredients: ['Maggi noodles', 'Veggies', 'Masala'] },
  { id: 'cheesy-garlic-maggi', name: 'Cheesy Garlic Maggi', price: 109, desc: 'Loaded with cheese & roasted garlic.', cat: 'Maggi', img: '/images/food-maggi.jpg', ingredients: ['Maggi noodles', 'Cheese', 'Garlic', 'Butter'] },
  { id: 'masala-egg-maggi', name: 'Masala Egg Maggi', price: 129, desc: 'Bestseller. Egg-loaded goodness.', cat: 'Maggi', img: '/images/food-maggi.jpg', ingredients: ['Maggi noodles', 'Egg', 'Masala', 'Veggies'] },
  { id: 'spicy-chilli-chicken-maggi', name: 'Spicy Chilli Chicken Maggi', price: 149, desc: 'Chilli chicken chunks in Maggi.', cat: 'Maggi', img: '/images/food-maggi.jpg', hot: true, ingredients: ['Maggi noodles', 'Chilli chicken', 'Chilli flakes', 'Veggies'] },
];

const byId = new Map(menu.map((d) => [d.id, d]));

export function getDish(id: string): Dish | undefined {
  return byId.get(id);
}

export function getDishes(ids: string[]): Dish[] {
  return ids.map((id) => byId.get(id)).filter((d): d is Dish => Boolean(d));
}

// ─── Veg classification ───
// Strict vegetarian (no egg, no meat). Used by the Craving Meter Veg toggle.
export const VEG_DISH_IDS = new Set<string>([
  // Veg Starters
  'gobi-manchurian', 'chilli-gobi', 'crunchy-gobi-pakoda', 'mix-veg-manchurian',
  'paneer-manchurian', 'chilli-paneer', 'spicy-paneer-pepper-grilled',
  'mushroom-manchurian', 'chilli-mushroom',
  'baby-corn-manchurian', 'chilli-baby-corn',
  // Veg Rice
  'street-style-veg-fried-rice', 'schezwan-veg-fried-rice',
  'classic-jeera-rice', 'loaded-veg-masala-rice', 'zesty-lemon-rice', 'signature-butter-rice',
  // Veg Noodles
  'schezwan-noodles', 'classic-hakka-veg-noodles', 'chilli-garlic-veg-noodles',
  // Veg Combos
  'wok-box-veg',
  // Veg Maggi
  'classic-veg-maggi', 'cheesy-garlic-maggi',
]);

export function isVeg(idOrDish: string | Dish): boolean {
  const id = typeof idOrDish === 'string' ? idOrDish : idOrDish.id;
  return VEG_DISH_IDS.has(id);
}

// ─── Mood-based suggestions ───
// These pick from the `menu` above by id. To change what shows under a mood,
// swap the ids in the `dishes` array. Prices/names/images auto-stay in sync.

export type HungerLevel = {
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;
  desc: string;
  dishes: string[]; // dish ids
};

export const hungerLevels: HungerLevel[] = [
  {
    level: 1, label: 'Just Peckish', emoji: '\u{1F34E}',
    desc: 'A light nibble. Nothing heavy.',
    dishes: [
      'classic-veg-maggi', 'classic-jeera-rice', 'zesty-lemon-rice',
      'desi-masala-omelette', 'cheesy-garlic-maggi', 'crunchy-gobi-pakoda',
    ],
  },
  {
    level: 2, label: 'Getting Hungry', emoji: '\u{1F35C}',
    desc: 'Need something satisfying.',
    dishes: [
      'egg-fried-rice', 'schezwan-noodles', 'classic-bread-omelette',
      'masala-egg-maggi', 'street-style-veg-fried-rice', 'gobi-manchurian',
    ],
  },
  {
    level: 3, label: 'Proper Hunger', emoji: '\u{1F357}',
    desc: 'Time for a real meal.',
    dishes: [
      'chilli-chicken', 'chicken-fried-rice', 'hakka-chicken-noodles',
      'paneer-manchurian', 'chilli-paneer', 'schezwan-veg-fried-rice',
    ],
  },
  {
    level: 4, label: 'Starving', emoji: '\u{1F969}',
    desc: 'Big portions. Full power.',
    dishes: [
      'late-night-saver-box', 'special-ghee-chicken-dry', 'ultimate-bachelor-box',
      'wok-box-veg', 'chicken-manchurian', 'spicy-paneer-pepper-grilled',
    ],
  },
  {
    level: 5, label: 'Midnight Crisis', emoji: '\u{1F525}',
    desc: 'Emergency mode. Maximum flavour.',
    dishes: [
      'wok-box-non-veg', 'chilli-garlic-chicken-noodles', 'chicken-lollypop',
      'crispy-chicken-pepper-fry', 'spicy-chilli-chicken-maggi', 'chilli-gobi',
    ],
  },
];

export type PersonalityKey = 'wolf' | 'owl' | 'devil' | 'comfort';

export type Personality = {
  emoji: string;
  name: string;
  tagline: string;
  traits: string[];
  dishes: string[]; // dish ids
  color: string;
};

export const personalities: Record<PersonalityKey, Personality> = {
  wolf: {
    emoji: '\u{1F43A}', name: 'Hungry Wolf', tagline: 'The feast begins.',
    traits: ['Large Portions', 'Combo Meals', 'Extra Protein'],
    dishes: ['chilli-chicken', 'late-night-saver-box', 'chicken-lollypop'],
    color: '#E11D48',
  },
  owl: {
    emoji: '\u{1F989}', name: 'Night Owl', tagline: 'Light & focused.',
    traits: ['Light Meals', 'Fried Rice Bowls', 'Quick Snacks'],
    dishes: ['egg-fried-rice', 'classic-bread-omelette', 'hakka-chicken-noodles'],
    color: '#8B5CF6',
  },
  devil: {
    emoji: '\u{1F336}', name: 'Spicy Devil', tagline: 'Bring the burn.',
    traits: ['Fiery Heat', 'Byadgi Burn', 'Schezwan Lover'],
    dishes: ['crispy-chicken-pepper-fry', 'schezwan-chicken-fried-rice', 'spicy-chilli-chicken-maggi'],
    color: '#F97316',
  },
  comfort: {
    emoji: '\u{1F33F}', name: 'Comfort Seeker', tagline: 'Soft, warm, simple.',
    traits: ['Vegetarian', 'Mild & Cozy', 'Pure Comfort'],
    dishes: ['cheesy-garlic-maggi', 'signature-butter-rice', 'paneer-manchurian'],
    color: '#16A34A',
  },
};
