import { useState, useRef, useEffect, useMemo } from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { hungerLevels, getDishes, isVeg } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';

type DietFilter = 'all' | 'veg';

export default function CravingMeter() {
  const [hunger, setHunger] = useState(2);
  const [diet, setDiet] = useState<DietFilter>('all');
  const { getQty, setQty } = useCart();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = hungerLevels[hunger - 1];
  const dishes = useMemo(() => {
    const all = getDishes(current.dishes);
    return diet === 'veg' ? all.filter((d) => isVeg(d)) : all;
  }, [current.dishes, diet]);

  const addAll = () => {
    dishes.forEach((d) => setQty(d.id, getQty(d.id) + 1, d));
  };

  return (
    <section ref={ref} className="w-full bg-[#0A0A0A] py-20" id="night-shift">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`text-center mb-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-3">How Hungry Are You?</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">The Craving Meter</h2>
          <p className="text-[#A3A3A3] text-[14px] mt-3">Drag to set your hunger level. We&apos;ll suggest.</p>
        </div>

        {/* Slider */}
        <div className={`max-w-[560px] mx-auto mb-10 transition-all duration-500 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Level labels */}
          <div className="flex justify-between mb-3 px-1">
            {hungerLevels.map((h) => (
              <button
                key={h.level}
                onClick={() => setHunger(h.level)}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <span
                  className="text-xl transition-all"
                  style={{
                    opacity: hunger === h.level ? 1 : 0.3,
                    transform: hunger === h.level ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  {h.emoji}
                </span>
                <span
                  className="text-[10px] uppercase tracking-wider transition-colors hidden sm:block font-medium"
                  style={{ color: hunger === h.level ? '#E11D48' : '#A3A3A330' }}
                >
                  {h.label}
                </span>
              </button>
            ))}
          </div>

          {/* Range input */}
          <div className="relative px-2">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={hunger}
              onChange={(e) => setHunger(Number(e.target.value))}
              className="craving-slider w-full rounded-full appearance-none cursor-pointer bg-[#1A1A1A] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #E11D48 0%, #E11D48 ${(hunger - 1) * 25}%, #1A1A1A ${(hunger - 1) * 25}%, #1A1A1A 100%)`,
              }}
              aria-label="Hunger level"
            />
          </div>

          {/* Current level display */}
          <div className="text-center mt-5">
            <span className="text-[#E11D48] text-[16px] font-bold">{current.label}</span>
            <span className="text-[#A3A3A3] text-[14px] ml-2">{current.desc}</span>
          </div>
        </div>

        {/* Filter toolbar: Veg toggle + Add all */}
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 mb-4 px-1">
          <div className="inline-flex bg-[#111] rounded-full p-1 border border-white/[0.06]">
            <button
              onClick={() => setDiet('all')}
              className={`px-4 py-2 text-[12px] font-semibold rounded-full transition-all ${diet === 'all' ? 'bg-[#E11D48] text-white shadow-[0_0_10px_rgba(225,29,72,0.4)]' : 'text-[#A3A3A3] hover:text-white'}`}
            >
              ALL
            </button>
            <button
              onClick={() => setDiet('veg')}
              className={`px-4 py-2 text-[12px] font-semibold rounded-full transition-all flex items-center gap-1.5 ${diet === 'veg' ? 'bg-[#16A34A] text-white shadow-[0_0_10px_rgba(22,163,74,0.4)]' : 'text-[#A3A3A3] hover:text-white'}`}
            >
              <span className="inline-block w-2.5 h-2.5 border border-current rounded-sm relative">
                <span className="absolute inset-[2px] rounded-full bg-current" />
              </span>
              VEG
            </button>
          </div>
          <button
            onClick={addAll}
            disabled={dishes.length === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-[#E11D48] text-white text-[12px] font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-white/[0.08] hover:border-[#E11D48]"
          >
            <ShoppingBag size={14} />
            Add all ({dishes.length})
          </button>
        </div>

        {/* Suggested dishes — horizontal scroller */}
        <div
          className="max-w-[1200px] mx-auto overflow-x-auto no-scrollbar px-1 transition-all duration-400"
          key={`${hunger}-${diet}`}
        >
          {dishes.length === 0 ? (
            <div className="text-center py-10 text-[#A3A3A3] text-[14px]">
              No veg options at this level. Try a lower hunger setting or switch to ALL.
            </div>
          ) : (
            <div className="flex gap-4 pb-2 snap-x snap-mandatory">
              {dishes.map((d, i) => {
                const q = getQty(d.id);
                const veg = isVeg(d);
                return (
                  <div
                    key={`${hunger}-${i}`}
                    className="group flex items-center gap-3 bg-[#111] rounded-xl overflow-hidden border border-white/[0.04] hover:border-[#E11D48]/20 transition-all flex-shrink-0 w-[300px] snap-start"
                  >
                    <div className="w-[88px] h-[88px] flex-shrink-0 overflow-hidden relative">
                      <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (img.src.indexOf('/images/dish-bread-omelette.jpg') === -1) {
                            img.src = '/images/dish-bread-omelette.jpg';
                          }
                        }}
                      />
                      <span
                        className={`absolute top-1.5 left-1.5 w-3.5 h-3.5 border rounded-sm flex items-center justify-center bg-black/60 ${veg ? 'border-[#16A34A]' : 'border-[#E11D48]'}`}
                        title={veg ? 'Vegetarian' : 'Non-vegetarian'}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${veg ? 'bg-[#16A34A]' : 'bg-[#E11D48]'}`} />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-white text-[14px] font-semibold line-clamp-2 group-hover:text-[#E11D48] transition-colors leading-tight">{d.name}</p>
                      <p className="text-[#E11D48] text-[16px] font-bold mt-1">{`\u20B9${d.price}`}</p>
                    </div>
                    <button
                      onClick={() => setQty(d.id, q + 1, d)}
                      className="mr-2.5 w-9 h-9 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all shadow-[0_0_10px_rgba(225,29,72,0.3)] flex-shrink-0"
                      aria-label={`Add ${d.name}`}
                    >
                      {q > 0 ? <span className="text-[12px] font-bold">{q}</span> : <Plus size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scroll hint */}
        {dishes.length > 3 && (
          <p className="text-center text-[11px] text-[#A3A3A3]/60 mt-3 sm:hidden">← swipe for more →</p>
        )}

        {/* Hunger indicator dots */}
        <div className="flex justify-center gap-2 mt-7">
          {hungerLevels.map((h) => (
            <div
              key={h.level}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: h.level <= hunger ? '#E11D48' : '#1A1A1A',
                boxShadow: h.level === hunger ? '0 0 8px #E11D48' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
