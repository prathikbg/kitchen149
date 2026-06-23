import { useState, useCallback, useMemo } from 'react';

const neonMessages = [
  'Cravings Wake Up.',
  'The Wolf Hungers.',
  'The Owl Knows.',
];

// Wolf opens, owl replies — one pair per neon message
const dialogues = [
  { wolf: 'still up?',           owl: 'since 2 AM.' },
  { wolf: 'smell that wok hei?', owl: 'always.'     },
  { wolf: 'chilli or schezwan?', owl: 'yes.'        },
];

// Deterministic pseudo-random so each text has a stable "broken" pattern
function hashCharState(text: string, i: number): 'alive' | 'flicker' | 'dead' {
  let h = 0;
  for (let k = 0; k < text.length; k++) h = (h * 31 + text.charCodeAt(k)) | 0;
  const r = Math.abs(Math.sin((h + i * 977) * 0.1)) % 1;
  if (r < 0.22) return 'dead';
  if (r < 0.48) return 'flicker';
  return 'alive';
}

// Sparks fly from random spots on hover — pure CSS, infinite loop with staggered delays
const SPARKS = [
  { left: '14%', top: '38%', delay: '0s',    dur: '1.2s', sx: '7px',   sy: '-12px' },
  { left: '29%', top: '52%', delay: '0.35s', dur: '0.9s', sx: '-5px',  sy: '-14px' },
  { left: '46%', top: '32%', delay: '0.7s',  dur: '1.3s', sx: '9px',   sy: '-9px'  },
  { left: '63%', top: '55%', delay: '0.15s', dur: '1.1s', sx: '-7px',  sy: '-15px' },
  { left: '78%', top: '40%', delay: '0.55s', dur: '1.0s', sx: '6px',   sy: '-10px' },
  { left: '91%', top: '48%', delay: '0.85s', dur: '1.4s', sx: '-4px',  sy: '-13px' },
];

