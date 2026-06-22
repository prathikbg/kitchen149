import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Flame } from 'lucide-react';
import { useCart, parsePrice } from '@/contexts/CartContext';

const categories = ['All', 'Starters', 'Rice', 'Noodles', 'Combos', 'Eggs', 'Maggi'];

const dishes = [
  // ─── Chicken Starters ───
  { n: 'Classic Chicken 65', p: '\u20B9199', desc: 'Fiery deep-fried chicken with curry leaves.', cat: 'Starters', img: '/images/dish-chicken-65.jpg', hot: true, ingredients: ['Chicken', 'Curry leaves', 'Spice 65 masala', 'Green chillies'] },
  { n: 'Classic Chicken Kebab', p: '\u20B9149', desc: 'Smoky charcoal-grilled chicken.', cat: 'Starters', img: '/images/dish-chilli-chicken.jpg', ingredients: ['Chicken', 'Yogurt marinade', 'Charcoal smoked', 'Spices'] },
  { n: 'Signature Umami Kebab', p: '\u20B9149', desc: 'Secret marinade, perfectly grilled.', cat: 'Starters', img: '/images/dish-chilli-chicken.jpg', ingredients: ['Chicken', 'Secret marinade', 'Soy sauce', 'Garlic'] },
  { n: 'Special Ghee Chicken Dry', p: '\u20B9249', desc: 'Wok-tossed in pure ghee, garlic & dark soy.', cat: 'Starters', img: '/images/dish-ghee-chicken.jpg', hot: true, ingredients: ['Chicken', 'Pure ghee', 'Garlic', 'Dark soy'] },
  { n: 'Chilli Chicken', p: '\u20B9199', desc: 'The late night classic. Bell peppers & soy.', cat: 'Starters', img: '/images/dish-chilli-chicken.jpg', hot: true, ingredients: ['Chicken', 'Bell peppers', 'Soy sauce', 'Green chillies'] },
  { n: 'Chicken Manchurian', p: '\u20B9199', desc: 'Dark, savory classic with spring onions.', cat: 'Starters', img: '/images/dish-manchurian.jpg', ingredients: ['Chicken mince', 'Soy sauce', 'Ginger-garlic', 'Spring onions'] },
  { n: 'Garlic Chicken', p: '\u20B9199', desc: 'Punchy, dark roasted garlic sauce.', cat: 'Starters', img: '/images/dish-ghee-chicken.jpg', hot: true, ingredients: ['Chicken', 'Roasted garlic', 'Soy sauce', 'Chilli'] },
  { n: 'Crispy Chicken Pepper Fry', p: '\u20B9199', desc: 'Fiery dry fry with black pepper & lemon.', cat: 'Starters', img: '/images/dish-ghee-chicken.jpg', hot: true, ingredients: ['Chicken', 'Black pepper', 'Lemon', 'Curry leaves'] },
  { n: 'Chicken Lollypop', p: '\u20B9199', desc: 'Crispy wings with tangy szechuan dip.', cat: 'Starters', img: '/images/dish-lollypop.jpg', ingredients: ['Chicken drumettes', 'Schezwan sauce', 'Crispy coating', 'Spices'] },

  // ─── Vegetarian Starters ───
  { n: 'Gobi Manchurian', p: '\u20B9149', desc: 'Crispy cauliflower in dark soy & garlic.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Cauliflower', 'Soy sauce', 'Garlic', 'Ginger'] },
  { n: 'Chilli Gobi', p: '\u20B9149', desc: 'Wok-tossed with sharp green chillies.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Cauliflower', 'Green chillies', 'Soy sauce', 'Onions'] },
  { n: 'Crunchy Gobi Pakoda', p: '\u20B9149', desc: 'Gram flour coated, deep fried to a crunch.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Cauliflower', 'Gram flour', 'Spices', 'Deep fried'] },
  { n: 'Mix Veg Manchurian', p: '\u20B9149', desc: 'Mixed vegetable dumplings in soy glaze.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Mixed vegetables', 'Soy sauce', 'Garlic', 'Corn flour'] },
  { n: 'Paneer Manchurian', p: '\u20B9199', desc: 'Soft paneer cubes in savory sauce.', cat: 'Starters', img: '/images/dish-chilli-paneer.jpg', ingredients: ['Paneer', 'Soy sauce', 'Ginger-garlic', 'Spring onions'] },
  { n: 'Chilli Paneer', p: '\u20B9199', desc: 'Paneer seared with onions, soy & chilli.', cat: 'Starters', img: '/images/dish-chilli-paneer.jpg', hot: true, ingredients: ['Paneer', 'Onions', 'Soy sauce', 'Chilli'] },
  { n: 'Spicy Paneer Pepper Grilled', p: '\u20B9249', desc: 'Dry roasted paneer with crushed pepper.', cat: 'Starters', img: '/images/dish-paneer-grilled.jpg', hot: true, ingredients: ['Paneer', 'Black pepper', 'Capsicum', 'Onions'] },
  { n: 'Mushroom Manchurian', p: '\u20B9149', desc: 'Earthy mushrooms in ginger-garlic-soy base.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Mushrooms', 'Ginger-garlic', 'Soy sauce', 'Spring onions'] },
  { n: 'Chilli Mushroom', p: '\u20B9149', desc: 'Hot & fiery wok-tossed with green chillies.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Mushrooms', 'Green chillies', 'Soy sauce', 'Onions'] },
  { n: 'Baby Corn Manchurian', p: '\u20B9149', desc: 'Crispy baby corn in savory manchurian gravy.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', ingredients: ['Baby corn', 'Manchurian gravy', 'Garlic', 'Soy'] },
  { n: 'Chilli Baby Corn', p: '\u20B9149', desc: 'Crunchy baby corn with bell peppers & soy.', cat: 'Starters', img: '/images/dish-gobi-manchurian.jpg', hot: true, ingredients: ['Baby corn', 'Bell peppers', 'Soy sauce', 'Chilli'] },

  // ─── Non-Veg Rice ───
  { n: 'Egg Fried Rice', p: '\u20B9149', desc: 'Classic smoky rice with scrambled egg.', cat: 'Rice', img: '/images/dish-egg-rice.jpg', ingredients: ['Rice', 'Scrambled egg', 'Spring onions', 'Soy sauce'] },
  { n: 'Chicken Fried Rice', p: '\u20B9199', desc: 'Smoky wok-tossed rice with chicken.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', ingredients: ['Rice', 'Chicken', 'Egg', 'Soy sauce'] },
  { n: 'House Special Mixed Fried Rice', p: '\u20B9299', desc: 'Egg, chicken, veggies & byadgi chilli.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', ingredients: ['Rice', 'Chicken', 'Egg', 'Byadgi chilli'] },
  { n: 'Schezwan Egg Fried Rice', p: '\u20B9149', desc: 'Fiery red schezwan with egg.', cat: 'Rice', img: '/images/dish-egg-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Egg', 'Spring onions'] },
  { n: 'Schezwan Chicken Fried Rice', p: '\u20B9199', desc: 'Fiery red schezwan with chicken.', cat: 'Rice', img: '/images/food-chicken-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Chicken', 'Egg'] },

  // ─── Veg Rice ───
  { n: 'Street Style Veg Fried Rice', p: '\u20B9149', desc: 'Mixed veggies, smoky & satisfying.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Carrot', 'Beans', 'Corn', 'Soy'] },
  { n: 'Schezwan Veg Fried Rice', p: '\u20B9149', desc: 'Fiery schezwan with mixed vegetables.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', hot: true, ingredients: ['Rice', 'Schezwan sauce', 'Mixed veggies'] },

  // ─── Comfort Bowls Indian ───
  { n: 'Classic Jeera Rice', p: '\u20B999', desc: 'Fragrant cumin tempered basmati.', cat: 'Rice', img: '/images/dish-garlic-rice.jpg', ingredients: ['Basmati rice', 'Cumin', 'Ghee', 'Salt'] },
  { n: 'Loaded Veg Masala Rice', p: '\u20B9149', desc: 'Masala-loaded vegetable rice.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Mixed vegetables', 'Masala', 'Onions'] },
  { n: 'Zesty Lemon Rice', p: '\u20B999', desc: 'Tangy, light & refreshing.', cat: 'Rice', img: '/images/dish-veg-rice.jpg', ingredients: ['Rice', 'Lemon', 'Mustard seeds', 'Curry leaves'] },
  { n: 'Signature Butter Rice', p: '\u20B9149', desc: 'Rich, buttery & indulgent.', cat: 'Rice', img: '/images/dish-garlic-rice.jpg', ingredients: ['Rice', 'Butter', 'Salt', 'Pepper'] },

  // ─── Clean Cut High Protein ───
  { n: 'Lean Egg Protein Toss', p: '\u20B9149', desc: 'Egg whites, lean & protein-packed.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg whites', 'Salt', 'Pepper', 'Spring onions'] },
  { n: 'Byadgi Burn Protein Omelette', p: '\u20B9199', desc: 'Egg whites with byadgi chilli burn.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg whites', 'Byadgi chilli', 'Salt', 'Pepper'] },

  // ─── Noodles ───
  { n: 'Schezwan Noodles', p: '\u20B9149', desc: 'Fiery schezwan-tossed noodles.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', hot: true, ingredients: ['Noodles', 'Schezwan sauce', 'Veggies', 'Garlic'] },
  { n: 'Hakka Chicken Noodles', p: '\u20B9199', desc: 'Classic hakka style with chicken.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', ingredients: ['Noodles', 'Chicken', 'Soy sauce', 'Veggies'] },
  { n: 'Hakka Egg Noodles', p: '\u20B9149', desc: 'Bestseller. Egg-loaded hakka noodles.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', ingredients: ['Noodles', 'Egg', 'Soy sauce', 'Veggies'] },
  { n: 'Classic Hakka Veg Noodles', p: '\u20B9149', desc: 'Garden fresh veggies, wok-tossed.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', ingredients: ['Noodles', 'Carrot', 'Cabbage', 'Capsicum', 'Soy'] },
  { n: 'Chilli Garlic Veg Noodles', p: '\u20B9149', desc: 'Garlic-forward with green chillies.', cat: 'Noodles', img: '/images/dish-schezwan-noodles.jpg', hot: true, ingredients: ['Noodles', 'Garlic', 'Green chillies', 'Veggies'] },
  { n: 'Chilli Garlic Egg Noodles', p: '\u20B9149', desc: 'Garlic kick with scrambled egg.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', hot: true, ingredients: ['Noodles', 'Egg', 'Garlic', 'Chilli'] },
  { n: 'Chilli Garlic Chicken Noodles', p: '\u20B9199', desc: 'Garlic, chilli & chicken combo.', cat: 'Noodles', img: '/images/dish-hakka-noodles.jpg', hot: true, ingredients: ['Noodles', 'Chicken', 'Garlic', 'Chilli'] },

  // ─── The Egg Cart ───
  { n: 'Classic Bread Omelette', p: '\u20B9129', desc: 'Ghee-toasted bread wrapped in masala egg.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Bread', 'Ghee', 'Masala', 'Onions'] },
  { n: 'Desi Masala Omelette', p: '\u20B999', desc: 'Loaded with onions, tomatoes & chillies.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Onions', 'Tomatoes', 'Green chillies'] },
  { n: 'Ghee Roast Omelette', p: '\u20B9129', desc: 'Cooked purely in ghee, dusted with spice.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Pure ghee', 'Spices', 'Salt'] },
  { n: 'Indo Chinese Omelette', p: '\u20B999', desc: 'Whisked with soy, chilli & spring onions.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Egg', 'Soy sauce', 'Chilli', 'Spring onions'] },
  { n: 'Roadside Egg Bhurji', p: '\u20B999', desc: 'Aggressively tossed spicy scrambled eggs.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Onions', 'Tomatoes', 'Spices'] },
  { n: 'Nati Style Egg Roast [Double]', p: '\u20B989', desc: 'Slow roasted in spicy byadgi paste.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Byadgi chilli', 'Onions', 'Spices'] },
  { n: 'Boiled Egg Masala Fry', p: '\u20B9149', desc: 'Rich tomato & ginger-garlic gravy.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', ingredients: ['Boiled egg', 'Tomato', 'Ginger-garlic', 'Gravy'] },
  { n: 'Spicy Omelette Sherva', p: '\u20B9149', desc: 'Fluffy omelette with deeply spiced sherva.', cat: 'Eggs', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Egg', 'Sherva gravy', 'Spices', 'Onions'] },

  // ─── The Box Combo ───
  { n: 'Late Night Saver Box', p: '\u20B9249', desc: 'Ghee rice + kebabs + sherva. Full meal.', cat: 'Combos', img: '/images/dish-garlic-rice.jpg', ingredients: ['Ghee rice', 'Chicken kebab', 'Sherva gravy', 'Raita'] },
  { n: 'Desi Fix Box', p: '\u20B9199', desc: 'Masala rice + egg fry. Quick fix.', cat: 'Combos', img: '/images/dish-egg-rice.jpg', ingredients: ['Masala rice', 'Egg fry', 'Salad'] },
  { n: 'Ultimate Bachelor Box', p: '\u20B9299', desc: 'Ghee rice + kebab + egg. The works.', cat: 'Combos', img: '/images/food-chicken-rice.jpg', ingredients: ['Ghee rice', 'Chicken kebab', 'Egg', 'Salad'] },
  { n: 'Wok Box Veg', p: '\u20B9199', desc: 'Noodles + rice + veg starter.', cat: 'Combos', img: '/images/dish-veg-rice.jpg', ingredients: ['Noodles', 'Veg fried rice', 'Veg starter'] },
  { n: 'Wok Box Non Veg', p: '\u20B9249', desc: 'Noodles + rice + chicken starter.', cat: 'Combos', img: '/images/food-chicken-rice.jpg', ingredients: ['Noodles', 'Chicken rice', 'Chicken starter'] },

  // ─── Maggi Station ───
  { n: 'Classic Veg Maggi', p: '\u20B989', desc: 'The midnight classic. Simple comfort.', cat: 'Maggi', img: '/images/dish-bread-omelette.jpg', ingredients: ['Maggi noodles', 'Veggies', 'Masala'] },
  { n: 'Cheesy Garlic Maggi', p: '\u20B9109', desc: 'Loaded with cheese & roasted garlic.', cat: 'Maggi', img: '/images/dish-bread-omelette.jpg', ingredients: ['Maggi noodles', 'Cheese', 'Garlic', 'Butter'] },
  { n: 'Masala Egg Maggi', p: '\u20B9129', desc: 'Bestseller. Egg-loaded goodness.', cat: 'Maggi', img: '/images/dish-bread-omelette.jpg', ingredients: ['Maggi noodles', 'Egg', 'Masala', 'Veggies'] },
  { n: 'Spicy Chilli Chicken Maggi', p: '\u20B9149', desc: 'Chilli chicken chunks in Maggi.', cat: 'Maggi', img: '/images/dish-bread-omelette.jpg', hot: true, ingredients: ['Maggi noodles', 'Chilli chicken', 'Chilli flakes', 'Veggies'] },
];

