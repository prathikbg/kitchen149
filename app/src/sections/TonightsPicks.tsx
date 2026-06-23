import { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, Minus, ShoppingBag, Flame, Gamepad2, BookOpen, Check } from 'lucide-react';
import { hungerLevels, personalities, getDishes, isVeg, type Dish, type PersonalityKey } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';

type LensKey = 'hunger' | 'vibe' | 'heat' | 'bundles';
type DietFilter = 'all' | 'veg';

const LENSES: { key: LensKey; label: string; emoji: string }[] = [
  { key: 'hunger', label: 'By Hunger', emoji: '\u{1F374}' },
  { key: 'vibe', label: 'By Vibe', emoji: '\u{1F43A}' },
  { key: 'heat', label: 'By Heat', emoji: '\u{1F336}' },
  { key: 'bundles', label: 'Bundles', emoji: '\u{1F4E6}' },
];

const PERSONALITY_ORDER: PersonalityKey[] = ['wolf', 'owl', 'devil', 'comfort'];

const heatLevels = [
  { label: 'Mild', peppers: 1, color: '#FACC15', desc: 'Gentle warmth for easy eaters.', badge: null as string | null, dishes: ['classic-jeera-rice', 'egg-fried-rice', 'classic-veg-maggi', 'classic-bread-omelette'] },
  { label: 'Medium', peppers: 2, color: '#FB923C', desc: 'Nice kick, still comfortable.', badge: null, dishes: ['chilli-chicken', 'chilli-paneer', 'hakka-chicken-noodles', 'chicken-manchurian'] },
  { label: 'Schezwan', peppers: 3, color: '#EF4444', desc: 'Bring the fire. Bold flavour.', badge: '\u{1F336} Hot', dishes: ['schezwan-noodles', 'schezwan-chicken-fried-rice', 'classic-chicken-65', 'byadgi-burn-protein-omelette'] },
  { label: 'Regret Tomorrow', peppers: 4, color: '#B91C1C', desc: 'Not for the weak. Extreme heat.', badge: '\u26A0 Order water with this', dishes: ['crispy-chicken-pepper-fry', 'chilli-garlic-chicken-noodles', 'special-ghee-chicken-dry', 'spicy-chilli-chicken-maggi'] },
];

const bundles = [
  { icon: Flame, name: 'Coding Combo', desc: 'For the 3 AM debugging sessions.', dishIds: ['schezwan-noodles', 'chilli-chicken', 'cheesy-garlic-maggi'], tag: 'Bestseller' },
  { icon: Gamepad2, name: 'Gamer Pack', desc: 'Fuel for marathon gaming nights.', dishIds: ['chicken-lollypop', 'classic-chicken-65', 'masala-egg-maggi'], tag: 'Popular' },
  { icon: BookOpen, name: 'Exam Night Box', desc: 'Brain food for all-nighters.', dishIds: ['egg-fried-rice', 'gobi-manchurian', 'spicy-chilli-chicken-maggi'], tag: 'Student Fav' },
];

