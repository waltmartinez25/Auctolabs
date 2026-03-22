import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar3, ArrowRight } from 'react-bootstrap-icons';

export const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-sm border-t border-border/40 px-4 py-3 shadow-xl flex gap-3"
           style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
        <a
          href="https://calendly.com/waltermartinez-auctolabs/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Calendar3 className="w-4 h-4 shrink-0" />
          Book a Call
        </a>
        <Link
          to="/contact?audit=true"
          className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold text-sm py-3 rounded-xl hover:bg-primary/5 transition-colors"
        >
          Free Audit
          <ArrowRight className="w-4 h-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
};
