import { useState, useRef, useEffect } from 'react';

const hungerLevels = [
  {
    level: 1,
    label: 'Just Peckish',
    emoji: '\u{1F34E}',
    desc: 'A light nibble. Nothing heavy.',
    dishes: [
      { n: 'Classic Veg Maggi', p: '\u20B989', img: '/images/dish-bread-omelette.jpg' },
      { n: 'Classic Jeera Rice', p: '\u20B999', img: '/images/dish-garlic-rice.jpg' },
      { n: 'Zesty Lemon Rice', p: '\u20B999', img: '/images/dish-veg-rice.jpg' },
    ],
  },
  {
    level: 2,
    label: 'Getting Hungry',
    emoji: '\u{1F35C}',
    desc: 'Need something satisfying.',
    dishes: [
      { n: 'Egg Fried Rice', p: '\u20B9149', img: '/images/dish-egg-rice.jpg' },
      { n: 'Schezwan Noodles', p: '\u20B9149', img: '/images/dish-schezwan-noodles.jpg' },
      { n: 'Classic Bread Omelette', p: '\u20B9129', img: '/images/dish-bread-omelette.jpg' },
    ],
  },
  {
    level: 3,
    label: 'Proper Hunger',
    emoji: '\u{1F357}',
    desc: 'Time for a real meal.',
    dishes: [
      { n: 'Chilli Chicken', p: '\u20B9199', img: '/images/dish-chilli-chicken.jpg' },
      { n: 'Chicken Fried Rice', p: '\u20B9199', img: '/images/food-chicken-rice.jpg' },
      { n: 'Hakka Chicken Noodles', p: '\u20B9199', img: '/images/dish-hakka-noodles.jpg' },
    ],
  },
  {
    level: 4,
    label: 'Starving',
    emoji: '\u{1F969}',
    desc: 'Big portions. Full power.',
    dishes: [
      { n: 'Late Night Saver Box', p: '\u20B9249', img: '/images/dish-garlic-rice.jpg' },
      { n: 'Special Ghee Chicken Dry', p: '\u20B9249', img: '/images/food-ghee-chicken.jpg' },
      { n: 'Ultimate Bachelor Box', p: '\u20B9299', img: '/images/food-chicken-rice.jpg' },
    ],
  },
  {
    level: 5,
    label: 'Midnight Crisis',
    emoji: '\u{1F525}',
    desc: 'Emergency mode. Maximum flavour.',
    dishes: [
      { n: 'Wok Box Non Veg', p: '\u20B9249', img: '/images/food-chicken-rice.jpg' },
      { n: 'Chilli Garlic Chicken Noodles', p: '\u20B9199', img: '/images/dish-hakka-noodles.jpg' },
      { n: 'Chicken Lollypop [8pcs]', p: '\u20B9299', img: '/images/dish-lollypop.jpg' },
    ],
  },
];

export default function CravingMeter() {
  const [hunger, setHunger] = useState(2);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = hungerLevels[hunger - 1];

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
          {current.dishes.map((d, i) => (
            <a
              key={`${hunger}-${i}`}
              href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#111] rounded-xl overflow-hidden border border-white/[0.04] hover:border-[#E11D48]/20 transition-all"
            >
              <div className="w-[72px] h-[72px] flex-shrink-0 overflow-hidden">
                <img src={d.img} alt={d.n} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-white text-[13px] font-medium truncate group-hover:text-[#E11D48] transition-colors">{d.n}</p>
                <p className="text-[#E11D48] text-[14px] font-bold mt-0.5">{d.p}</p>
              </div>
            </a>
          ))}
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
