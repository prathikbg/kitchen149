import { useState, useRef, useEffect, useMemo } from 'react';
import { Plus, Minus, ShoppingBag } from 'lucide-react';
import { personalities, getDishes, type PersonalityKey } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';

const ORDER: PersonalityKey[] = ['wolf', 'owl', 'devil', 'comfort'];

export default function NightPersonality() {
  const [active, setActive] = useState<PersonalityKey>('wolf');
  const { getQty, setQty } = useCart();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const p = personalities[active];
  const dishes = useMemo(() => getDishes(p.dishes), [p.dishes]);
  const comboTotal = dishes.reduce((sum, d) => sum + d.price, 0);

  const addCombo = () => {
    dishes.forEach((d) => setQty(d.name, getQty(d.name) + 1, d.price));
  };

  return (
    <section ref={ref} className="w-full bg-[#0A0A0A] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-3">Find Your Vibe</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Choose Your Night Personality</h2>
        </div>

        {/* Personality picker — 4 cards */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[1000px] mx-auto mb-12 transition-all duration-500 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {ORDER.map((key) => {
            const per = personalities[key];
            const isActive = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className="group relative bg-[#111] rounded-2xl p-5 border transition-all duration-300 text-center hover:-translate-y-0.5"
                style={{
                  borderColor: isActive ? per.color : 'rgba(255,255,255,0.06)',
                  boxShadow: isActive ? `0 0 24px ${per.color}40, inset 0 0 20px ${per.color}10` : 'none',
                }}
                aria-pressed={isActive}
              >
                <div
                  className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110"
                  style={{ filter: isActive ? `drop-shadow(0 0 12px ${per.color}90)` : 'none' }}
                >
                  {per.emoji}
                </div>
                <p className="text-white text-[14px] font-bold tracking-wide">{per.name}</p>
                <p className="text-[#A3A3A3] text-[12px] mt-1 leading-snug">{per.tagline}</p>
              </button>
            );
          })}
        </div>

        {/* Hero panel for active personality */}
        <div key={`hero-${active}`} className="text-center mb-10 animate-fade-up">
          <div
            className="inline-block text-7xl sm:text-8xl mb-4 animate-float"
            style={{ filter: `drop-shadow(0 0 30px ${p.color}90)` }}
          >
            {p.emoji}
          </div>
          <h3 className="text-white text-2xl sm:text-3xl font-bold">{p.name}</h3>
          <p className="text-[16px] italic mt-2" style={{ color: p.color }}>{p.tagline}</p>
          <div className="flex justify-center gap-2 mt-5 flex-wrap">
            {p.traits.map((t, i) => (
              <span
                key={i}
                className="text-[12px] tracking-[0.1em] px-4 py-2 rounded-full border bg-[#111] font-medium"
                style={{ borderColor: `${p.color}40`, color: p.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Dishes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[1200px] mx-auto" key={`dishes-${active}`}>
          {dishes.map((d, i) => {
            const q = getQty(d.name);
            return (
              <div
                key={`${active}-${i}`}
                className="bg-[#111] rounded-2xl overflow-hidden border border-white/[0.04] animate-fade-up transition-transform hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="h-[200px] overflow-hidden relative">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.indexOf('/images/dish-bread-omelette.jpg') === -1) {
                        img.src = '/images/dish-bread-omelette.jpg';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 text-[22px]">{p.emoji}</span>
                </div>
                <div className="p-5 -mt-3 relative">
                  <h3 className="text-white text-[16px] font-semibold leading-snug">{d.name}</h3>
                  <p className="text-[#A3A3A3] text-[13px] mt-1">{d.desc}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[19px] font-bold" style={{ color: p.color }}>{`\u20B9${d.price}`}</span>
                    {q > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(d.name, q - 1, d.price)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center transition-all"
                          style={{ borderColor: `${p.color}50`, color: p.color }}
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-[14px] font-semibold w-5 text-center">{q}</span>
                        <button
                          onClick={() => setQty(d.name, q + 1, d.price)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all"
                          style={{ backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}50` }}
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setQty(d.name, 1, d.price)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-[12px] tracking-wider uppercase font-semibold transition-all"
                        style={{ borderColor: `${p.color}50`, color: p.color }}
                      >
                        <Plus size={12} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order combo CTA */}
        <div className="flex justify-center mt-10" key={`cta-${active}`}>
          <button
            onClick={addCombo}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-[13px] font-bold uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 animate-fade-up"
            style={{
              backgroundColor: p.color,
              boxShadow: `0 0 24px ${p.color}60, 0 0 48px ${p.color}30`,
            }}
          >
            <ShoppingBag size={16} />
            Order {p.name} Combo
            <span className="opacity-60">·</span>
            <span>{`\u20B9${comboTotal}`}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
