import { useState, useEffect, useRef, useMemo } from 'react';
import { Flame, Gamepad2, BookOpen, Monitor, Moon, HardHat, Plus, Minus, ShoppingBag } from 'lucide-react';
import { getDishes } from '@/data/menu';
import { useCart } from '@/contexts/CartContext';
import { getKitchenStatus } from '@/lib/kitchenHours';

// ─── Heat Level ─── (functional: wired to real menu, clickable, themed)
const heatLevels = [
  {
    label: 'Mild', peppers: 1, color: '#FACC15',
    desc: 'Gentle warmth for easy eaters.',
    badge: null as string | null,
    dishes: ['classic-jeera-rice', 'egg-fried-rice', 'classic-veg-maggi', 'classic-bread-omelette'],
  },
  {
    label: 'Medium', peppers: 2, color: '#FB923C',
    desc: 'Nice kick, still comfortable.',
    badge: null,
    dishes: ['chilli-chicken', 'chilli-paneer', 'hakka-chicken-noodles', 'chicken-manchurian'],
  },
  {
    label: 'Schezwan', peppers: 3, color: '#EF4444',
    desc: 'Bring the fire. Bold flavour.',
    badge: '🌶️ Hot',
    dishes: ['schezwan-noodles', 'schezwan-chicken-fried-rice', 'classic-chicken-65', 'byadgi-burn-protein-omelette'],
  },
  {
    label: 'Regret Tomorrow', peppers: 4, color: '#B91C1C',
    desc: 'Not for the weak. Extreme heat.',
    badge: '⚠️ Order water with this',
    dishes: ['crispy-chicken-pepper-fry', 'chilli-garlic-chicken-noodles', 'special-ghee-chicken-dry', 'spicy-chilli-chicken-maggi'],
  },
];

