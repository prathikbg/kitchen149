import { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

const neonMessages = [
  'Cravings Wake Up.',
  'Open Till 2 AM.',
  'Order Now.',
  'Hungry? We Got You.',
  'The Wolf Hungers.',
  'The Owl Knows.',
];

function NeonSign({ text, isHovered, onClick }: { text: string; isHovered: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-3.5 sm:px-12 sm:py-5 cursor-pointer transition-all duration-300 group max-w-full"
      style={{ outline: 'none' }}
    >
      {/* Outer glass tube border — OFF by default, glows on hover */}
      <div
        className="absolute inset-0 rounded-xl border-2 transition-all duration-300"
        style={{
          borderColor: isHovered ? '#E11D48' : '#E11D4815',
          boxShadow: isHovered
            ? '0 0 10px #E11D48, 0 0 20px #E11D48, 0 0 40px rgba(225,29,72,0.4), inset 0 0 10px rgba(225,29,72,0.1)'
            : 'none',
        }}
      />

      {/* Corner brackets — glow on hover */}
      {[
        '-top-1 -left-1 border-t-2 border-l-2 rounded-tl-sm',
        '-top-1 -right-1 border-t-2 border-r-2 rounded-tr-sm',
        '-bottom-1 -left-1 border-b-2 border-l-2 rounded-bl-sm',
        '-bottom-1 -right-1 border-b-2 border-r-2 rounded-br-sm',
      ].map((cls, i) => (
        <span
          key={i}
          className={`absolute w-3 h-3 ${cls} transition-all duration-300`}
          style={{
            borderColor: isHovered ? '#E11D48' : '#E11D4815',
            boxShadow: isHovered ? '0 0 6px #E11D48' : 'none',
          }}
        />
      ))}

      {/* Inner glow panel — on hover only */}
      <div
        className="absolute inset-1 rounded-lg transition-all duration-300"
        style={{ background: isHovered ? 'rgba(225,29,72,0.03)' : 'transparent' }}
      />

      {/* The text — OFF (dark) by default, red neon on hover */}
      <span
        className="relative z-10 font-medium tracking-tight whitespace-nowrap transition-all duration-300 block"
        style={{
          fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
          color: isHovered ? '#E11D48' : '#E11D4820',
          textShadow: isHovered ? '0 0 8px rgba(225,29,72,0.8), 0 0 20px rgba(225,29,72,0.4)' : 'none',
        }}
      >
        {text}
      </span>

      {/* Cable/wire decoration top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
        {[3, 2, 3].map((h, i) => (
          <div
            key={i}
            className="w-px transition-all duration-300"
            style={{
              height: `${h * 4}px`,
              background: isHovered ? 'rgba(225,29,72,0.4)' : '#333',
            }}
          />
        ))}
      </div>

      {/* Hint — shows when OFF (not hovered) */}
      <span
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] tracking-[0.2em] uppercase transition-all duration-300"
        style={{
          opacity: isHovered ? 0 : 1,
          color: '#E11D4820',
        }}
      >
        Hover to light up
      </span>
    </button>
  );
}

