import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FurniturePage from './pages/FurniturePage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import { MessageSquare } from 'lucide-react';
import { buildWhatsAppLink } from './utils/whatsapp';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans selection:bg-sage/20 selection:text-walnut">
      <ScrollToTop />
      
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/furniture" element={<FurniturePage />} />
          {/* Category Exploration Pages */}
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/furniture/:slug" element={<CategoryPage />} />
          {/* Contact Us Page */}
          <Route path="/contact" element={<ContactPage />} />
          {/* 404 Catch All */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Persistent Showroom Footer */}
      <Footer />

      {/* Floating WhatsApp Action Pill */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          title="Chat with Gounder & Co. on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Enquiry</span>
        </a>
      </aside>
    </div>
  );
}

