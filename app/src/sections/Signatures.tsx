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
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.01, rootMargin: '300px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    // Safety fallback: ensure menu is visible even if the observer never fires
    // (iOS Safari can miss intersections in some hash-scroll / restored-scroll edge cases)
    const t = setTimeout(() => setVisible(true), 600);
    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  const filtered = activeCat === 'All' ? dishes : dishes.filter(d => d.cat === activeCat);

  return (
    <section ref={ref} id="menu" className="w-full bg-[#0A0A0A] py-20 relative overflow-hidden">
      {/* Background illustration */}
      <div className="absolute top-20 right-0 w-[200px] md:w-[300px] opacity-10 pointer-events-none z-0 animate-float">
        <img src="/images/chef-wok-line.png" alt="" className="w-full h-auto" style={{ filter: 'drop-shadow(0 0 20px rgba(225,29,72,0.5))' }} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E11D48]/20 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center gap-3 mb-3">
            <Flame size={18} className="text-[#E11D48]" />
            <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold">Full Menu</p>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E11D48]/30 to-transparent" />
          </div>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Every Dish From The Wok</h2>
          <p className="text-[#A3A3A3] text-[14px] mt-2">{dishes.length} items · Hover for ingredients</p>
        </div>

        {/* Category Filter */}
        <div className={`flex gap-2.5 mb-10 flex-wrap transition-all duration-700 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {categories.map((c) => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`px-6 py-2.5 rounded-full text-[11px] tracking-[0.15em] font-semibold transition-all border ${
                c === activeCat
                  ? 'bg-[#E11D48] text-white border-[#E11D48] shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                  : 'text-[#A3A3A3] border-white/[0.06] hover:border-[#E11D48]/30 hover:text-white'
              }`}>
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                {/* Image area with tap/hover ingredients overlay */}
                <button
                  type="button"
                  onClick={() => setHoveredIdx(prev => (prev === i ? null : i))}
                  aria-expanded={isHovered}
                  aria-label={isHovered ? `Hide ingredients for ${d.name}` : `Show ingredients for ${d.name}`}
                  className="relative h-[180px] w-full block overflow-hidden cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48]/60"
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-500"
                    style={{ transform: isHovered ? 'scale(0.85)' : 'scale(1)' }}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src.indexOf('/images/dish-bread-omelette.jpg') === -1) {
                        img.src = '/images/dish-bread-omelette.jpg';
                      }
                    }}
                  />
                  {/* Darken on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />

                  {/* Ingredients overlay on hover/tap */}
                  {isHovered && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 animate-fade-in">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <Flame size={14} className="text-[#E11D48]" />
                        <span className="text-[10px] tracking-[0.2em] text-[#E11D48] uppercase font-bold">What Goes In</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {d.ingredients.map((ing, j) => (
                          <span key={j} className="text-[11px] text-white px-2.5 py-0.5 rounded-full bg-[#E11D48]/20 border border-[#E11D48]/15">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hot badge */}
                  {d.hot && (
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E11D48]/90 text-white text-[9px] tracking-wider uppercase font-bold z-10">
                      <Flame size={9} /> Hot
                    </div>
                  )}

                  {/* Price tag */}
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-[#0A0A0A]/80 backdrop-blur-sm z-10">
                    <span className="text-[#E11D48] text-[15px] font-bold">{`\u20B9${d.price}`}</span>
                  </div>

                  {/* Tap/hover hint */}
                  {!isHovered && (
                    <div className="absolute bottom-2.5 left-2.5 text-[9px] text-[#A3A3A3]/60 tracking-wider uppercase sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <span className="sm:hidden">Tap for ingredients</span>
                      <span className="hidden sm:inline">Hover for ingredients</span>
                    </div>
                  )}
                </button>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-white text-[15px] font-semibold group-hover:text-[#E11D48] transition-colors leading-snug">{d.name}</h3>
                  <p className="text-[#A3A3A3] text-[12px] mt-1 leading-relaxed">{d.desc}</p>

                  <div className="flex items-center justify-end mt-3">
                    {q > 0 ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(d.name, q - 1, d.price)}
                          className="w-8 h-8 rounded-full border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48] hover:bg-[#E11D48]/10 transition-all">
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-[14px] font-medium w-5 text-center">{q}</span>
                        <button onClick={() => setQty(d.name, q + 1, d.price)}
                          className="w-8 h-8 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setQty(d.name, 1, d.price)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E11D48]/30 text-[#E11D48] text-[11px] tracking-wider uppercase font-semibold hover:bg-[#E11D48] hover:text-white hover:border-[#E11D48] transition-all hover:shadow-[0_0_10px_rgba(225,29,72,0.3)]">
                        <Plus size={12} /> Add
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
