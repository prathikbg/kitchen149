import { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';
import { getKitchenStatus } from '@/lib/kitchenHours';

const orderOptions = [
  {
    icon: Phone,
    label: 'Call Us',
    desc: '+91 79755 93357',
    href: 'tel:+917975593357',
    color: '#E11D48', // brand red
    speed: '\u26A1 FASTEST',
    speedDesc: 'Instant order. Direct to kitchen.',
    external: false,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    desc: 'Chat to order',
    href: 'https://wa.me/917975593357',
    color: '#22C55E', // WhatsApp green
    speed: '\u{1F4AC} ~5 MIN',
    speedDesc: 'Reply with menu & confirm.',
    external: true,
  },
  {
    icon: ShoppingBag,
    label: 'Swiggy',
    desc: 'Order online',
    href: 'https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005',
    color: '#FC8019', // Swiggy orange
    speed: '\u{1F6F5} ~30 MIN',
    speedDesc: 'Doorstep delivery, full menu.',
    external: true,
  },
];

export default function HungryWeGotYou() {
  const [status, setStatus] = useState(() => getKitchenStatus());
  useEffect(() => {
    const i = setInterval(() => setStatus(getKitchenStatus()), 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Ambient red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(225,29,72,0.08)', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 py-24 sm:py-28 text-center">
        {/* Live status pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border mb-7 animate-fade-up"
          style={{ borderColor: `${status.color}40`, background: `${status.color}10` }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: status.color, animation: status.isOpen ? 'neon-pulse 1.6s ease-in-out infinite' : 'none' }}
          />
          <span className="text-[12px] tracking-[0.2em] uppercase font-bold" style={{ color: status.color }}>
            {status.label}
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-bold tracking-tight text-white animate-fade-up"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textShadow: '0 0 40px rgba(225,29,72,0.25)', animationDelay: '60ms' }}
        >
          Hungry?
          <br />
          <span
            className="text-[#E11D48]"
            style={{ textShadow: '0 0 20px rgba(225,29,72,0.5), 0 0 40px rgba(225,29,72,0.2)' }}
          >
            We Got You.
          </span>
        </h2>

        <p
          className="mt-5 max-w-[460px] mx-auto text-[#A3A3A3] text-[15px] animate-fade-up"
          style={{ letterSpacing: '0.02em', animationDelay: '120ms' }}
        >
          Three ways to get your midnight fix. Pick the fastest.
        </p>

        {/* Option cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12 max-w-[1100px] mx-auto">
          {orderOptions.map((opt, i) => (
            <a
              key={opt.label}
              href={opt.href}
              target={opt.external ? '_blank' : undefined}
              rel={opt.external ? 'noopener noreferrer' : undefined}
              className="group relative flex flex-col items-start text-left gap-4 p-6 rounded-2xl border bg-[#111] transition-all hover:-translate-y-1 animate-fade-up"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                animationDelay: `${180 + i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${opt.color}60`;
                el.style.boxShadow = `0 0 32px ${opt.color}30, inset 0 0 20px ${opt.color}10`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top color bar */}
              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${opt.color}, transparent)` }}
              />

              {/* Speed badge */}
              <span
                className="text-[11px] tracking-[0.15em] font-bold px-2.5 py-1 rounded-full border"
                style={{ color: opt.color, borderColor: `${opt.color}40`, background: `${opt.color}10` }}
              >
                {opt.speed}
              </span>

              {/* Icon + label */}
              <div className="flex items-center gap-3.5 w-full">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${opt.color}15`, boxShadow: `0 0 12px ${opt.color}25` }}
                >
                  <opt.icon size={24} style={{ color: opt.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-[18px] font-bold">{opt.label}</p>
                  <p className="text-[#A3A3A3] text-[13px]">{opt.desc}</p>
                </div>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A3A3A3" strokeWidth="2"
                  className="flex-shrink-0 transition-all group-hover:translate-x-1"
                  style={{ stroke: 'currentColor', color: opt.color }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Speed description */}
              <p className="text-[13px] text-[#A3A3A3]/70 leading-snug">{opt.speedDesc}</p>
            </a>
          ))}
        </div>

        {/* Secondary: view full menu */}
        <a
          href="#menu"
          className="inline-flex items-center gap-2 mt-10 text-[12px] tracking-[0.15em] uppercase text-[#A3A3A3] hover:text-white transition-colors animate-fade-up font-semibold"
          style={{ animationDelay: '440ms' }}
        >
          Not sure yet? Browse the full menu
          <span className="text-[#E11D48]">&rarr;</span>
        </a>
      </div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(225,29,72,0.4), transparent)' }}
      />
    </section>
  );
}
