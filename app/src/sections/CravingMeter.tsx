import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { hungerLevels, getDishes } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';

export default function CravingMeter() {
  const [hunger, setHunger] = useState(2);
  const { getQty, setQty } = useCart();
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = hungerLevels[hunger - 1];
  const dishes = getDishes(current.dishes);

  return (
    <section ref={ref} className="w-full bg-[#0A0A0A] py-16" id="night-shift">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className={`text-center mb-8 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium mb-2">How Hungry Are You?</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">The Craving Meter</h2>
          <p className="text-[#A3A3A3] text-[12px] mt-2">Drag to set your hunger level. We&apos;ll suggest.</p>
        </div>

        {/* Slider */}
        <div className={`max-w-[500px] mx-auto mb-8 transition-all duration-500 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Level labels */}
          <div className="flex justify-between mb-2 px-1">
            {hungerLevels.map((h) => (
              <button
                key={h.level}
                onClick={() => setHunger(h.level)}
                className="flex flex-col items-center gap-1 transition-all"
              >
                <span
                  className="text-lg transition-all"
                  style={{
                    opacity: hunger === h.level ? 1 : 0.3,
                    transform: hunger === h.level ? 'scale(1.2)' : 'scale(1)',
                  }}
                >
                  {h.emoji}
                </span>
                <span
                  className="text-[8px] uppercase tracking-wider transition-colors hidden sm:block"
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
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#1A1A1A] accent-[#E11D48] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #E11D48 0%, #E11D48 ${(hunger - 1) * 25}%, #1A1A1A ${(hunger - 1) * 25}%, #1A1A1A 100%)`,
              }}
            />
          </div>

          {/* Current level display */}
          <div className="text-center mt-4">
            <span className="text-[#E11D48] text-[14px] font-semibold">{current.label}</span>
            <span className="text-[#A3A3A3] text-[12px] ml-2">{current.desc}</span>
          </div>
        </div>

        {/* Suggested dishes */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[700px] mx-auto transition-all duration-400"
          key={hunger}
        >
          {dishes.map((d, i) => {
            const q = getQty(d.name);
            return (
              <div
                key={`${hunger}-${i}`}
                className="group flex items-center gap-3 bg-[#111] rounded-xl overflow-hidden border border-white/[0.04] hover:border-[#E11D48]/20 transition-all"
              >
                <div className="w-[72px] h-[72px] flex-shrink-0 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-white text-[13px] font-medium truncate group-hover:text-[#E11D48] transition-colors">{d.name}</p>
                  <p className="text-[#E11D48] text-[14px] font-bold mt-0.5">{`\u20B9${d.price}`}</p>
                </div>
                <button
                  onClick={() => setQty(d.name, q + 1, d.price)}
                  className="mr-2 w-8 h-8 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all shadow-[0_0_10px_rgba(225,29,72,0.3)] flex-shrink-0"
                  aria-label={`Add ${d.name}`}
                >
                  {q > 0 ? <span className="text-[11px] font-bold">{q}</span> : <Plus size={14} />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Hunger indicator dots */}
        <div className="flex justify-center gap-1.5 mt-6">
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
