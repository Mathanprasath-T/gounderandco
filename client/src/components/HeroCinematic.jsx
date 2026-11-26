import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../data/businessInfo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// Curated sequence of showroom camera transition viewpoints
// Using verified local showroom and furniture assets
const HERO_STILL_FRAMES = [
  '/images/hero/hero-living-room.svg',
  '/images/furniture/sofa-set.jpg',
  '/images/hero/hero-dining-room.svg',
  '/images/furniture/dining-table.jpg',
  '/images/furniture/wooden-cot.png',
  '/images/furniture/mattress.jpg'
];

export default function HeroCinematic() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion or on small screens, we skip scroll-pinning for battery & accessibility
    const isMobile = window.innerWidth < 768;
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isMounted = true;
    const loadedImages = [];
    let activeFrameIndex = 0;

    // Set canvas internal resolution to viewport
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      renderFrame(activeFrameIndex);
    };

    const renderFrame = (index) => {
      if (!ctx || !canvas) return;
      const img = loadedImages[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Aspect cover math
      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, nx, ny, nw, nh);

      // Warm cinematic vignette & tone overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, ch);
      gradient.addColorStop(0, 'rgba(41, 39, 34, 0.45)');
      gradient.addColorStop(0.5, 'rgba(79, 52, 38, 0.35)');
      gradient.addColorStop(1, 'rgba(41, 39, 34, 0.85)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cw, ch);
    };

    // Preload frames progressively
    let loadedCount = 0;
    HERO_STILL_FRAMES.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[idx] = img;
        loadedCount++;
        if (idx === 0) {
          handleResize();
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        if (idx === 0) setLoadError(true);
      };
    });

    handleResize();
    window.addEventListener('resize', handleResize);

    // GSAP ScrollTrigger Sequence
    const ctxGsap = gsap.context(() => {
      const scrollObj = { frame: 0 };
      const totalFrames = HERO_STILL_FRAMES.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Determine active frame smoothly based on progress
          const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(progress * totalFrames)
          );
          if (frameIndex !== activeFrameIndex && loadedImages[frameIndex]) {
            activeFrameIndex = frameIndex;
            renderFrame(frameIndex);
          }

          // Elegant content layer fade and slight upward float as user travels through the showroom
          if (contentRef.current) {
            const contentOpacity = Math.max(0, 1 - progress * 1.6);
            const contentTranslateY = progress * -40;
            contentRef.current.style.opacity = contentOpacity.toString();
            contentRef.current.style.transform = `translateY(${contentTranslateY}px)`;
            contentRef.current.style.pointerEvents = contentOpacity < 0.2 ? 'none' : 'auto';
          }
        },
      });
    }, containerRef);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, [prefersReducedMotion]);

  const scrollToCategories = () => {
    const el = document.getElementById('product-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90vh] md:h-screen overflow-hidden bg-walnut-900 select-none"
      aria-label="Cinematic Showroom Showcase"
    >
      {/* Background Canvas: Cinematic Frame Sequence on Desktop */}
      <canvas
        ref={canvasRef}
        className="hidden md:block absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Fallback & Mobile View Background: Premium Sunlit Showroom Image */}
      <div
        className={`md:hidden absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700 ${loadError ? 'bg-walnut' : ''
          }`}
        style={{
          backgroundImage: `url('${HERO_STILL_FRAMES[0]}')`,
        }}
      >
        <div className="absolute inset-0 warm-overlay" />
      </div>

      {/* Editorial Content Overlay (Always Accessible & High-Contrast) */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Trust Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ivory/15 backdrop-blur-md border border-ivory/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{BUSINESS_INFO.trustBadge}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08] max-w-4xl drop-shadow-md text-balance">
          {BUSINESS_INFO.tagline}
        </h1>

        {/* Supporting Description */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-ivory/90 max-w-2xl font-light leading-relaxed drop-shadow-sm text-balance">
          {BUSINESS_INFO.supportingText}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={scrollToCategories}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-sage hover:bg-sage-600 text-white font-medium text-base shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
          >
            <span>Explore Collections</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ivory/20 hover:bg-ivory/30 backdrop-blur-md text-white border border-ivory/40 font-medium text-base transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <PhoneCall className="w-4 h-4 text-amber-300" />
            <span>Contact Us</span>
          </Link>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 text-xs tracking-wider uppercase font-medium">
          <span>Scroll to explore showroom</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-300" />
        </div>
      </div>
    </section>
  );
}

