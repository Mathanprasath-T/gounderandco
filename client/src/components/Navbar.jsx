import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { buildPhoneLink } from '../utils/whatsapp';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Track scroll state for sticky blur & elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Furniture', path: '/furniture' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-warm-sm border-b border-beige/60 py-3'
            : 'bg-ivory/80 backdrop-blur-sm py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo with GC Monogram */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded-md"
              aria-label="Gounder & Co. Home"
            >
              <Logo size="md" variant="walnut" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-walnut transition-colors group-hover:text-walnut-800 leading-none">
                  Gounder &amp; Co.
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-sage-600 mt-1">
                  Furniture &bull; Appliances &bull; Perundurai
                </span>
              </div>
            </Link>

            {/* Centre: Desktop Navigation (Exactly 4 links) */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${isActive
                      ? 'text-walnut bg-beige/60 font-semibold shadow-xs'
                      : 'text-charcoal/80 hover:text-walnut hover:bg-beige/30'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right: One Unified ENQUIRY Button */}
            <div className="hidden sm:flex items-center">
              <a
                href={buildPhoneLink()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase text-white bg-sage hover:bg-sage-600 transition-all duration-200 shadow-sm hover:shadow-warm-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
                title="Call Gounder & Co. Showroom"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>ENQUIRY</span>
              </a>
            </div>

            {/* Mobile Actions: Call Button & Hamburger */}
            <div className="flex items-center gap-2 sm:hidden">
              <a
                href={buildPhoneLink()}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-sage hover:bg-sage-600 shadow-xs"
                title="Call Showroom"
              >
                ENQUIRY
              </a>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg text-walnut hover:bg-beige/60 focus:outline-none focus:ring-2 focus:ring-sage"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 border-b border-beige/80 bg-ivory shadow-warm-lg' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="px-5 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                    ? 'bg-beige/70 text-walnut font-semibold border-l-4 border-sage'
                    : 'text-charcoal hover:bg-beige/40 hover:text-walnut'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t border-beige/60">
              <a
                href={buildPhoneLink()}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-sage text-white font-semibold tracking-wider uppercase text-sm shadow-sm hover:bg-sage-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>ENQUIRY</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer for sticky header */}
      <div className="h-20" />
    </>
  );
}