function NeonSign({ text, isHovered, isFlickering, onClick }: { text: string; isHovered: boolean; isFlickering: boolean; onClick: () => void }) {
  // Stable per-character "broken" state for this message
  const chars = useMemo(
    () => text.split('').map((c, i) => ({ c, state: c === ' ' ? 'space' : hashCharState(text, i) })),
    [text]
  );

  return (
    <button
      onClick={onClick}
      aria-label="Broken neon sign — tap to flicker"
      className="relative px-3 py-2 sm:px-6 sm:py-3 cursor-pointer max-w-full"
      style={{ outline: 'none' }}
    >
      <span
        className="relative z-10 font-medium tracking-tight whitespace-nowrap block"
        style={{ fontSize: 'clamp(1.5rem, 6vw, 3.5rem)' }}
      >
        {chars.map((ch, i) => {
          if (ch.state === 'space') return <span key={i}>&nbsp;</span>;
          const isDead = ch.state === 'dead';
          const isFlicker = ch.state === 'flicker';

          // Off-state colors telegraph "damaged tube" even without hover
          const offColor =
            isDead    ? 'rgba(120, 90, 100, 0.38)'   // ghost — phosphor scraped off
            : isFlicker ? 'rgba(220, 165, 180, 0.55)' // weakened tube
            :            'rgba(255, 180, 195, 0.75)'; // healthy unlit tube

          // On-state (hover) — dead stays dim, flicker pulses, alive blazes
          const onColor   = isDead ? 'rgba(160, 90, 100, 0.35)' : '#E11D48';
          const onShadow  = isDead
            ? '0 1px 2px rgba(0,0,0,0.85)'
            : isFlicker
              ? '0 0 5px rgba(225,29,72,0.7), 0 0 12px rgba(225,29,72,0.35)'
              : '0 0 8px rgba(225,29,72,0.85), 0 0 20px rgba(225,29,72,0.45), 0 0 40px rgba(225,29,72,0.25)';

          // During power-on flicker, snap colors instantly so the stutter reads as broken
          const useFlickerAnim = isHovered && isFlicker && !isFlickering;

          return (
            <span
              key={i}
              className={useFlickerAnim ? 'neon-broken-flicker inline-block' : 'inline-block transition-colors duration-300'}
              style={{
                color: isHovered ? onColor : offColor,
                textShadow: isHovered ? onShadow : '0 1px 2px rgba(0,0,0,0.85), 0 0 10px rgba(225,29,72,0.2)',
                transition: isFlickering ? 'none' : undefined,
              }}
            >
              {ch.c}
            </span>
          );
        })}
      </span>

      {/* Sparks — only visible on hover, pure CSS infinite loops */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-white spark-fly"
              style={{
                left: s.left,
                top: s.top,
                animationDelay: s.delay,
                animationDuration: s.dur,
                boxShadow:
                  '0 0 4px #fff, 0 0 8px rgba(225,29,72,0.95), 0 0 14px rgba(225,29,72,0.55)',
                ['--sx' as never]: s.sx,
                ['--sy' as never]: s.sy,
              }}
            />
          ))}
        </div>
      )}
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
        <img src="/images/hero-neon.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: isHovered ? 0.85 : 0.5, transition: isFlickering ? 'none' : 'opacity 0.6s ease' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/80" />
      </div>

      {/* Background ambient glow — appears on hover */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none z-0 ${isFlickering ? '' : 'transition-all duration-700'}`}
        style={{
          background: isHovered ? 'rgba(225,29,72,0.08)' : 'rgba(225,29,72,0)',
          filter: 'blur(100px)',
          transition: isFlickering ? 'none' : undefined,
        }}
      />
      {/* Secondary glow spots */}
      <div
        className={`absolute top-[20%] left-[20%] w-[200px] h-[200px] rounded-full pointer-events-none z-0 ${isFlickering ? '' : 'transition-all duration-700'}`}
        style={{
          background: isHovered ? 'rgba(225,29,72,0.06)' : 'transparent',
          filter: 'blur(80px)',
          transitionDelay: isFlickering ? '0ms' : '100ms',
          transition: isFlickering ? 'none' : undefined,
        }}
      />
      <div
        className={`absolute bottom-[30%] right-[15%] w-[250px] h-[250px] rounded-full pointer-events-none z-0 ${isFlickering ? '' : 'transition-all duration-700'}`}
        style={{
          background: isHovered ? 'rgba(225,29,72,0.05)' : 'transparent',
          filter: 'blur(90px)',
          transitionDelay: isFlickering ? '0ms' : '200ms',
          transition: isFlickering ? 'none' : undefined,
        }}
      />

      {/* Steam — single plume, visible on hover */}
      <div
        className="absolute top-[18%] right-[22%] z-[1] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="w-0.5 h-14 bg-gradient-to-t from-[#E11D48]/20 to-transparent rounded-full animate-steam" />
      </div>

      {/* Hungry wolf calls his mate — a red ember drifts from wolf to owl every 9s */}
      <div className="absolute top-[18%] md:top-[14%] left-[14%] right-[14%] pointer-events-none z-[2]">
        <div
          className="wolf-call-orb absolute top-0"
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,220,225,1) 0%, rgba(255,80,100,0.95) 35%, rgba(225,29,72,0.6) 65%, transparent 90%)',
            boxShadow: '0 0 10px rgba(255,80,100,0.9), 0 0 24px rgba(225,29,72,0.55), 0 0 48px rgba(225,29,72,0.25)',
          }}
        />
      </div>

      {/* Wolf — dim by default, flares when sending the call, bright on hover */}
      <div className="absolute left-0 top-[15%] md:left-[4%] md:top-[10%] w-[140px] md:w-[220px] pointer-events-none animate-float z-[2]">
        <div className="relative w-full wolf-breathe">
          <div className={isHovered ? 'pulse-aura-hot' : 'wolf-call-flare'}>
            <img
              src="/images/wolf-line.png"
              alt=""
              className={`w-full h-auto block ${isFlickering ? '' : 'transition-opacity duration-500'}`}
              style={{
                opacity: isHovered ? 0.85 : 0.4,
                transition: isFlickering ? 'none' : undefined,
              }}
            />
          </div>
        </div>
        {/* Wolf speech bubble — fades in 200ms after hover */}
        <div
          className="absolute top-full left-[18%] mt-1.5"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: isFlickering ? 'none' : `opacity 0.4s ease ${isHovered ? '200ms' : '0ms'}, transform 0.4s ease ${isHovered ? '200ms' : '0ms'}`,
          }}
        >
          <div
            className="relative px-3 py-1 rounded-full border border-[#E11D48]/50 bg-[#0A0A0A]/90 backdrop-blur-sm"
            style={{ boxShadow: '0 0 6px rgba(225,29,72,0.35), 0 0 14px rgba(225,29,72,0.15)' }}
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.05em] text-[#E11D48]/90 font-medium whitespace-nowrap">
              &ldquo;{dialogues[msgIndex].wolf}&rdquo;
            </span>
            <div
              className="absolute left-3 -top-[5px] w-2 h-2 border-l border-t border-[#E11D48]/50 rotate-45"
              style={{ background: 'rgba(10,10,10,0.9)' }}
            />
          </div>
        </div>
      </div>

      {/* Owl — dim by default, flares when receiving the call, bright on hover */}
      <div className="absolute right-0 top-[18%] md:right-[4%] md:top-[12%] w-[120px] md:w-[180px] pointer-events-none animate-float z-[2]" style={{ animationDelay: '2s' }}>
        <div className="relative w-full owl-sway">
          <div className={isHovered ? 'pulse-aura-hot' : 'owl-receive-flare'}>
            <img
              src="/images/owl-line.png"
              alt=""
              className={`w-full h-auto block ${isFlickering ? '' : 'transition-opacity duration-500'}`}
              style={{
                opacity: isHovered ? 0.85 : 0.4,
                transition: isFlickering ? 'none' : undefined,
              }}
            />
          </div>
        </div>
        {/* Owl speech bubble — replies 600ms after the wolf */}
        <div
          className="absolute top-full right-[18%] mt-1.5"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
            transition: isFlickering ? 'none' : `opacity 0.4s ease ${isHovered ? '600ms' : '0ms'}, transform 0.4s ease ${isHovered ? '600ms' : '0ms'}`,
          }}
        >
          <div
            className="relative px-3 py-1 rounded-full border border-[#E11D48]/50 bg-[#0A0A0A]/90 backdrop-blur-sm"
            style={{ boxShadow: '0 0 6px rgba(225,29,72,0.35), 0 0 14px rgba(225,29,72,0.15)' }}
          >
            <span className="text-[9px] sm:text-[10px] tracking-[0.05em] text-[#E11D48]/90 font-medium whitespace-nowrap">
              &ldquo;{dialogues[msgIndex].owl}&rdquo;
            </span>
            <div
              className="absolute right-3 -top-[5px] w-2 h-2 border-l border-t border-[#E11D48]/50 rotate-45"
              style={{ background: 'rgba(10,10,10,0.9)' }}
            />
          </div>
        </div>
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
            isFlickering={isFlickering}
            onClick={handleNeonClick}
          />
        </div>

        {/* Subhead */}
        <p className="animate-fade-up-d3 text-[#A3A3A3]/80 text-[16px] md:text-[18px] mt-4 leading-relaxed max-w-[560px] mx-auto">
          Indo-Chinese wok-tossed comfort food. Built for Bengaluru&apos;s night owls, gamers, coders &amp; dreamers.
        </p>

        {/* Characters — Hungry Wolf | Night Owl */}
        <div className="animate-fade-up-d4 flex items-center justify-center gap-7 mt-10">
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

        {/* Open Till 2:00 AM */}
        <div className="animate-fade-up-d5 mt-6 inline-block">
          <div className="animate-pulse-glow inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E11D48]/20 bg-[#0A0A0A]/40">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <span className="text-[11px] tracking-[0.22em] text-[#A3A3A3]/60 uppercase font-medium">Open Till</span>
            <span className="text-[11px] tracking-[0.22em] text-[#E11D48] uppercase font-bold">2:00 AM</span>
          </div>
        </div>
      </div>

      {/* Scroll cue — ember drips toward HungryWeGotYou; tap to scroll */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 group"
      >
        <span className="text-[9px] tracking-[0.32em] text-[#A3A3A3]/40 uppercase group-hover:text-[#E11D48]/80 transition-colors">
          What&apos;s Cooking
        </span>
        <div className="relative h-[44px] w-[14px]">
          {/* Trail — thin vertical streak behind the ember */}
          <span
            className="ember-trail absolute top-0 left-1/2 w-px h-6"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(225,29,72,0.75) 50%, transparent 100%)',
            }}
          />
          {/* The ember itself */}
          <span
            className="ember-fall absolute top-0 left-1/2 w-[9px] h-[9px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,220,225,1) 0%, rgba(255,80,100,0.95) 35%, rgba(225,29,72,0.6) 65%, transparent 90%)',
              boxShadow: '0 0 8px rgba(255,80,100,0.9), 0 0 20px rgba(225,29,72,0.55), 0 0 40px rgba(225,29,72,0.25)',
            }}
          />
        </div>
      </button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  );
}
