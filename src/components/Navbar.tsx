import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Sponsors', href: '#sponsors' },
];

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      {/* Navbar - using CSS transitions instead of framer-motion */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 transform ${isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-primary/20 translate-y-0'
            : 'bg-transparent translate-y-0'
          }`}
        style={{ willChange: 'background-color, backdrop-filter' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center relative">
          {/* Logo - Left */}
          <a href="#" className="flex items-center gap-2 absolute left-4">
            <span className="text-2xl font-stranger tracking-wider text-primary neon-text-subtle">
              TX
            </span>
            <span className="hidden sm:block text-sm font-stranger tracking-[0.2em] text-foreground/70">
              TECHXPRESSION
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-base font-stranger tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground absolute right-4"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - CSS transition instead of framer-motion */}
      <div
        className={`fixed inset-x-0 top-[72px] z-30 bg-background/95 backdrop-blur-lg border-b border-primary/20 md:hidden transition-all duration-200 ${isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="p-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-lg font-stranger tracking-wider text-foreground hover:text-primary transition-colors text-left py-2"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
