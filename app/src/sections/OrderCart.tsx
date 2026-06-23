import { useState, useEffect, useRef } from 'react';
import { ListPlus, X, Plus, Minus, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const PHONE = '+917975593357';
const PHONE_DISPLAY = '+91 79755 93357';

export default function OrderCart() {
  const { items, totalQty, totalPrice, setQty, clear } = useCart();
  const [open, setOpen] = useState(false);

  // Bump the floating button briefly whenever total qty increases — non-intrusive nudge
  // that replaces the old auto-open behaviour (which hijacked the screen on first add).
  const [bumping, setBumping] = useState(false);
  const prevQtyRef = useRef(totalQty);
  useEffect(() => {
    if (totalQty > prevQtyRef.current) {
      setBumping(true);
      const t = setTimeout(() => setBumping(false), 600);
      prevQtyRef.current = totalQty;
      return () => clearTimeout(t);
    }
    prevQtyRef.current = totalQty;
  }, [totalQty]);

  // Lock body scroll when popup open
  useEffect(() => {
    if (open) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = orig; };
    }
  }, [open]);

  // Build the WhatsApp pre-filled order message
  const orderLines = items.map(i => `• ${i.name} x${i.qty} — ₹${i.qty * i.price}`).join('\n');
  const waText = encodeURIComponent(
    `Hi Kitchen 149! I'd like to order:\n\n${orderLines}\n\nTotal: ₹${totalPrice}`
  );
  const waHref = `https://wa.me/${PHONE.replace('+', '')}?text=${waText}`;

  return (
    <>
      {/* Floating Shortlist Button */}
      {totalQty > 0 && !open && (
        <button
          onClick={() => setOpen(true)}
          className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white px-5 py-3 rounded-full shadow-[0_0_25px_rgba(225,29,72,0.5)] transition-all hover:scale-105 ${bumping ? 'cart-bump' : ''}`}
          aria-label="View your shortlist"
        >
          <ListPlus size={16} />
          <span className="text-[12px] font-semibold tracking-[0.1em] uppercase">
            View Shortlist
          </span>
          <span className="bg-white text-[#E11D48] text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5">
            {totalQty}
          </span>
        </button>
      )}

      {/* Backdrop + Panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-end animate-fade-in">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full sm:max-w-[420px] sm:mr-6 max-h-[88vh] bg-[#0A0A0A] border border-white/[0.06] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ListPlus size={14} className="text-[#E11D48]" />
                <p className="text-[10px] tracking-[0.3em] text-[#E11D48] uppercase font-medium">Your Shortlist</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#A3A3A3] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="text-[#A3A3A3] text-[13px] text-center py-12">Your shortlist is empty.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center gap-3 bg-[#111] rounded-xl p-3 border border-white/[0.04]">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[13px] font-medium truncate">{it.name}</p>
                        <p className="text-[#E11D48] text-[12px] font-bold mt-0.5">₹{it.price} <span className="text-[#A3A3A3] font-normal">× {it.qty}</span></p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => setQty(it.id, it.qty - 1)}
                          className="w-7 h-7 rounded-full border border-[#E11D48]/30 flex items-center justify-center text-[#E11D48] hover:bg-[#E11D48]/10 transition-all">
                          <Minus size={10} />
                        </button>
                        <span className="text-white text-[12px] font-medium w-4 text-center">{it.qty}</span>
                        <button onClick={() => setQty(it.id, it.qty + 1, it)}
                          className="w-7 h-7 rounded-full bg-[#E11D48] flex items-center justify-center text-white hover:bg-[#BE123C] transition-all">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/[0.06] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3] text-[12px] tracking-[0.15em] uppercase">Total</span>
                  <span className="text-white text-[20px] font-bold">₹{totalPrice}</span>
                </div>

                <p className="text-[#A3A3A3] text-[11px] leading-relaxed">
                  Send your shortlist to the kitchen — we&apos;ll prep it and call you back to confirm.
                </p>

                <a href={waHref} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#22C55E] hover:bg-[#16A34A] text-white px-4 py-3.5 rounded-full text-[12px] font-semibold tracking-[0.1em] uppercase transition-all shadow-[0_0_18px_rgba(34,197,94,0.35)]">
                  <MessageCircle size={14} /> Send via WhatsApp
                </a>

                <a href={`tel:${PHONE}`}
                  className="flex items-center justify-center gap-2 border border-[#E11D48]/40 text-[#E11D48] hover:bg-[#E11D48]/10 px-4 py-3 rounded-full text-[11px] font-semibold tracking-[0.1em] uppercase transition-all">
                  <Phone size={13} /> Or call {PHONE_DISPLAY}
                </a>

                <div className="flex items-center justify-end pt-1">
                  <button onClick={clear} className="text-[#A3A3A3] text-[11px] hover:text-white transition-colors">
                    Clear shortlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