function HeatSelector() {
  const [active, setActive] = useState(1);
  const { getQty, setQty } = useCart();
  const level = heatLevels[active];
  const dishes = useMemo(() => getDishes(level.dishes), [level.dishes]);
  const comboTotal = dishes.reduce((s, d) => s + d.price, 0);

  const addCombo = () => {
    dishes.forEach((d) => setQty(d.id, getQty(d.id) + 1, d));
  };

  return (
    <div className="mb-12 max-w-[1000px] mx-auto">
      <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-5 text-center">Pick Your Heat</p>

      {/* Heat buttons — heat-themed color per level */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        {heatLevels.map((h, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-2 px-5 py-3.5 rounded-xl transition-all border hover:-translate-y-0.5"
              style={{
                borderColor: isActive ? h.color : '#ffffff10',
                background: isActive ? `${h.color}15` : '#111111',
                boxShadow: isActive ? `0 0 24px ${h.color}40, inset 0 0 12px ${h.color}10` : 'none',
              }}
              aria-pressed={isActive}
            >
              <div className="flex gap-0.5">
                {[...Array(4)].map((_, j) => {
                  const lit = j < h.peppers;
                  return (
                    <Flame
                      key={j}
                      size={16}
                      className={isActive && lit ? 'animate-flame-flicker' : ''}
                      style={{
                        color: lit ? (isActive ? h.color : `${h.color}80`) : '#ffffff15',
                        filter: isActive && lit ? `drop-shadow(0 0 6px ${h.color})` : 'none',
                        animationDelay: `${j * 0.12}s`,
                      }}
                    />
                  );
                })}
              </div>
              <span className={`text-[12px] tracking-wide font-semibold ${isActive ? 'text-white' : 'text-[#A3A3A3]'}`}>
                {h.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active level info + dish thumbnail cards */}
      <div
        key={`heat-${active}`}
        className="p-5 sm:p-7 rounded-2xl border transition-all animate-fade-up"
        style={{
          borderColor: `${level.color}40`,
          background: '#111111',
          boxShadow: `inset 0 0 32px ${level.color}10`,
        }}
      >
        <p className="text-[#A3A3A3] text-[14px] text-center mb-1.5">{level.desc}</p>
        {level.badge && (
          <p className="text-[13px] font-semibold text-center mb-4" style={{ color: level.color }}>
            {level.badge}
          </p>
        )}
        <p className="text-[10px] tracking-[0.25em] uppercase mb-4 text-center font-semibold" style={{ color: level.color }}>
          Recommended For You
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {dishes.map((d, i) => {
            const q = getQty(d.id);
            return (
              <div
                key={d.id}
                className="bg-[#0A0A0A] rounded-xl overflow-hidden border animate-fade-up"
                style={{ borderColor: `${level.color}25`, animationDelay: `${i * 60}ms` }}
              >
                <div className="h-[110px] overflow-hidden relative">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </div>
                <div className="p-3">
                  <h4 className="text-white text-[13px] font-semibold leading-tight line-clamp-2 min-h-[34px]">{d.name}</h4>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[14px] font-bold" style={{ color: level.color }}>{`\u20B9${d.price}`}</span>
                    {q > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setQty(d.id, q - 1)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center transition-all"
                          style={{ borderColor: `${level.color}50`, color: level.color }}
                          aria-label="Decrease"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-white text-[12px] font-semibold w-4 text-center">{q}</span>
                        <button
                          onClick={() => setQty(d.id, q + 1, d)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all"
                          style={{ backgroundColor: level.color, boxShadow: `0 0 8px ${level.color}50` }}
                          aria-label="Increase"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setQty(d.id, 1, d)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-[10px] tracking-wider uppercase font-semibold transition-all"
                        style={{ borderColor: `${level.color}50`, color: level.color }}
                      >
                        <Plus size={10} /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order combo CTA */}
        <div className="flex justify-center mt-6">
          <button
            onClick={addCombo}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white text-[12px] font-bold uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: level.color,
              boxShadow: `0 0 20px ${level.color}60, 0 0 40px ${level.color}30`,
            }}
          >
            <ShoppingBag size={14} />
            Order Heat Combo
            <span className="opacity-60">·</span>
            <span>{`\u20B9${comboTotal}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Live Clock + Countdown ─── (combined hero panel)
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(i); }, []);
  const status = getKitchenStatus(time);
  const h = time.getHours();
  const fmt = (n: number) => n.toString().padStart(2, '0');
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const ampm = h >= 12 ? 'PM' : 'AM';

  return (
    <div className="mb-12 max-w-[760px] mx-auto">
      <div
        className="relative rounded-2xl border bg-[#111] p-6 sm:p-8 overflow-hidden transition-all"
        style={{
          borderColor: `${status.color}30`,
          boxShadow: status.isOpen ? `0 0 32px ${status.color}25, inset 0 0 24px ${status.color}08` : 'inset 0 0 24px rgba(255,255,255,0.02)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `${status.color}20`, filter: 'blur(60px)' }}
        />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-5 sm:gap-6">
          {/* Big time */}
          <div className="text-center sm:text-left">
            <p className="text-[11px] tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color: status.color }}>
              Bengaluru · Live
            </p>
            <p className="text-white text-[52px] sm:text-[72px] font-bold tracking-tight tabular-nums leading-none">
              {fmt(hour12)}:{fmt(time.getMinutes())}
              <span className="text-[#A3A3A3] text-[22px] ml-2 font-normal">{ampm}</span>
            </p>
          </div>

          {/* Status pill + countdown */}
          <div
            className="rounded-xl px-5 py-3.5 border text-center sm:text-right min-w-[210px]"
            style={{ borderColor: `${status.color}30`, background: `${status.color}10` }}
          >
            <div className="flex items-center justify-center sm:justify-end gap-2 mb-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: status.color,
                  animation: status.isOpen ? 'neon-pulse 1.6s ease-in-out infinite' : 'none',
                }}
              />
              <span className="text-[12px] tracking-[0.15em] uppercase font-bold" style={{ color: status.color }}>
                {status.label}
              </span>
            </div>
            <p className="text-[#A3A3A3] text-[13px]">{status.sub}</p>
          </div>
        </div>
      </div>

      {/* Red neon string lights — hand-strung beneath the panel */}
      <NeonStringLights count={22} />
    </div>
  );
}

// ─── Red neon string lights (decorative) ───
function NeonStringLights({ count = 20 }: { count?: number }) {
  // Bulbs hang along a parabolic droop curve so they look strung, not stamped.
  // y(t) = 4 * droop * t * (1 - t), t in [0,1]
  const droop = 14;
  return (
    <div className="relative mt-4 sm:mt-5 pointer-events-none select-none" aria-hidden="true">
      {/* Subtle wire */}
      <svg
        viewBox="0 0 600 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-[3px] w-full h-[20px]"
      >
        <path
          d={`M 0 1 Q 300 ${1 + droop * 2} 600 1`}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
      <div className="relative flex justify-between items-start px-1">
        {Array.from({ length: count }).map((_, i) => {
          const t = count > 1 ? i / (count - 1) : 0.5;
          const y = 4 * droop * t * (1 - t);
          return (
            <span key={i} className="relative inline-block" style={{ transform: `translateY(${y}px)` }}>
              {/* Tiny cap connecting bulb to wire */}
              <span
                className="absolute left-1/2 -top-[3px] w-[1px] h-[4px] -translate-x-1/2"
                style={{ background: 'rgba(255,255,255,0.18)' }}
              />
              {/* Bulb */}
              <span
                className="block w-[7px] h-[7px] rounded-full bulb-twinkle"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #ff8a96 0%, #E11D48 55%, #7f1029 100%)',
                  animationDelay: `${(i * 0.17) % 2.4}s`,
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Social Proof (multi-line live ticker) ───
const fakeOrders = [
  { emoji: '\u{1F43A}', from: 'HSR', dish: 'Schezwan Noodles', ago: 'just now' },
  { emoji: '\u{1F989}', from: 'BTM', dish: 'Chilli Chicken', ago: '32s ago' },
  { emoji: '\u{1F336}', from: 'Bommanahalli', dish: 'Late Night Saver Box', ago: '1m ago' },
  { emoji: '\u{1F33F}', from: 'Electronic City', dish: 'Hakka Chicken Noodles', ago: '2m ago' },
  { emoji: '\u{1F43A}', from: 'Koramangala', dish: 'Chicken Lollypop', ago: '3m ago' },
  { emoji: '\u{1F989}', from: 'HSR', dish: 'Burnt Garlic Fried Rice', ago: '4m ago' },
  { emoji: '\u{1F336}', from: 'Sarjapur', dish: 'Spicy Chilli Chicken Maggi', ago: '5m ago' },
];

function SocialProof() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { const i = setInterval(() => setIdx((p) => (p + 1) % fakeOrders.length), 2800); return () => clearInterval(i); }, []);

  // Render a stacked feed of 3 — newest at top, opacity fades for older
  const visible = [0, 1, 2].map((offset) => fakeOrders[(idx + offset) % fakeOrders.length]);

  return (
    <div className="mb-12 max-w-[640px] mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
        <p className="text-[11px] tracking-[0.3em] text-[#A3A3A3] uppercase font-semibold">Ordering Right Now</p>
      </div>
      <div className="space-y-2.5">
        {visible.map((o, i) => (
          <div
            key={`${idx}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#111] border border-white/[0.04] animate-fade-up"
            style={{ opacity: i === 0 ? 1 : i === 1 ? 0.7 : 0.4, animationDelay: `${i * 80}ms` }}
          >
            <span className="text-[22px]">{o.emoji}</span>
            <span className="text-[13px] text-[#A3A3A3] flex-1">
              <span className="text-[#A3A3A3]/60">Someone in </span>
              <span className="text-white font-semibold">{o.from}</span>
              <span className="text-[#A3A3A3]/60"> ordered </span>
              <span className="text-[#E11D48] font-semibold">{o.dish}</span>
            </span>
            <span className="text-[10px] tracking-wider text-[#A3A3A3]/40 uppercase whitespace-nowrap font-medium">{o.ago}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline (now with story + dramatic punchline) ───
const timeline = [
  { time: '10 PM', label: 'Dinner Ends', sub: 'You think you\u2019re full.', emoji: '\u{1F37D}', active: false },
  { time: '11 PM', label: 'Hunger Returns', sub: 'The craving begins.', emoji: '\u{1F914}', active: false },
  { time: '12 AM', label: 'You Ignore It', sub: 'Maybe just water?', emoji: '\u{1F4A7}', active: false },
  { time: '1 AM', label: 'Kitchen 149 Appears', sub: 'Hot food. One tap away.', emoji: '\u{1F525}', active: true },
];

function NightTimeline() {
  return (
    <div className="mb-12 max-w-[920px] mx-auto">
      <p className="text-[11px] tracking-[0.3em] text-[#A3A3A3]/60 uppercase mb-7 text-center font-semibold">The Night Craving Timeline</p>
      <div className="grid grid-cols-4 gap-3 sm:gap-5 relative">
        <div className="absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-[#E11D48]/40 pointer-events-none" />
        {timeline.map((t, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center gap-2 text-center">
            <div
              className={`flex items-center justify-center rounded-full transition-all ${t.active ? 'w-16 h-16 animate-pulse-glow' : 'w-12 h-12'}`}
              style={{
                background: t.active ? '#E11D48' : '#111',
                border: t.active ? '2px solid #E11D48' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: t.active ? '0 0 24px rgba(225,29,72,0.6)' : 'none',
              }}
            >
              <span className={t.active ? 'text-[26px]' : 'text-[19px] opacity-50 grayscale'}>{t.emoji}</span>
            </div>
            <span className={`text-[12px] tracking-wider font-bold ${t.active ? 'text-[#E11D48]' : 'text-[#A3A3A3]/60'}`}>{t.time}</span>
            <span className={`text-[13px] font-semibold leading-tight ${t.active ? 'text-white' : 'text-[#A3A3A3]/50'}`}>{t.label}</span>
            <span className={`text-[11px] leading-snug max-w-[140px] ${t.active ? 'text-[#A3A3A3]' : 'text-[#A3A3A3]/30'}`}>{t.sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Night Tribe (now shows percentages + proportional sizing) ───
const tribes = [
  { icon: Gamepad2, label: 'Gamers', pct: 35 },
  { icon: Monitor, label: 'Developers', pct: 28 },
  { icon: BookOpen, label: 'Students', pct: 20 },
  { icon: Moon, label: 'Binge Watchers', pct: 12 },
  { icon: HardHat, label: 'Night Shift', pct: 5 },
];

function NightTribe() {
  const maxPct = Math.max(...tribes.map((t) => t.pct));
  return (
    <div>
      <p className="text-[11px] tracking-[0.3em] text-[#A3A3A3]/60 uppercase mb-6 text-center font-semibold">The Bengaluru Night Tribe</p>
      <div className="flex justify-center items-end gap-4 sm:gap-7 flex-wrap">
        {tribes.map((t, i) => {
          const intensity = t.pct / maxPct; // 0–1
          const ring = 40 + Math.round(intensity * 30); // 40px → 70px
          const iconSize = 16 + Math.round(intensity * 12); // 16 → 28
          const opacity = 0.4 + intensity * 0.6; // 0.4 → 1.0
          return (
            <div key={i} className="flex flex-col items-center gap-2">
              <div
                className="rounded-full flex items-center justify-center border transition-all"
                style={{
                  width: `${ring}px`,
                  height: `${ring}px`,
                  background: '#111',
                  borderColor: `rgba(225,29,72,${0.15 + intensity * 0.35})`,
                  boxShadow: `0 0 ${Math.round(intensity * 20)}px rgba(225,29,72,${intensity * 0.3})`,
                }}
              >
                <t.icon size={iconSize} style={{ color: `rgba(225,29,72,${opacity})` }} />
              </div>
              <span className="text-[13px] text-white font-bold tabular-nums">{t.pct}%</span>
              <span className="text-[11px] text-[#A3A3A3]/70 tracking-wide font-medium">{t.label}</span>
            </div>
          );
        })}
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
    <section ref={ref} className="w-full bg-[#0A0A0A] py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className={`transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Wok Image Banner */}
          <div className="relative rounded-2xl overflow-hidden mb-14 h-[240px] sm:h-[320px]">
            <img src="/images/wok-action.jpg" alt="Wok action" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 sm:px-12">
              <div>
                <p className="text-[11px] tracking-[0.3em] text-[#E11D48] uppercase font-semibold mb-2">Signature Wok</p>
                <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">High Heat. Fresh Toss.</h3>
                <p className="text-[#A3A3A3] text-[14px] sm:text-[15px] mt-2 max-w-[420px]">Every dish hits the wok at 300°C. That&apos;s the secret.</p>
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
