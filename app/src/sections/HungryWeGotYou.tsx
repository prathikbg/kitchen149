import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';

const orderOptions = [
  {
    icon: ShoppingBag,
    label: 'Swiggy',
    desc: 'Order online',
    href: 'https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005',
    color: '#E11D48',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    desc: 'Chat to order',
    href: 'https://wa.me/917975593357',
    color: '#22C55E',
  },
  {
    icon: Phone,
    label: 'Call Us',
    desc: '+91 79755 93357',
    href: 'tel:+917975593357',
    color: '#E11D48',
  },
];

export default function HungryWeGotYou() {
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Also trigger on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasInteracted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = isHovered || hasInteracted;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: active ? '#111111' : '#0A0A0A',
        transition: 'background 0.8s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dark overlay that fades on hover */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: active
            ? 'transparent'
            : 'linear-gradient(to bottom, rgba(10,10,10,0.7), rgba(10,10,10,0.9))',
          transition: 'background 0.8s ease',
        }}
      />

      {/* Ambient red glow that intensifies on hover */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none z-0"
        style={{
          background: active ? 'rgba(225,29,72,0.08)' : 'rgba(225,29,72,0.02)',
          filter: 'blur(100px)',
          transition: 'background 0.8s ease',
        }}
      />

      {/* Content container */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-20 sm:py-28 text-center">
        {/* Main headline - starts dim, brightens on hover */}
        <h2
          className="font-semibold tracking-tight transition-all duration-700"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: active ? '#F5F5F5' : '#F5F5F520',
            textShadow: active
              ? '0 0 40px rgba(225,29,72,0.3)'
              : 'none',
            transition: 'color 0.7s ease, text-shadow 0.7s ease',
          }}
        >
          Hungry?
          <br />
          <span
            className="transition-all duration-700"
            style={{
              color: active ? '#E11D48' : '#E11D4820',
              textShadow: active
                ? '0 0 20px rgba(225,29,72,0.5), 0 0 40px rgba(225,29,72,0.2)'
                : 'none',
            }}
          >
            We Got You.
          </span>
        </h2>

        {/* Subtext */}
        <p
          className="mt-4 max-w-[320px] mx-auto transition-all duration-700"
          style={{
            color: active ? '#A3A3A3' : '#A3A3A320',
            fontSize: '13px',
            letterSpacing: '0.02em',
          }}
        >
          Three ways to get your midnight fix. Choose yours.
        </p>

        {/* Options - hidden/invisible initially, appear on hover */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-700"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(20px)',
            pointerEvents: active ? 'auto' : 'none',
          }}
        >
          {orderOptions.map((opt, i) => (
            <a
              key={i}
              href={opt.href}
              target={opt.label === 'Call Us' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-7 py-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto min-w-[240px]"
              style={{
                borderColor: 'rgba(255,255,255,0.06)',
                background: '#0A0A0A',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${opt.color}40`;
                (e.currentTarget as HTMLElement).style.background = `${opt.color}08`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLElement).style.background = '#0A0A0A';
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{ background: `${opt.color}15` }}
              >
                <opt.icon size={18} style={{ color: opt.color }} />
              </div>
              <div className="text-left">
                <p className="text-white text-[14px] font-semibold">{opt.label}</p>
                <p className="text-[#A3A3A3] text-[11px]">{opt.desc}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#A3A3A3"
                strokeWidth="2"
                className="ml-auto flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:stroke-white"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Hint text - visible only when dim */}
        <p
          className="mt-8 text-[10px] tracking-[0.3em] uppercase transition-all duration-500"
          style={{
            opacity: active ? 0 : 1,
            color: '#E11D4830',
          }}
        >
          Hover to reveal
        </p>
      </div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px transition-all duration-700"
        style={{
          background: active
            ? 'linear-gradient(to right, transparent, #E11D4840, transparent)'
            : 'linear-gradient(to right, transparent, #E11D4810, transparent)',
        }}
      />
    </section>
  );
}
