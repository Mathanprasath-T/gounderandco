import React, { useRef } from 'react';
import { ALL_BRAND_NAMES, BRANDS } from '../data/brands';
import { ShieldCheck, Sparkles } from 'lucide-react';

// Build a rich flat brand list with categories for display
const MARQUEE_BRANDS = ALL_BRAND_NAMES.map((name) => {
  // Find the category tag for each brand
  let tag = '';
  for (const group of BRANDS) {
    const found = group.brands.find((b) => b.name === name);
    if (found) { tag = found.tag; break; }
  }
  return { name, tag };
});

// Duplicate for seamless infinite loop
const DOUBLED = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

export default function BrandShowcase() {
  const trackRef = useRef(null);

  return (
    <section
      className="py-20 bg-beige/30 border-y border-beige/60 overflow-hidden"
      aria-labelledby="trusted-brands-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory text-walnut text-xs font-semibold uppercase tracking-wider border border-beige/80 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Showroom Collections</span>
          </div>
          <h2
            id="trusted-brands-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-walnut"
          >
            Trusted Brands for Your Everyday Home
          </h2>
          <p className="mt-4 text-charcoal-muted text-sm sm:text-base leading-relaxed">
            We curate genuine, highly dependable national and global brands across electronics,
            home appliances, mattresses, and fans for families in Perundurai and Erode district.
          </p>
        </div>

      </div>

      {/* Marquee Track — full-width, outside the constrained container */}
      <div
        className="animate-marquee-pause relative w-full"
        aria-hidden="false"
      >
        {/* Fade masks on left and right edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: 'linear-gradient(to right, #EDE4D4 0%, transparent 100%)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: 'linear-gradient(to left, #EDE4D4 0%, transparent 100%)' }}
        />

        <div
          ref={trackRef}
          className="animate-marquee flex items-stretch gap-4 py-3 w-max"
        >
          {DOUBLED.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex-shrink-0 bg-white rounded-2xl px-7 py-5 border border-beige/80 shadow-warm-sm
                         hover:shadow-warm-md hover:border-sage/40 transition-all duration-300
                         flex flex-col items-center justify-center text-center min-w-[140px]"
            >
              <span className="font-serif text-2xl font-bold text-walnut tracking-tight leading-none">
                {brand.name}
              </span>
              {brand.tag && (
                <span className="text-[10px] text-charcoal/55 mt-1.5 font-medium leading-tight max-w-[120px]">
                  {brand.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transparency note */}
      <div className="mt-10 text-center px-4">
        <p className="text-xs text-charcoal/50 max-w-2xl mx-auto inline-flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-sage flex-shrink-0" />
          <span>
            All product trademarks and brand names belong to their respective manufacturers
            and are featured strictly for showroom catalog representation.
          </span>
        </p>
      </div>
    </section>
  );
}
