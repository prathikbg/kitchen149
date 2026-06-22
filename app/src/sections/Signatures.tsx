import { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Flame } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { menu as dishes } from '@/data/menu';

const categories = ['All', 'Starters', 'Rice', 'Noodles', 'Combos', 'Eggs', 'Maggi'];

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
            const q = getQty(d.name);
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
                    alt={d.name}
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
                    <span className="text-[#E11D48] text-[13px] font-bold">{`\u20B9${d.price}`}</span>
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
                  <h3 className="text-white text-[13px] font-semibold group-hover:text-[#E11D48] transition-colors">{d.name}</h3>
                  <p className="text-[#A3A3A3] text-[10px] mt-0.5 leading-relaxed">{d.desc}</p>

                  <div className="flex items-center justify-end mt-2">
                    {q > 0 ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(d.name, q - 1, d.price)}
                          className="w-7 h-7 rounded-full border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48] hover:bg-[#E11D48]/10 transition-all">
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-[12px] font-medium w-4 text-center">{q}</span>
                        <button onClick={() => setQty(d.name, q + 1, d.price)}
                          className="w-7 h-7 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                          <Plus size={10} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setQty(d.name, 1, d.price)}
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