// Shared dish card — identical Add UX across every lens
function DishCard({ dish, color }: { dish: Dish; color: string }) {
  const { getQty, setQty } = useCart();
  const q = getQty(dish.id);
  const veg = isVeg(dish);
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden border border-white/[0.04] hover:-translate-y-0.5 transition-transform animate-fade-up">
      <div className="h-[160px] overflow-hidden relative">
        <img src={dish.img} alt={dish.name} loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => { const i = e.currentTarget; if (i.src.indexOf('/images/dish-bread-omelette.jpg') === -1) i.src = '/images/dish-bread-omelette.jpg'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
        <span className={`absolute top-2.5 left-2.5 w-3.5 h-3.5 border rounded-sm flex items-center justify-center bg-black/60 ${veg ? 'border-[#16A34A]' : 'border-[#E11D48]'}`} title={veg ? 'Vegetarian' : 'Non-vegetarian'}>
          <span className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-[#16A34A]' : 'bg-[#E11D48]'}`} />
        </span>
      </div>
      <div className="p-4">
        <h4 className="text-white text-[14px] font-semibold leading-tight line-clamp-2 min-h-[34px]">{dish.name}</h4>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[16px] font-bold" style={{ color }}>{`\u20B9${dish.price}`}</span>
          {q > 0 ? (
            <div className="flex items-center gap-1.5">
              <button onClick={() => setQty(dish.id, q - 1)} aria-label="Decrease" className="w-7 h-7 rounded-full border flex items-center justify-center transition-all" style={{ borderColor: `${color}50`, color }}><Minus size={11} /></button>
              <span className="text-white text-[12px] font-semibold w-4 text-center">{q}</span>
              <button onClick={() => setQty(dish.id, q + 1, dish)} aria-label="Increase" className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}50` }}><Plus size={11} /></button>
            </div>
          ) : (
            <button onClick={() => setQty(dish.id, 1, dish)} className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] tracking-wider uppercase font-semibold transition-all hover:-translate-y-0.5" style={{ borderColor: `${color}50`, color }}>
              <Plus size={10} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Add-all helper for combo CTAs — bumps qty by 1 for every dish
function useAddAll() {
  const { getQty, setQty } = useCart();
  return (list: Dish[]) => list.forEach((d) => setQty(d.id, getQty(d.id) + 1, d));
}

export default function TonightsPicks() {
  const [lens, setLens] = useState<LensKey>('hunger');
  const [diet, setDiet] = useState<DietFilter>('all');
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="picks" className="w-full bg-[#0A0A0A] py-20 relative overflow-hidden">
      {/* Legacy anchors so the existing nav links still land here */}
      <span id="night-shift" className="absolute -top-20" aria-hidden="true" />
      <span id="kits" className="absolute -top-20" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`text-center mb-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-3">Tonight&apos;s Picks</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Pick Your Lens</h2>
          <p className="text-[#A3A3A3] text-[14px] mt-3">Browse by hunger, vibe, heat — or grab a ready bundle.</p>
        </div>

        {/* Lens tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {LENSES.map((l) => {
            const active = l.key === lens;
            return (
              <button key={l.key} onClick={() => setLens(l.key)} aria-pressed={active}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.12em] transition-all border ${
                  active ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_18px_rgba(225,29,72,0.45)]' : 'bg-[#111] text-[#A3A3A3] border-white/[0.06] hover:border-[#E11D48]/30 hover:text-white'
                }`}>
                <span className="text-[14px]">{l.emoji}</span>
                {l.label}
              </button>
            );
          })}
        </div>

        {/* Veg toggle — hidden for Bundles which are pre-set */}
        {lens !== 'bundles' && (
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-[#111] rounded-full p-1 border border-white/[0.06]">
              <button onClick={() => setDiet('all')} className={`px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all ${diet === 'all' ? 'bg-[#E11D48] text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]' : 'text-[#A3A3A3] hover:text-white'}`}>ALL</button>
              <button onClick={() => setDiet('veg')} className={`px-4 py-1.5 text-[11px] font-semibold rounded-full transition-all flex items-center gap-1.5 ${diet === 'veg' ? 'bg-[#16A34A] text-white shadow-[0_0_10px_rgba(22,163,74,0.4)]' : 'text-[#A3A3A3] hover:text-white'}`}>
                <span className="inline-block w-2.5 h-2.5 border border-current rounded-sm relative"><span className="absolute inset-[2px] rounded-full bg-current" /></span>
                VEG
              </button>
            </div>
          </div>
        )}

        {lens === 'hunger' && <HungerLens diet={diet} />}
        {lens === 'vibe' && <VibeLens diet={diet} />}
        {lens === 'heat' && <HeatLens diet={diet} />}
        {lens === 'bundles' && <BundlesLens />}
      </div>
    </section>
  );
}

// Lens stubs — replaced in follow-up edits.
function HungerLens(_: { diet: DietFilter }) { return null; }
function VibeLens(_: { diet: DietFilter }) { return null; }
function HeatLens(_: { diet: DietFilter }) { return null; }
function BundlesLens() { return null; }

// Re-export shared bits so lens implementations can use them via module scope.
export { DishCard, useAddAll, heatLevels, bundles, PERSONALITY_ORDER };
