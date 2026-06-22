import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { label: 'HOME', href: '#' },
  { label: 'MENU', href: '#menu' },
  { label: 'THE NIGHT SHIFT', href: '#night-shift' },
  { label: 'SURVIVAL KITS', href: '#kits' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.04]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-[16px] font-bold tracking-[0.08em] text-white">KITCHEN <span className="text-[#E11D48]">149</span></span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}
                className={`text-[10px] tracking-[0.2em] font-medium transition-colors ${
                  l.label === 'HOME' ? 'text-[#E11D48]' : 'text-[#A3A3A3] hover:text-white'
                }`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-2 text-[10px] font-semibold tracking-[0.15em] transition-all rounded-full">
              <ShoppingBag size={13} /> ORDER NOW
            </a>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8">
          <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-6 text-white"><X size={26} /></button>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-white text-xl font-medium tracking-[0.15em] hover:text-[#E11D48] transition-colors">{l.label}</a>
          ))}
          <a href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#E11D48] text-white px-8 py-3 text-[12px] font-semibold tracking-[0.15em] rounded-full mt-4"
            onClick={() => setMenuOpen(false)}>
            <ShoppingBag size={16} /> ORDER NOW
          </a>
        </div>
      )}
    </>
  );
}
