import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, Compass, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { buildPhoneLink } from '../utils/whatsapp';

export default function FurniturePage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Editorial Header */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-beige/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige/60 text-walnut text-xs font-semibold uppercase tracking-wider border border-beige mb-4">
              <Compass className="w-3.5 h-3.5 text-sage" />
              <span>Showroom Overview</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-walnut tracking-tight leading-tight">
              Our Core Departments
            </h1>

            <p className="mt-5 text-charcoal text-base sm:text-lg leading-relaxed font-light">
              Gounder &amp; Co. is organized into three specialized departments to serve every room in your home. Select a department below to explore detailed product collections, indicative pricing, and direct showroom enquiry options.
            </p>
          </div>
        </div>
      </section>

      {/* Exactly Three Main Category Sections */}
      <section className="py-16 lg:py-24" aria-label="Three Main Showroom Categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {CATEGORIES.map((cat, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={cat.id}
                className="bg-white rounded-3xl overflow-hidden border border-beige shadow-warm-md hover:shadow-warm-xl transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
                  
                  {/* Category Image */}
                  <div className={`lg:col-span-6 relative aspect-[16/11] w-full overflow-hidden bg-walnut-900 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}>
                    <img
                      src={cat.heroImage}
                      alt={cat.name}
                      onError={(e) => { e.currentTarget.src = '/images/company/showroom-at-dusk.png'; }}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-ivory/95 backdrop-blur-md text-walnut text-xs font-semibold uppercase tracking-wider border border-beige shadow-sm">
                      {cat.featuredBadge}
                    </div>

                    <div className="absolute bottom-5 left-5 text-white">
                      <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                        Department {index + 1} of 3
                      </span>
                      <span className="font-serif text-2xl font-bold">
                        {cat.name}
                      </span>
                    </div>
                  </div>

                  {/* Category Details & Explore CTA */}
                  <div className={`lg:col-span-6 p-8 lg:p-12 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}>
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-sage font-bold">
                        Showroom Catalog
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut">
                        {cat.name}
                      </h2>
                      <p className="font-serif italic text-base text-amber-800">
                        "{cat.tagline}"
                      </p>
                    </div>

                    <p className="text-charcoal text-sm sm:text-base leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-beige">
                      <span className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider block">
                        Available in this department:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-charcoal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicative Range & Explore Button */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-beige">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-charcoal/60 tracking-wider block">
                          Indicative Showroom Price Range
                        </span>
                        <span className="font-serif text-xl font-bold text-walnut">
                          {cat.indicativeRange}
                        </span>
                      </div>

                      <Link
                        to={`/category/${cat.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-warm-md hover:translate-x-0.5"
                      >
                        <span>Explore {cat.shortName}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Helpful Consultation Note */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-beige/40 rounded-3xl p-8 sm:p-10 border border-beige flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-walnut">
                Looking for a Complete Home or Marriage Setup?
              </h3>
              <p className="text-charcoal-muted text-sm max-w-2xl leading-relaxed">
                We specialize in comprehensive package combinations covering wooden cots, wardrobes, mattresses, refrigerators, smart TVs, and kitchen essentials with personalized bundled pricing.
              </p>
            </div>

            <a
              href={buildPhoneLink()}
              className="shrink-0 px-6 py-3 rounded-full bg-walnut hover:bg-walnut-800 text-ivory text-xs sm:text-sm font-medium transition-colors"
            >
              Inquire Package Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

