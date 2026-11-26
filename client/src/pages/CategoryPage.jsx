import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { BUSINESS_INFO } from '../data/businessInfo';
import ProductCard from '../components/ProductCard';
import EnquiryModal from '../components/EnquiryModal';
import { ArrowLeft, Sparkles, Filter, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';

export default function CategoryPage() {
  const { slug } = useParams();
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalState, setModalState] = useState({ isOpen: false, product: null });

  // Match category
  const category = CATEGORIES.find(
    (c) => c.slug === slug || c.id === slug
  );

  // If not found, redirect to furniture overview
  if (!category) {
    return <Navigate to="/furniture" replace />;
  }

  // Filter products belonging to this category
  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.categoryId === category.id);
  }, [category.id]);

  // Unique subcategories for filtering
  const subCategories = useMemo(() => {
    const list = ['All', ...new Set(categoryProducts.map((p) => p.subCategory).filter(Boolean))];
    return list;
  }, [categoryProducts]);

  // Filtered list
  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return categoryProducts;
    return categoryProducts.filter((p) => p.subCategory === activeFilter);
  }, [categoryProducts, activeFilter]);

  const handleQuickEnquire = (product) => {
    setModalState({ isOpen: true, product: product.name });
  };

  return (
    <div className="bg-ivory min-h-screen">
      
      {/* Category Hero Banner */}
      <section className="relative bg-walnut text-ivory py-16 lg:py-24 overflow-hidden">
        {/* Background photo with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={category.heroImage}
            alt={category.name}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-walnut via-walnut/90 to-walnut/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/furniture"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Categories</span>
          </Link>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-walnut-800 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-walnut-600">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{category.featuredBadge}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {category.name}
            </h1>

            <p className="text-ivory/90 text-base sm:text-lg leading-relaxed font-light">
              {category.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <div className="px-3.5 py-1.5 rounded-full bg-ivory/15 backdrop-blur-sm border border-ivory/20">
                <span className="text-ivory/70">Indicative Category Range: </span>
                <strong className="text-white">{category.indicativeRange}</strong>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-ivory/15 backdrop-blur-sm border border-ivory/20">
                <span className="text-ivory/70">Verified Collections: </span>
                <strong className="text-white">{categoryProducts.length} Product Lines</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Browsing Section */}
      <section className="py-12 lg:py-20" aria-label={`${category.name} Catalog`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Subcategory Filter Pills */}
          {subCategories.length > 2 && (
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-beige">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-charcoal uppercase tracking-wider mr-2">
                <Filter className="w-3.5 h-3.5 text-sage" />
                <span>Filter by:</span>
              </div>

              {subCategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveFilter(sub)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeFilter === sub
                      ? 'bg-walnut text-ivory shadow-xs'
                      : 'bg-white text-charcoal hover:bg-beige/60 border border-beige'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Indicative Pricing Transparency Notice */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start sm:items-center gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong>Pricing Notice:</strong> Displayed prices are client-provided indicative showroom ranges. Individual prices vary by model, wood finish, size, and seasonal promotional schemes. Please call or WhatsApp our showroom for live quotes.
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickEnquire={handleQuickEnquire}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-beige">
              <p className="text-charcoal-muted">No items found for this subcategory filter.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="mt-3 text-xs font-semibold text-sage underline"
              >
                Reset filter
              </button>
            </div>
          )}

          {/* Showroom Direct Assistance Box */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-beige shadow-warm-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold text-walnut">
                Looking for a Specific Model or Custom Dimensions?
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted">
                Our showroom inventory updates weekly with the newest arrivals from top manufacturers.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={buildPhoneLink()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-beige hover:bg-beige-dark text-walnut text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sage" />
                <span>Call Showroom</span>
              </a>

              <a
                href={buildWhatsAppLink({ categoryName: category.name })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sage hover:bg-sage-600 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Sister Category Links */}
          <div className="mt-12 pt-8 border-t border-beige flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal/70 gap-4">
            <span className="font-semibold uppercase tracking-wider">Other Showroom Departments:</span>
            <div className="flex flex-wrap gap-4">
              {CATEGORIES.filter((c) => c.id !== category.id).map((other) => (
                <Link
                  key={other.id}
                  to={`/category/${other.slug}`}
                  className="text-walnut hover:text-amber-700 font-medium underline"
                >
                  Explore {other.name} &rarr;
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, product: null })}
        preselectedProduct={modalState.product}
        preselectedCategory={category.name}
      />
    </div>
  );
}

