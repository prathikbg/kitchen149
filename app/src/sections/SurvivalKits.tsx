import { useRef, useEffect, useState } from 'react';
import { Flame, Gamepad2, BookOpen, Check, Plus } from 'lucide-react';
import { getDishes } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';

const kits = [
  {
    icon: Flame,
    name: 'Coding Combo',
    desc: 'For the 3 AM debugging sessions.',
    dishIds: ['schezwan-noodles', 'chilli-chicken', 'cheesy-garlic-maggi'],
    tag: 'Bestseller',
  },
  {
    icon: Gamepad2,
    name: 'Gamer Pack',
    desc: 'Fuel for marathon gaming nights.',
    dishIds: ['chicken-lollypop', 'classic-chicken-65', 'masala-egg-maggi'],
    tag: 'Popular',
  },
  {
    icon: BookOpen,
    name: 'Exam Night Box',
    desc: 'Brain food for all-nighters.',
    dishIds: ['egg-fried-rice', 'gobi-manchurian', 'spicy-chilli-chicken-maggi'],
    tag: 'Student Fav',
  },
];

export default function SurvivalKits() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const { setQty, getQty } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleGrab = (kitIdx: number, dishIds: string[]) => {
    const dishes = getDishes(dishIds);
    dishes.forEach((d) => {
      setQty(d.name, getQty(d.name) + 1, d.price);
    });
    setJustAdded(kitIdx);
    setTimeout(() => setJustAdded((v) => (v === kitIdx ? null : v)), 1800);
  };

  return (
    <section ref={ref} id="kits" className="w-full bg-[#0A0A0A] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`text-center mb-12 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-3">Bundle Up</p>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Midnight Survival Kits</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[1200px] mx-auto">
          {kits.map((kit, i) => {
            const dishes = getDishes(kit.dishIds);
            const total = dishes.reduce((s, d) => s + d.price, 0);
            const added = justAdded === i;
            return (
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
                {dishes.map((d) => (
                  <div key={d.id} className="flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]/40 flex-shrink-0" />
                      <span className="text-[14px] text-[#A3A3A3] truncate">{d.name}</span>
                    </div>
                    <span className="text-[12px] text-[#A3A3A3]/60 font-medium flex-shrink-0">₹{d.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-[#E11D48] text-[24px] font-bold">₹{total}</span>
                <button
                  type="button"
                  onClick={() => handleGrab(i, kit.dishIds)}
                  aria-label={added ? `${kit.name} added to order` : `Add ${kit.name} to order`}
                  className={`flex items-center gap-1.5 px-6 py-2.5 text-white text-[12px] font-bold tracking-[0.15em] rounded-full transition-all ${
                    added
                      ? 'bg-[#16A34A] hover:bg-[#15803D] shadow-[0_0_15px_rgba(22,163,74,0.4)]'
                      : 'bg-[#E11D48] hover:bg-[#BE123C] shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                  }`}
                >
                  {added ? (<><Check size={14} /> ADDED</>) : (<><Plus size={14} /> GRAB IT</>)}
                </button>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
  );
}
