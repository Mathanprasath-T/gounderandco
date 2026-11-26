import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, MapPin, Phone, ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { CATEGORIES } from '../data/categories';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      {/* Editorial Header */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-beige/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige/60 text-walnut text-xs font-semibold uppercase tracking-wider border border-beige mb-4">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>{BUSINESS_INFO.trustBadge}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-walnut tracking-tight leading-tight">
              {BUSINESS_INFO.aboutHeadline}
            </h1>

            <p className="mt-5 text-charcoal text-base sm:text-lg leading-relaxed font-light">
              Founded on principles of authentic materials, fair pricing, and enduring community trust, <strong>Gounder &amp; Co.</strong> is a landmark showroom for furniture, home appliances, and electronics in Perundurai.
            </p>
          </div>

          {/* Large Showroom Photograph Banner */}
          <div className="mt-12 relative rounded-3xl overflow-hidden shadow-warm-xl aspect-[16/9] sm:aspect-[21/9] bg-walnut-900 border border-beige">
            <img
              src="/images/company/showroom-at-dusk.png"
              alt="Gounder & Co. Showroom storefront at dusk on RS Road, Perundurai"
              onError={(e) => { e.currentTarget.src = '/images/furniture/wooden-cot.png'; }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between text-white gap-4">
              <div>
                <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest block">
                  Perundurai Showroom Experience
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold">
                  RS Road, Near Government Hospital
                </span>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-ivory/20 backdrop-blur-md text-xs font-medium self-start sm:self-auto border border-white/20">
                Proprietor: {BUSINESS_INFO.owner}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-beige/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-sage-600 uppercase tracking-widest block">
                Our Foundation &amp; Experience
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut leading-snug">
                Building Homes with Lasting Craftsmanship and Genuine Care
              </h2>

              <p className="text-charcoal text-base leading-relaxed">
                For three decades, our showroom on RS Road in Perundurai has been helping families furnish every corner of their living spaces. In an era where flat-pack and synthetic alternatives have become widespread, Gounder &amp; Co. remains dedicated to traditional, solid wooden furniture that stands up to decades of everyday use.
              </p>

              <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
                Whether you are setting up a new household, preparing for a wedding, or replacing an everyday kitchen appliance, our focus is always straightforward: guiding you to the right item for your budget and lifestyle, backed by reliable warranty and prompt local delivery.
              </p>

              {/* Core Pillars */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-ivory border border-beige/80">
                  <div className="flex items-center gap-2.5 mb-2">
                    <ShieldCheck className="w-5 h-5 text-sage" />
                    <h3 className="font-serif text-lg font-bold text-walnut">Authentic Materials</h3>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-relaxed">
                    Solid wood framing, genuine metals, and trusted brand engineering across all product tiers.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-ivory border border-beige/80">
                  <div className="flex items-center gap-2.5 mb-2">
                    <HeartHandshake className="w-5 h-5 text-amber-600" />
                    <h3 className="font-serif text-lg font-bold text-walnut">Community Trust</h3>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-relaxed">
                    Serving generations of local families in Perundurai and nearby towns with transparent guidance.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Quick facts card */}
            <div className="lg:col-span-5 bg-ivory rounded-3xl p-8 border border-beige shadow-warm-md space-y-6">
              <h3 className="font-serif text-2xl font-bold text-walnut border-b border-beige pb-3">
                Showroom Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut font-semibold">Experience</strong>
                    <span className="text-charcoal/80">30 Years serving Perundurai and Erode district</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut font-semibold">Location</strong>
                    <span className="text-charcoal/80">{BUSINESS_INFO.address.full}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-walnut shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut font-semibold">Operating Hours</strong>
                    <span className="text-charcoal/80">{BUSINESS_INFO.hours.time} ({BUSINESS_INFO.hours.days})</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-walnut font-semibold">Contact Persons</strong>
                    <span className="text-charcoal/80">Mahalingam (Proprietor) &bull; {BUSINESS_INFO.phones[0].number}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-beige">
                <a
                  href={buildPhoneLink()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Showroom: {BUSINESS_INFO.phones[0].number}</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Overview of 3 Product Departments */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-sage-600 uppercase tracking-widest block mb-2">
              Complete Home Solutions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut">
              What You Will Find at Gounder &amp; Co.
            </h2>
            <p className="mt-4 text-charcoal-muted text-sm sm:text-base leading-relaxed">
              Explore our three primary showroom departments, each tailored to make your living spaces comfortable, practical, and beautiful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-7 border border-beige shadow-warm-sm hover:shadow-warm-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-beige/30">
                    <img
                      src={cat.cardImage}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/images/company/showroom-at-dusk.png';
                      }}
                    />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-walnut">
                    {cat.name}
                  </h3>

                  <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider block mb-2">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal">
                      {cat.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-beige">
                  <Link
                    to={`/category/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-walnut hover:text-amber-700 transition-colors uppercase tracking-wider"
                  >
                    <span>Explore Department</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Showroom Imagery Mosaic */}
      <section className="py-20 bg-white border-t border-beige/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-walnut">
              Inside Our Showroom
            </h2>
            <p className="mt-3 text-charcoal-muted text-sm sm:text-base">
              Feel free to visit us in person to inspect wood finishes, test mattress comfort, and get live demonstrations of appliances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-beige/30 shadow-warm-sm">
              <img
                src="/images/furniture/sofa-set.jpg"
                alt="Living room furniture arrangement"
                onError={(e) => { e.currentTarget.src = '/images/company/showroom-at-dusk.png'; }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-beige/30 shadow-warm-sm">
              <img
                src="/images/furniture/dining-table.jpg"
                alt="Solid wood dining arrangements"
                onError={(e) => { e.currentTarget.src = '/images/company/showroom-at-dusk.png'; }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-beige/30 shadow-warm-sm">
              <img
                src="/images/appliances/mixer-grinder.jpg"
                alt="Kitchen appliances and cookware display"
                onError={(e) => { e.currentTarget.src = '/images/company/showroom-at-dusk.png'; }}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          {/* Visit CTA */}
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-sm transition-all duration-200 shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5"
            >
              <span>Visit Our Showroom in Perundurai</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

