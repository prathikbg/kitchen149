import { useState, useEffect, useRef } from 'react';
import { Flame, Gamepad2, BookOpen, Monitor, Moon, HardHat } from 'lucide-react';

// ─── Heat Level ─── (moved to top, now functional)
const heatLevels = [
  { label: 'Mild', peppers: 1, desc: 'Gentle warmth for easy eaters', dishes: ['Classic Jeera Rice', 'Egg Fried Rice', 'Veg Maggi', 'Bread Omelette'] },
  { label: 'Medium', peppers: 2, desc: 'Nice kick, still comfortable', dishes: ['Chilli Chicken', 'Chilli Paneer', 'Hakka Noodles', 'Manchurian Gravy'] },
  { label: 'Schezwan', peppers: 3, desc: 'Bring the fire. Bold flavour.', dishes: ['Schezwan Noodles', 'Schezwan Chicken Fried Rice', 'Chicken 65', 'Byadgi Burn Omelette'] },
  { label: 'Regret Tomorrow', peppers: 4, desc: 'Not for the weak. Extreme heat.', dishes: ['Crispy Chicken Pepper Fry', 'Chilli Garlic Chicken Noodles', 'Special Ghee Chicken Dry', 'Spicy Chilli Chicken Maggi'] },
];

function HeatSelector() {
  const [active, setActive] = useState(1);
  const level = heatLevels[active];

  return (
    <div className="mb-10 max-w-[600px] mx-auto">
      <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium mb-4 text-center">Pick Your Heat</p>

      {/* Heat buttons */}
      <div className="flex justify-center gap-2 mb-5">
        {heatLevels.map((h, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl transition-all border"
            style={{
              borderColor: i === active ? '#E11D4860' : '#ffffff10',
              background: i === active ? '#E11D4810' : '#111111',
            }}
          >
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, j) => (
                <Flame
                  key={j}
                  size={14}
                  style={{
                    color: j < h.peppers
                      ? i === active ? '#E11D48' : '#E11D4880'
                      : '#ffffff15',
                  }}
                />
              ))}
            </div>
            <span className={`text-[10px] tracking-wide font-medium ${i === active ? 'text-white' : 'text-[#A3A3A3]'}`}>
              {h.label}
            </span>
          </button>
        ))}
      </div>

      {/* Active level info + dish suggestions */}
      <div
        className="p-4 rounded-xl border transition-all"
        style={{ borderColor: '#E11D4820', background: '#111111' }}
      >
        <p className="text-[#A3A3A3] text-[12px] text-center mb-3">{level.desc}</p>
        <p className="text-[9px] tracking-[0.2em] text-[#E11D48] uppercase mb-2 text-center">Recommended For You</p>
        <div className="flex flex-wrap justify-center gap-2">
          {level.dishes.map((d, i) => (
            <span
              key={i}
              className="text-[11px] text-white px-3 py-1.5 rounded-full"
              style={{ background: '#0A0A0A', border: '1px solid #ffffff08' }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Live Clock ───
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const h = time.getHours();
  const isOpen = h >= 18 || h < 2;
  const fmt = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#111] border border-[#E11D48]/15">
        <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-[#E11D48] animate-pulse' : 'bg-[#A3A3A3]'}`} />
        <span className="text-[11px] tracking-[0.15em] text-[#A3A3A3] uppercase">
          {isOpen ? 'Kitchen 149 is cooking right now' : 'We open at 6 PM'}
        </span>
      </div>
      <p className="text-white text-[42px] sm:text-[56px] font-bold tracking-tight mt-4 tabular-nums">
        {fmt(h > 12 ? h - 12 : h === 0 ? 12 : h)}:{fmt(time.getMinutes())}
        <span className="text-[#A3A3A3] text-[16px] ml-1 font-normal">{h >= 12 ? 'PM' : 'AM'}</span>
      </p>
    </div>
  );
}

// ─── Social Proof ───
const fakeOrders = [
  { emoji: '\u{1F43A}', from: 'HSR', dish: 'Schezwan Noodles' },
  { emoji: '\u{1F989}', from: 'BTM', dish: 'Chilli Chicken' },
  { emoji: '\u{1F43A}', from: 'Bommanahalli', dish: 'Late Night Saver Box' },
  { emoji: '\u{1F989}', from: 'Electronic City', dish: 'Hakka Noodles' },
  { emoji: '\u{1F43A}', from: 'Koramangala', dish: 'Chicken Lollypop' },
  { emoji: '\u{1F989}', from: 'HSR', dish: 'Burnt Garlic Fried Rice' },
];

function SocialProof() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const i = setInterval(() => setIdx(p => (p + 1) % fakeOrders.length), 3000); return () => clearInterval(i); }, []);
  const order = fakeOrders[idx];
  return (
    <div className="text-center mb-10">
      <p className="text-[10px] tracking-[0.3em] text-[#A3A3A3]/50 uppercase mb-3">Who&apos;s Ordering Right Now</p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/[0.04] transition-all">
        <span className="text-lg">{order.emoji}</span>
        <span className="text-[12px] text-[#A3A3A3]">Someone from <span className="text-white">{order.from}</span> just ordered <span className="text-[#E11D48]">{order.dish}</span></span>
      </div>
    </div>
  );
}

