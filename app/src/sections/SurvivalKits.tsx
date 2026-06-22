import { useRef, useEffect, useState } from 'react';
import { Flame, Gamepad2, BookOpen } from 'lucide-react';

const kits = [
  {
    icon: Flame,
    name: 'Coding Combo',
    desc: 'For the 3 AM debugging sessions.',
    items: ['Schezwan Noodles', 'Chilli Chicken', 'Cheesy Garlic Maggi'],
    price: '\u20B9349',
    tag: 'Bestseller',
    color: '#E11D48',
  },
  {
    icon: Gamepad2,
    name: 'Gamer Pack',
    desc: 'Fuel for marathon gaming nights.',
    items: ['Chicken Lollypop', 'Chicken 65', 'Masala Egg Maggi'],
    price: '\u20B9399',
    tag: 'Popular',
    color: '#E11D48',
  },
  {
    icon: BookOpen,
    name: 'Exam Night Box',
    desc: 'Brain food for all-nighters.',
    items: ['Egg Fried Rice', 'Gobi Manchurian', 'Spicy Chilli Chicken Maggi'],
    price: '\u20B9299',
    tag: 'Student Fav',
    color: '#E11D48',
  },
];

export default function SurvivalKits() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="kits" className="w-full bg-[#0A0A0A] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`text-center mb-12 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-3">Bundle Up</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Midnight Survival Kits</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[1200px] mx-auto">
          {kits.map((kit, i) => (
            <div key={i}
              className={`group relative bg-[#111] rounded-2xl p-7 border border-white/[0.04] hover:border-[#E11D48]/20 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              {/* Tag */}
              <span className="absolute top-5 right-5 text-[10px] tracking-[0.15em] text-[#E11D48] uppercase px-2.5 py-1 rounded-full border border-[#E11D48]/20 bg-[#E11D48]/5 font-semibold">
                {kit.tag}
              </span>

              <div className="w-12 h-12 rounded-full bg-[#E11D48]/10 flex items-center justify-center mb-5">
                <kit.icon size={22} className="text-[#E11D48]" />
              </div>

              <h3 className="text-white text-[20px] font-bold mb-1.5">{kit.name}</h3>
              <p className="text-[#A3A3A3] text-[14px] mb-5">{kit.desc}</p>

              {/* Items */}
              <div className="space-y-2.5 mb-6">
                {kit.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]/40" />
                    <span className="text-[14px] text-[#A3A3A3]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-[#E11D48] text-[24px] font-bold">{kit.price}</span>
                <a href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#E11D48] hover:bg-[#BE123C] text-white text-[12px] font-bold tracking-[0.15em] rounded-full transition-all">
                  GRAB IT
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
