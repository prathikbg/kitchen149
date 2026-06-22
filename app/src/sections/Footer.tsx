import { ArrowRight, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#111] border-t border-white/[0.04]">
      {/* Open Till 2 AM Badge */}
      <div className="py-10 flex justify-center">
        <div className="animate-pulse-glow inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0A0A0A] border border-[#E11D48]/20">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-bold">Night Mode Active</p>
            <p className="text-[11px] text-[#A3A3A3] tracking-wide">Serving Bengaluru till 2:00 AM</p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Fast Delivery */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E11D48]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white tracking-wide">FAST DELIVERY</p>
              <p className="text-[10px] text-[#A3A3A3]">At your doorstep, hot &amp; on time.</p>
            </div>
          </div>

          {/* Center Logo */}
          <div className="text-center">
            <p className="text-[18px] font-bold tracking-[0.08em]">
              KITCHEN <span className="text-[#E11D48]">149</span>
            </p>
            <p className="text-[8px] tracking-[0.3em] text-[#A3A3A3]/40 uppercase">Late Night. Right Bite.</p>
          </div>

          {/* Late Night CTA */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[12px] font-bold text-white tracking-wide">LATE NIGHT?</p>
              <p className="text-[#E11D48] text-[12px] font-bold tracking-wide">WE GOT YOU.</p>
            </div>
            <a href="https://www.swiggy.com/city/bangalore/kitchen-149-hsr-rest1388005" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-[#E11D48] flex items-center justify-center hover:bg-[#BE123C] transition-all">
              <ArrowRight size={16} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[9px] text-[#A3A3A3]/30 tracking-wider">&copy; 2025 KITCHEN 149 &mdash; Bangalore&apos;s Night Kitchen</p>
          <div className="flex items-center gap-4">
            <a href="tel:+917975593357" className="flex items-center gap-1 text-[9px] text-[#A3A3A3]/30 hover:text-[#E11D48] transition-colors">
              <Phone size={9} /> +91 79755 93357
            </a>
            <p className="text-[9px] text-[#A3A3A3]/30">FSSAI #21226194001794</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