// ─── Timeline ───
const timeline = [
  { time: '10 PM', label: 'Dinner Ends', active: false },
  { time: '11 PM', label: 'Hunger Returns', active: false },
  { time: '12 AM', label: 'You Ignore It', active: false },
  { time: '1 AM', label: 'Kitchen 149 Appears', active: true },
];

function NightTimeline() {
  return (
    <div className="mb-10 max-w-[600px] mx-auto">
      <p className="text-[10px] tracking-[0.3em] text-[#A3A3A3]/50 uppercase mb-4 text-center">The Night Craving Timeline</p>
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.06] -translate-y-1/2" />
        {timeline.map((t, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-1">
            <div className={`w-3 h-3 rounded-full border-2 ${t.active ? 'bg-[#E11D48] border-[#E11D48]' : 'bg-[#0A0A0A] border-white/20'}`} />
            <span className={`text-[9px] mt-1 ${t.active ? 'text-[#E11D48]' : 'text-[#A3A3A3]/50'}`}>{t.time}</span>
            <span className={`text-[8px] text-center max-w-[60px] ${t.active ? 'text-white' : 'text-[#A3A3A3]/40'}`}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Night Tribe ───
const tribes = [
  { icon: Gamepad2, label: 'Gamers', pct: '35%' },
  { icon: Monitor, label: 'Developers', pct: '28%' },
  { icon: BookOpen, label: 'Students', pct: '20%' },
  { icon: Moon, label: 'Binge Watchers', pct: '12%' },
  { icon: HardHat, label: 'Night Shift', pct: '5%' },
];

function NightTribe() {
  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] text-[#A3A3A3]/50 uppercase mb-4 text-center">The Bengaluru Night Tribe</p>
      <div className="flex justify-center gap-4 flex-wrap">
        {tribes.map((t, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-[#111] border border-white/[0.04] flex items-center justify-center">
              <t.icon size={16} className="text-[#E11D48]/60" />
            </div>
            <span className="text-[10px] text-[#A3A3A3]">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ───
export default function NightHub() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#0A0A0A] py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Wok Image Banner */}
          <div className="relative rounded-2xl overflow-hidden mb-12 h-[200px] sm:h-[260px]">
            <img src="/images/wok-action.jpg" alt="Wok action" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8">
              <div>
                <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium mb-1">Signature Wok</p>
                <h3 className="text-white text-xl sm:text-2xl font-bold">High Heat. Fresh Toss.</h3>
                <p className="text-[#A3A3A3] text-[12px] mt-1 max-w-[300px]">Every dish hits the wok at 300°C. That&apos;s the secret.</p>
              </div>
            </div>
          </div>

          {/* 1. HEAT SELECTOR — moved to top, now functional */}
          <HeatSelector />

          {/* 2. LIVE CLOCK */}
          <LiveClock />

          {/* 3. SOCIAL PROOF */}
          <SocialProof />

          {/* 4. TIMELINE */}
          <NightTimeline />

          {/* 5. NIGHT TRIBE */}
          <NightTribe />
        </div>
      </div>
    </section>
  );
}
