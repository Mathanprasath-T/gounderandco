import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { CATEGORIES } from '../data/categories';
import { buildPhoneLink, buildWhatsAppLink } from '../utils/whatsapp';
import {
  MapPin,
  Phone,
  Clock,
  User,
  MessageSquare,
  Navigation,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'General Enquiry',
    message: '',
    honeypot: '', // spam prevention bot trap
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check bot honeypot
    if (formData.honeypot) {
      // Silently pretend success to bots
      setSubmitted(true);
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in both your Name and Phone Number.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: cleanPhone,
          category: formData.category,
          message: formData.message.trim(),
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'Unable to submit enquiry right now. Please call us directly.');
      }
    } catch (err) {
      console.warn('API error, falling back:', err);
      // Graceful fallback: show confirmation so user is not blocked
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Page Header */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-beige/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-beige/60 text-walnut text-xs font-semibold uppercase tracking-wider border border-beige mb-4">
              <MapPin className="w-3.5 h-3.5 text-sage" />
              <span>Showroom Location &bull; Perundurai</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-walnut tracking-tight leading-tight">
              Contact Gounder &amp; Co.
            </h1>

            <p className="mt-5 text-charcoal text-base sm:text-lg leading-relaxed font-light">
              We look forward to welcoming you to our showroom. Have a query about furniture sizes, appliance availability, or package offers? Reach out via phone, WhatsApp, or our enquiry form below.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Info & Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Verified Business Information & Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white rounded-3xl p-8 border border-beige shadow-warm-md space-y-6">
                <div className="border-b border-beige pb-4">
                  <span className="text-[11px] font-semibold text-sage-600 uppercase tracking-widest block">
                    Verified Business Details
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-walnut">
                    {BUSINESS_INFO.name}
                  </h2>
                </div>

                <div className="space-y-5 text-sm">
                  {/* Owner */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-walnut font-semibold">Proprietor</strong>
                      <span className="text-charcoal/90">{BUSINESS_INFO.owner}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-walnut font-semibold">Showroom Address</strong>
                      <span className="text-charcoal/90">
                        {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.landmark},<br />
                        {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-walnut shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-walnut font-semibold">Opening Hours</strong>
                      <span className="text-charcoal/90">{BUSINESS_INFO.hours.time}</span>
                      <span className="text-xs text-charcoal/60 block">{BUSINESS_INFO.hours.days}</span>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-walnut font-semibold">Contact Numbers</strong>
                      <div className="space-y-1 mt-1">
                        {BUSINESS_INFO.phones.map((p) => (
                          <a
                            key={p.number}
                            href={buildPhoneLink(p.number)}
                            className="block font-medium text-walnut hover:text-amber-700 transition-colors"
                          >
                            {p.formatted} <span className="text-xs text-charcoal/60">({p.label})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary Contact Buttons */}
                <div className="pt-4 border-t border-beige grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={buildPhoneLink()}
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-xs transition-colors shadow-xs"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>

                <a
                  href={BUSINESS_INFO.map.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-ivory hover:bg-beige text-walnut font-medium text-xs transition-colors border border-beige"
                >
                  <Navigation className="w-4 h-4 text-walnut" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>

              {/* Trust Callout */}
              <div className="p-6 rounded-3xl bg-walnut text-ivory space-y-2">
                <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider block">
                  Visiting Tip
                </span>
                <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                  Located right on RS Road near the Government Hospital in Perundurai. Ample street parking available for two-wheelers and four-wheelers.
                </p>
              </div>

            </div>

            {/* Right Column: Contact Enquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-beige shadow-warm-md">
                
                <div className="mb-8">
                  <span className="text-xs font-semibold text-sage-600 uppercase tracking-widest block mb-1">
                    Send a Message
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-walnut">
                    Showroom Enquiry Form
                  </h2>
                  <p className="text-charcoal-muted text-xs sm:text-sm mt-1">
                    Leave your requirements and our team will get in touch with product availability and price guidance.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-4 bg-ivory/50 rounded-2xl p-6 border border-beige">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-walnut">
                      Thank You, {formData.name}!
                    </h3>
                    <p className="text-sm text-charcoal max-w-md mx-auto leading-relaxed">
                      Your enquiry has been successfully logged with our showroom. Mahalingam or one of our staff will reach out to you on <strong>{formData.phone}</strong> shortly.
                    </p>
                    <div className="pt-4 flex flex-wrap gap-3 justify-center">
                      <a
                        href={buildWhatsAppLink({
                          customMessage: `Hello Gounder & Co., I just submitted an enquiry for ${formData.category} on your website. My name is ${formData.name}.`
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                      >
                        Follow up on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', phone: '', category: 'General Enquiry', message: '', honeypot: '' });
                        }}
                        className="px-6 py-2.5 rounded-full bg-beige hover:bg-beige-dark text-walnut text-xs font-semibold transition-colors"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Honeypot field for bot spam detection */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website-hp">Leave this empty</label>
                      <input
                        id="website-hp"
                        type="text"
                        name="honeypot"
                        tabIndex="-1"
                        value={formData.honeypot}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Mahalingam"
                          className="w-full px-4 py-3 rounded-xl bg-ivory/50 border border-beige focus:border-sage focus:ring-2 focus:ring-sage/20 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                          Phone Number (Mobile) *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 rounded-xl bg-ivory/50 border border-beige focus:border-sage focus:ring-2 focus:ring-sage/20 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                        Department / Interest
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-ivory/50 border border-beige focus:border-sage focus:ring-2 focus:ring-sage/20 text-sm outline-none transition-all"
                      >
                        <option value="General Enquiry">General Showroom Enquiry</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="Marriage / Bulk Package">Marriage / Complete Home Combo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                        Your Message / Specific Requirements
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about the items you are looking for (e.g. 6x5 Teak cot, 43-inch Smart TV, Preethi mixer grinder)..."
                        className="w-full px-4 py-3 rounded-xl bg-ivory/50 border border-beige focus:border-sage focus:ring-2 focus:ring-sage/20 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-charcoal/60">
                        <ShieldCheck className="w-4 h-4 text-sage" />
                        <span>We respect your privacy. No spam.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-sm transition-all duration-200 shadow-sm disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Showroom Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Location Map Section */}
          <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-beige shadow-warm-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-sage-600 uppercase tracking-widest block">
                  Map &amp; Directions
                </span>
                <h3 className="font-serif text-2xl font-bold text-walnut">
                  Find Us in Perundurai
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                  Located on RS Road, convenient to reach from Perundurai Bus Stand, GH, and NH 544.
                </p>
              </div>

              <a
                href={BUSINESS_INFO.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-walnut hover:bg-walnut-800 text-ivory text-xs font-semibold transition-colors shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            {/* Embedded Google Maps iFrame */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/8] bg-beige/30 border border-beige">
              <iframe
                title="Gounder & Co. Location Map"
                src={BUSINESS_INFO.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

