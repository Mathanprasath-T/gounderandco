import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle, Award, Compass, PhoneCall, ShieldCheck } from 'lucide-react';
import HeroCinematic from '../components/ShowroomHero3D';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BrandShowcase from '../components/BrandShowcase';
import EnquiryModal from '../components/EnquiryModal';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BUSINESS_INFO } from '../data/businessInfo';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';

export default function HomePage() {
  const [modalState, setModalState] = useState({ isOpen: false, product: null });

  // Curate popular featured products
  const featuredProducts = PRODUCTS.filter((p) => p.popular).slice(0, 6);

  const handleQuickEnquire = (product) => {
    setModalState({ isOpen: true, product: product.name });
  };

  return (
    <div className="space-y-0">
      {/* 5.A: Cinematic Hero Section with Scroll Canvas Animation */}
      <HeroCinematic />

      {/* 5.B: Company Introduction (Split Layout) */}
      <section className="py-20 lg:py-28 bg-ivory" aria-labelledby="company-intro-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: High-Quality Showroom & Furniture Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-warm-xl border border-beige aspect-[4/3] bg-beige/40">
                <img
                  src="/images/company/showroom-at-dusk.png"
                  alt="Gounder & Co. Showroom storefront at dusk on RS Road, Perundurai"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/images/furniture/wooden-cot.png'; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-walnut/60 via-transparent to-transparent" />

                {/* Float Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-ivory/95 backdrop-blur-md border border-beige/80 shadow-warm-md flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-charcoal/60 font-semibold block">
                      Perundurai Showroom
                    </span>
                    <span className="font-serif text-lg font-bold text-walnut">
                      RS Road, Near GH
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-sage text-white text-xs font-semibold">
                    Open 9 AM – 9 PM
                  </span>
                </div>
              </div>

              {/* Decorative Accent Pill */}
              <div className="hidden sm:flex absolute -top-5 -left-5 bg-walnut text-ivory px-5 py-3 rounded-2xl shadow-warm-lg items-center gap-2.5 border border-walnut-600">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  30 Years of Trust
                </span>
              </div>
            </div>

            {/* Right: Editorial Story & Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige/60 text-walnut text-xs font-semibold uppercase tracking-wider border border-beige">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Our Heritage</span>
              </div>

              <h2 id="company-intro-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut leading-tight text-balance">
                A Home for Every Essential.
              </h2>

              <p className="text-charcoal text-base sm:text-lg leading-relaxed font-light">
                For over three decades, <strong>Gounder &amp; Co.</strong> has been a trusted destination for families in Perundurai and throughout the Erode region looking to furnish and elevate their homes.
              </p>

              <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed">
                Founded with a commitment to enduring quality and honest service, our showroom brings together handpicked wooden cots, dining suites, plush living room sofas, high-air fans, heavy-duty mixer grinders, and leading smart televisions — ensuring your home receives the care and craftsmanship it truly deserves.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-beige">
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-walnut">30+ Years</span>
                  <p className="text-xs text-charcoal/70">Continuous community presence and customer trust.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-walnut">3 Core Categories</span>
                  <p className="text-xs text-charcoal/70">Furniture, everyday appliances &amp; modern electronics.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-warm-md hover:-translate-y-0.5"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={buildPhoneLink()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-beige/40 text-walnut font-medium text-sm transition-colors border border-beige"
                >
                  <PhoneCall className="w-4 h-4 text-sage" />
                  <span>Call Showroom</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5.C: Product Categories (Exactly Three Prominent Image-Led Cards) */}
      <section id="product-categories" className="py-20 lg:py-28 bg-white border-y border-beige/60" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ivory text-walnut text-xs font-semibold uppercase tracking-wider border border-beige mb-3">
              <Compass className="w-3.5 h-3.5 text-sage" />
              <span>Showroom Collections</span>
            </div>
            <h2 id="categories-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut">
              Three Distinct Showroom Departments
            </h2>
            <p className="mt-4 text-charcoal-muted text-sm sm:text-base leading-relaxed">
              Explore our core departments — each thoughtfully equipped with verified products, dependable warranties, and personalized guidance from our showroom staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                priority={index === 0}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 5.D: Featured Products Curated Showcase */}
      <section className="py-20 lg:py-28 bg-ivory" aria-labelledby="featured-products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige/60 text-walnut text-xs font-semibold uppercase tracking-wider border border-beige mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Featured Highlights</span>
              </div>
              <h2 id="featured-products-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-walnut">
                Curated Home Selections
              </h2>
              <p className="mt-3 text-charcoal-muted text-sm sm:text-base max-w-xl">
                A preview of popular pieces and appliances currently favored by families across Perundurai.
              </p>
            </div>

            <Link
              to="/furniture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-walnut hover:bg-walnut-800 text-ivory text-sm font-medium transition-all duration-200 self-start md:self-auto shadow-sm"
            >
              <span>View All 3 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickEnquire={handleQuickEnquire}
              />
            ))}
          </div>

          {/* Bottom Banner to Visit Furniture Section */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-walnut text-ivory relative overflow-hidden shadow-warm-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left z-10">
              <span className="text-amber-300 uppercase tracking-widest text-xs font-semibold">
                Personalized Showroom Consultation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Looking for Custom Wooden Furniture or Bulk Packages?
              </h3>
              <p className="text-ivory/80 text-sm max-w-xl">
                Visit Gounder &amp; Co. on RS Road, Perundurai or speak directly with Mahalingam for customized sizes and home marriage combo packages.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 z-10 shrink-0">
              <a
                href={buildPhoneLink()}
                className="px-6 py-3 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
              >
                Call: {BUSINESS_INFO.phones[0].number}
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-ivory text-walnut hover:bg-white font-medium text-xs sm:text-sm transition-colors"
              >
                Visit Showroom
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 5.E: Trusted Brands Showcase */}
      <BrandShowcase />

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, product: null })}
        preselectedProduct={modalState.product}
      />
    </div>
  );
}

