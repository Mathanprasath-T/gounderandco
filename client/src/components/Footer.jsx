import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { CATEGORIES } from '../data/categories';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-walnut text-ivory pt-16 pb-20 border-t border-walnut-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-walnut-600/40">

          {/* Col 1: Brand & Story (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" variant="sage" />
              <span className="font-serif text-3xl font-bold tracking-tight text-ivory">
                Gounder &amp; Co.
              </span>
            </div>

            <p className="text-ivory/80 text-sm leading-relaxed max-w-md pt-2">
              Serving homes across Perundurai and Erode district for over 30 years. Discover meticulously curated wooden furniture, reliable home appliances, and next-generation electronics built for generations of comfort.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-walnut-800/80 border border-walnut-600/50 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              {BUSINESS_INFO.trustBadge}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage hover:bg-sage-600 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Enquiry</span>
              </a>
              <a
                href={BUSINESS_INFO.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-walnut-800 hover:bg-walnut-700 text-ivory/90 text-xs font-medium transition-colors border border-walnut-600/50"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-ivory tracking-wide border-b border-walnut-600/50 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/80">
              <li>
                <Link to="/" className="hover:text-amber-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Showroom</Link>
              </li>
              <li>
                <Link to="/furniture" className="hover:text-amber-300 transition-colors">Furniture Overview</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-ivory tracking-wide border-b border-walnut-600/50 pb-2">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory/80">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-amber-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Showroom Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-ivory tracking-wide border-b border-walnut-600/50 pb-2">
              Showroom Visit
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-ivory/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ivory block font-medium">Gounder &amp; Co.</strong>
                  {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.landmark},<br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.pincode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sage-300 shrink-0" />
                <span>Open Daily: {BUSINESS_INFO.hours.time}</span>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-ivory/60 font-semibold">Showroom Phones</span>
                {BUSINESS_INFO.phones.map((phone) => (
                  <a
                    key={phone.number}
                    href={buildPhoneLink(phone.number)}
                    className="flex items-center gap-2 text-ivory hover:text-amber-300 transition-colors font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{phone.formatted}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4 pr-0 sm:pr-48">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name} All rights reserved. Showroom located in Perundurai, Tamil Nadu.
          </p>
          <div className="flex items-center gap-4 text-ivory/70">
            <span>Proprietor: {BUSINESS_INFO.owner}</span>
            <span>&bull;</span>
            <span>Genuine Quality Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

