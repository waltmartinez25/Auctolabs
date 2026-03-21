import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { cn } from '@/lib/utils';
import logo from '@/assets/AuctoLabs_Logo_transparent.png';

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const scrolled = useScroll(10);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const floated = scrolled && !open;

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 px-4 transition-[top] duration-300 ease-out',
        floated ? 'top-4' : 'top-0',
      )}
    >
      <nav
        className={cn(
          'mx-auto flex items-center justify-between transition-all duration-300 ease-out',
          floated
            ? 'max-w-4xl h-14 px-6 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-soft-sm'
            : 'max-w-screen-xl h-20 px-2 md:px-6',
        )}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="AuctoLabs"
            className={cn('w-auto transition-all duration-300', floated ? 'h-12' : 'h-20')}
            fetchPriority="high"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === link.href ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <Button asChild variant="glow">
              <Link to="/contact">Book a Call</Link>
            </Button>
          </div>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 top-[80px] z-40 bg-background/98 backdrop-blur-xl border-t border-border lg:hidden">
          <div className="px-6 py-8 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'flex py-4 text-lg font-medium transition-colors hover:text-primary border-b border-border/30',
                  location.pathname === link.href ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6">
              <Button asChild variant="glow" className="w-full">
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
