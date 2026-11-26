import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CategoryCard({ category, priority = false }) {
  const {
    name,
    slug,
    tagline,
    description,
    cardImage,
    featuredBadge,
    highlights,
    indicativeRange
  } = category;

  const [imgSrc, setImgSrc] = useState(cardImage);

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-beige/80 shadow-warm-md hover:shadow-warm-xl transition-all duration-500 flex flex-col justify-between">
      {/* Visual Header with Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-walnut-900">
        <img
          src={imgSrc}
          alt={name}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImgSrc('/images/company/showroom-at-dusk.png')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Featured Tag */}
        {featuredBadge && (
          <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-ivory/95 backdrop-blur-md text-walnut text-xs font-semibold uppercase tracking-wider shadow-sm">
            {featuredBadge}
          </span>
        )}

        {/* Bottom image overlay copy */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
            Category Guide
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-sm">
            {name}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <p className="text-walnut font-medium text-sm sm:text-base italic font-serif">
            "{tagline}"
          </p>

          <p className="text-charcoal-muted text-sm leading-relaxed">
            {description}
          </p>

          {/* Highlights checklist */}
          {highlights && highlights.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-beige/60">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action & Price Indicative */}
        <div className="pt-4 border-t border-beige/60 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-semibold text-charcoal/60 tracking-wider block">
              Indicative Range
            </span>
            <span className="text-xs sm:text-sm font-bold text-walnut">
              {indicativeRange}
            </span>
          </div>

          <Link
            to={`/category/${slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage hover:bg-sage-600 text-white text-xs sm:text-sm font-medium transition-all duration-300 group-hover:translate-x-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-sage"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
