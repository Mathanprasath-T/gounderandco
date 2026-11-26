import React, { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';

export default function ProductCard({ product, onQuickEnquire }) {
  const {
    name,
    categoryName,
    subCategory,
    description,
    priceRange,
    priceNote,
    image,
    tags,
    brands
  } = product;

  const [imgSrc, setImgSrc] = useState(image);
  const whatsappUrl = buildWhatsAppLink({ productName: name });
  const phoneUrl = buildPhoneLink();

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-beige/80 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige/30">
        <img
          src={imgSrc}
          alt={name}
          loading="lazy"
          onError={() => setImgSrc('/images/company/showroom-at-dusk.png')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* SubCategory Pill */}
        {subCategory && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ivory/95 backdrop-blur-sm text-walnut text-[11px] font-semibold uppercase tracking-wider shadow-xs border border-beige/60">
            {subCategory}
          </span>
        )}

        {/* Category tag */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-walnut/90 backdrop-blur-sm text-ivory text-[10px] font-medium tracking-wide">
          {categoryName}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-walnut leading-snug group-hover:text-amber-700 transition-colors">
            {name}
          </h3>

          <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Tags / Features */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-ivory text-walnut text-[11px] font-medium border border-beige/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Associated Client Brands if verified */}
          {brands && brands.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-medium text-charcoal/60 uppercase tracking-wider block mb-1">
                Available Brands in Showroom:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-2 py-0.5 rounded text-[11px] font-bold bg-beige/40 text-walnut border border-beige"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Block */}
        <div className="pt-3 border-t border-beige/60">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-semibold text-charcoal/60 tracking-wider block">
                Price Guidance
              </span>
              <span className="text-lg sm:text-xl font-bold text-walnut">
                {priceRange || 'Contact for Price'}
              </span>
            </div>
            {priceNote && (
              <span className="text-[10px] text-charcoal/60 text-right max-w-[130px] leading-tight">
                {priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={phoneUrl}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-beige/50 hover:bg-beige text-walnut font-medium text-xs transition-colors border border-beige"
            title="Call Showroom regarding this product"
          >
            <Phone className="w-3.5 h-3.5 text-sage" />
            <span>Call Now</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sage hover:bg-sage-600 text-white font-medium text-xs transition-colors shadow-xs"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
