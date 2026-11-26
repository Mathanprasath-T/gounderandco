import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-8xl font-bold text-walnut/20 block tracking-tight">
          404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-walnut">
          Page Not Found
        </h1>
        <p className="text-sm text-charcoal-muted leading-relaxed">
          The showroom page you are looking for does not exist or may have moved. Please return to the homepage or explore our furniture collection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sage hover:bg-sage-600 text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/furniture"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-beige hover:bg-beige-dark text-walnut text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Furniture</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

