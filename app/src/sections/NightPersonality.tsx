import { useState, useRef, useEffect } from 'react';

const personalities = {
  wolf: {
    emoji: '\u{1F43A}',
    name: 'Hungry Wolf',
    tagline: 'The feast begins.',
    traits: ['Large Portions', 'Combo Meals', 'Extra Protein'],
    dishes: [
      { n: 'Chilli Chicken + Fried Rice', p: '\u20B9299', desc: 'Full combo. No compromises.', img: '/images/dish-chilli-chicken.jpg' },
      { n: 'Late Night Saver Box', p: '\u20B9249', desc: 'Rice + kebabs + sherva. Everything.', img: '/images/dish-garlic-rice.jpg' },
      { n: 'Chicken Lollypop [8pcs]', p: '\u20B9299', desc: 'Go big or go home.', img: '/images/dish-lollypop.jpg' },
    ],
    color: '#E11D48',
  },
  owl: {
    emoji: '\u{1F989}',
    name: 'Night Owl',
    tagline: 'Light & focused.',
    traits: ['Light Meals', 'Fried Rice Bowls', 'Quick Snacks'],
    dishes: [
      { n: 'Egg Fried Rice', p: '\u20B9149', desc: 'Light fuel for late-night focus.', img: '/images/dish-egg-rice.jpg' },
      { n: 'Classic Bread Omelette', p: '\u20B9129', desc: 'Quick comfort. Done right.', img: '/images/dish-bread-omelette.jpg' },
      { n: 'Hakka Noodles', p: '\u20B9199', desc: 'Slurp-worthy. Code-friendly.', img: '/images/dish-hakka-noodles.jpg' },
    ],
    color: '#E11D48',
  },
};

export default function NightPersonality() {
  const [active, setActive] = useState<'wolf' | 'owl'>('wolf');
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const p = personalities[active];

  return (
    <section ref={ref} className="w-full bg-[#0A0A0A] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className={`text-center mb-10 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium mb-2">Find Your Vibe</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Choose Your Night Personality</h2>
        </div>

        {/* Toggle */}
        <div className={`flex justify-center mb-10 transition-all duration-500 delay-100 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex bg-[#111] rounded-full p-1 border border-white/[0.04]">
            <button onClick={() => setActive('wolf')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.1em] transition-all ${
                active === 'wolf' ? 'bg-[#E11D48] text-white' : 'text-[#A3A3A3] hover:text-white'
              }`}>
              <span>&#x1F43A;</span> HUNGRY WOLF
            </button>
            <button onClick={() => setActive('owl')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-[0.1em] transition-all ${
                active === 'owl' ? 'bg-[#E11D48] text-white' : 'text-[#A3A3A3] hover:text-white'
              }`}>
              <span>&#x1F989;</span> NIGHT OWL
            </button>
          </div>
        </div>

        {/* Traits */}
        <div className={`flex justify-center gap-3 mb-8 transition-all duration-500 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {p.traits.map((t, i) => (
            <span key={i} className="text-[10px] tracking-[0.1em] text-[#A3A3A3] px-3 py-1.5 rounded-full border border-white/[0.06] bg-[#111]">
              {t}
            </span>
          ))}
        </div>

        {/* Dishes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {p.dishes.map((d, i) => (
            <div key={`${active}-${i}`}
              className={`bg-[#111] rounded-2xl overflow-hidden border border-white/[0.04] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}>
              <div className="h-[160px] overflow-hidden relative">
                <img src={d.img} alt={d.n} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>
              <div className="p-4 -mt-3 relative">
                <h3 className="text-white text-[14px] font-semibold">{d.n}</h3>
                <p className="text-[#A3A3A3] text-[11px] mt-0.5">{d.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#E11D48] text-[16px] font-bold">{d.p}</span>
                  <span className="text-[18px]">{p.emoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