export default function Hero() {
  const [msgIndex, setMsgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);

  const handleNeonClick = useCallback(() => {
    if (isFlickering) return;
    setIsFlickering(true);

    // Realistic neon flicker
    const seq = [50, 80, 40, 120, 30, 60, 200, 40, 100, 50, 80];
    let delay = 0;
    seq.forEach((d, i) => {
      setTimeout(() => setIsHovered(i % 2 !== 0), delay);
      delay += d;
    });

    setTimeout(() => {
      setMsgIndex(prev => (prev + 1) % neonMessages.length);
      setIsHovered(true);
      setIsFlickering(false);
    }, delay + 100);
  }, [isFlickering]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
      {/* Neon Background */}
      <div className="absolute inset-0 z-0">
        <img src="/images/hero-neon.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: isHovered ? 0.85 : 0.5, transition: 'opacity 0.6s ease' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
      </div>

      {/* Background ambient glow — appears on hover */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0 transition-all duration-700"
        style={{
          background: isHovered ? 'rgba(225,29,72,0.08)' : 'rgba(225,29,72,0)',
          filter: 'blur(100px)',
        }}
      />
      {/* Secondary glow spots */}
      <div
        className="absolute top-[20%] left-[20%] w-[200px] h-[200px] rounded-full pointer-events-none z-0 transition-all duration-700"
        style={{
          background: isHovered ? 'rgba(225,29,72,0.06)' : 'transparent',
          filter: 'blur(80px)',
          transitionDelay: '100ms',
        }}
      />
      <div
        className="absolute bottom-[30%] right-[15%] w-[250px] h-[250px] rounded-full pointer-events-none z-0 transition-all duration-700"
        style={{
          background: isHovered ? 'rgba(225,29,72,0.05)' : 'transparent',
          filter: 'blur(90px)',
          transitionDelay: '200ms',
        }}
      />

      {/* Steam — visible on hover */}
      <div
        className="absolute top-[18%] right-[22%] z-[1] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="w-0.5 h-14 bg-gradient-to-t from-[#E11D48]/20 to-transparent rounded-full animate-steam" />
      </div>
      <div
        className="absolute top-[22%] right-[28%] z-[1] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0, animationDelay: '1.5s' }}
      >
        <div className="w-px h-10 bg-gradient-to-t from-[#E11D48]/15 to-transparent rounded-full animate-steam" />
      </div>

      {/* Wolf — dim by default, bright on hover */}
      <div
        className="absolute left-0 top-[15%] md:left-[4%] md:top-[10%] w-[140px] md:w-[220px] pointer-events-none animate-float z-[2] transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.7 : 0.25 }}
      >
        <img
          src="/images/wolf-line.png"
          alt=""
          className="w-full h-auto transition-all duration-500"
          style={{ filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,26,26,0.6))' : 'drop-shadow(0 0 5px rgba(255,26,26,0.1))' }}
        />
      </div>

      {/* Owl — dim by default, bright on hover */}
      <div
        className="absolute right-0 top-[18%] md:right-[4%] md:top-[12%] w-[120px] md:w-[180px] pointer-events-none animate-float z-[2] transition-opacity duration-500"
        style={{ opacity: isHovered ? 0.7 : 0.25, animationDelay: '2s' }}
      >
        <img
          src="/images/owl-line.png"
          alt=""
          className="w-full h-auto transition-all duration-500"
          style={{ filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,26,26,0.6))' : 'drop-shadow(0 0 5px rgba(255,26,26,0.1))' }}
        />
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center px-6 max-w-[880px]">
        {/* Tag */}
        <div className="animate-fade-up inline-flex items-center gap-2 mb-8 px-4 py-2 sm:px-5 rounded-full border border-[#E11D48]/20 bg-[#0A0A0A]/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.3em] text-[#E11D48]/80 uppercase font-semibold">The Night Shift Club</span>
        </div>

        {/* Sub-headline */}
        <p className="animate-fade-up-d1 text-white/60 text-[12px] sm:text-[13px] tracking-[0.22em] sm:tracking-[0.4em] uppercase mb-7">
          When The City Sleeps
        </p>

        {/* Interactive Neon Sign — hover to light up + background lights */}
        <div
          className="animate-fade-up-d2 mb-10 flex justify-center"
          onMouseEnter={() => !isFlickering && setIsHovered(true)}
          onMouseLeave={() => !isFlickering && setIsHovered(false)}
        >
          <NeonSign
            text={neonMessages[msgIndex]}
            isHovered={isHovered}
            onClick={handleNeonClick}
          />
        </div>

        {/* Subhead */}
        <p className="animate-fade-up-d3 text-[#A3A3A3]/80 text-[16px] md:text-[18px] mt-4 leading-relaxed max-w-[560px] mx-auto">
          Indo-Chinese wok-tossed comfort food. Built for Bengaluru&apos;s night owls, gamers, coders &amp; dreamers.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-d4 flex flex-wrap items-center justify-center gap-3 mt-10">
          <a href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#E11D48] hover:bg-[#ff1a1a] text-white px-8 py-3.5 text-[13px] font-semibold tracking-[0.15em] transition-all rounded-full">
            ORDER NOW <ArrowRight size={16} />
          </a>
          <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-[#A3A3A3] hover:text-white px-7 py-3.5 text-[13px] tracking-[0.12em] transition-all border border-white/10 hover:border-[#E11D48]/30 rounded-full">
            VIEW MENU
          </button>
        </div>

        {/* Characters */}
        <div className="animate-fade-up-d5 flex items-center justify-center gap-7 mt-12">
          <div className="flex items-center gap-2">
            <span className="text-xl">&#x1F43A;</span>
            <span className="text-[12px] tracking-[0.18em] text-[#A3A3A3]/60 uppercase font-medium">Hungry Wolf</span>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-xl">&#x1F989;</span>
            <span className="text-[12px] tracking-[0.18em] text-[#A3A3A3]/60 uppercase font-medium">Night Owl</span>
          </div>
        </div>

        {/* Open Till 2AM */}
        <div className="animate-fade-up-d5 mt-7 inline-block">
          <div className="animate-pulse-glow inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E11D48]/20 bg-[#0A0A0A]/40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span className="text-[11px] tracking-[0.22em] text-[#A3A3A3]/60 uppercase font-medium">Open Till</span>
            <span className="text-[11px] tracking-[0.22em] text-[#E11D48] uppercase font-bold">2:00 AM</span>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}