export default function Signatures() {
  const [activeCat, setActiveCat] = useState('All');
  const { getQty, setQty } = useCart();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCat === 'All' ? dishes : dishes.filter(d => d.cat === activeCat);

  return (
    <section ref={ref} id="menu" className="w-full bg-[#0A0A0A] py-16 relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute top-20 right-0 w-[200px] md:w-[300px] opacity-10 pointer-events-none z-0 animate-float">
        <img src="/images/chef-wok-line.png" alt="" className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(225,29,72,0.5))' }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E11D48]/20 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-3">
            <Flame size={16} className="text-[#E11D48]" />
            <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium">Full Menu</p>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E11D48]/30 to-transparent" />
          </div>
          <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Every Dish From The Wok</h2>
          <p className="text-[#A3A3A3] text-[12px] mt-1">{dishes.length} items · Hover for ingredients</p>
        </div>

        {/* Category Filter */}
        <div className={`flex gap-2 mb-8 flex-wrap transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {categories.map((c) => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-5 py-2 rounded-full text-[10px] tracking-[0.15em] font-semibold transition-all border ${
                c === activeCat
                  ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                  : 'text-[#A3A3A3] border-white/[0.06] hover:border-[#E11D48]/30 hover:text-white'
              }`}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((d, i) => {
            const price = parsePrice(d.p);
            const q = getQty(d.n);
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={`${activeCat}-${i}`}
                className={`group relative bg-[#111] rounded-xl overflow-hidden border transition-all duration-500 hover:border-[#E11D48]/25 hover:shadow-[0_0_20px_rgba(225,29,72,0.08)] hover:-translate-y-0.5 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ borderColor: 'rgba(255,255,255,0.04)', transitionDelay: `${Math.min(i * 50, 400)}ms` }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Image area with hover ingredients overlay */}
                <div className="relative h-[140px] overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.n}
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{ transform: isHovered ? 'scale(0.85)' : 'scale(1)' }}
                  />
                  {/* Darken on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />

                  {/* Ingredients overlay on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 animate-fade-in">
                      <div className="flex items-center gap-1 mb-2">
                        <Flame size={12} className="text-[#E11D48]" />
                        <span className="text-[9px] tracking-[0.2em] text-[#E11D48] uppercase font-bold">What Goes In</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {d.ingredients.map((ing, j) => (
                          <span key={j} className="text-[10px] text-white px-2 py-0.5 rounded-full bg-[#E11D48]/20 border border-[#E11D48]/15">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hot badge */}
                  {d.hot && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E11D48]/90 text-white text-[8px] tracking-wider uppercase font-bold z-10">
                      <Flame size={8} /> Hot
                    </div>
                  )}

                  {/* Price tag */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0A0A0A]/80 backdrop-blur-sm z-10">
                    <span className="text-[#E11D48] text-[13px] font-bold">{d.p}</span>
                  </div>

                  {/* Hover hint */}
                  {!isHovered && (
                    <div className="absolute bottom-2 left-2 text-[8px] text-[#A3A3A3]/40 tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Hover for ingredients
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-white text-[13px] font-semibold group-hover:text-[#E11D48] transition-colors">{d.n}</h3>
                  <p className="text-[#A3A3A3] text-[10px] mt-0.5 leading-relaxed">{d.desc}</p>

                  <div className="flex items-center justify-end mt-2">
                    {q > 0 ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(d.n, q - 1, price)}
                          className="w-7 h-7 rounded-full border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48] hover:bg-[#E11D48]/10 transition-all">
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-[12px] font-medium w-4 text-center">{q}</span>
                        <button onClick={() => setQty(d.n, q + 1, price)}
                          className="w-7 h-7 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                          <Plus size={10} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setQty(d.n, 1, price)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#E11D48]/30 text-[#E11D48] text-[10px] tracking-wider uppercase font-medium hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] transition-all hover:shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                        <Plus size={10} /> Add
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E11D48]/0 to-transparent group-hover:via-[#E11D48]/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
