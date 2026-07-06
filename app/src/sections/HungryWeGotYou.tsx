import { ShoppingBag, MessageCircle, Phone } from 'lucide-react';

type OrderOption = {
  icon: typeof Phone;
  label: string;
  desc: string;
  href: string;
  color: string;
  speed: string;
  speedDesc: string;
  external: boolean;
};

const directOptions: OrderOption[] = [
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
];

const deliveryOptions: OrderOption[] = [
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
  {
    icon: ShoppingBag,
    label: 'Zomato',
    desc: 'Order online',
    href: 'https://zomato.onelink.me/xqzv/tzuzwbdb',
    color: '#CB202D', // Zomato red
    speed: '\u{1F6F5} ~30 MIN',
    speedDesc: 'Doorstep delivery, full menu.',
    external: true,
  },
  {
    icon: ShoppingBag,
    label: 'Ownly',
    desc: 'Order direct',
    href: 'https://ownly.food/app/brand/BR438592',
    color: '#6366F1', // indigo — distinct from the delivery giants
    speed: '\u{1F4B0} BEST VALUE',
    speedDesc: 'Zero commission. Better price.',
    external: true,
  },
];

function renderOptionCard(opt: OrderOption, i: number, baseDelay: number) {
  return (
    <a
      key={opt.label}
      href={opt.href}
      target={opt.external ? '_blank' : undefined}
      rel={opt.external ? 'noopener noreferrer' : undefined}
      className="group relative flex flex-col items-start text-left gap-4 p-6 rounded-2xl border bg-[#111] transition-all hover:-translate-y-1 animate-fade-up"
      style={{
        borderColor: 'rgba(255,255,255,0.06)',
        animationDelay: `${baseDelay + i * 80}ms`,
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
  );
}

export default function HungryWeGotYou() {
  return (
    <section id="order" className="relative w-full overflow-hidden bg-[#0A0A0A]">
      {/* Ambient red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(225,29,72,0.08)', filter: 'blur(120px)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-10 pt-12 sm:pt-14 pb-24 sm:pb-28 text-center">
        {/* Headline */}
        <h2
          className="font-bold tracking-tight text-white animate-fade-up whitespace-nowrap"
          style={{ fontSize: 'clamp(1.75rem, 7.5vw, 4.5rem)', textShadow: '0 0 40px rgba(225,29,72,0.25)', animationDelay: '60ms' }}
        >
          Hungry?{' '}
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
          Talk to the kitchen directly, or order through your favourite app.
        </p>

        {/* Tier 1: Direct contact — fastest paths */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12 max-w-[760px] mx-auto">
          {directOptions.map((opt, i) => renderOptionCard(opt, i, 180))}
        </div>

        {/* Divider label */}
        <p className="text-[10px] tracking-[0.3em] text-[#A3A3A3]/50 uppercase font-semibold mt-10 mb-5 animate-fade-up" style={{ animationDelay: '340ms' }}>
          Or order via delivery apps
        </p>

        {/* Tier 2: Delivery apps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
          {deliveryOptions.map((opt, i) => renderOptionCard(opt, i, 380))}
        </div>

        {/* Secondary: view full menu */}
        <a
          href="#menu"
          className="inline-flex items-center gap-2 mt-10 text-[12px] tracking-[0.15em] uppercase text-[#A3A3A3] hover:text-white transition-colors animate-fade-up font-semibold"
          style={{ animationDelay: '640ms' }}
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
