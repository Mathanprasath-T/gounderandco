import React from 'react';

export default function Logo({ size = 'md', variant = 'walnut', className = '' }) {
  const sizeMap = {
    sm: { container: 'w-8 h-8', text: 'text-sm' },
    md: { container: 'w-10 h-10', text: 'text-base' },
    lg: { container: 'w-12 h-12', text: 'text-lg' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const bgStyle =
    variant === 'sage'
      ? 'bg-sage text-ivory border border-sage-600/40'
      : variant === 'ivory'
        ? 'bg-ivory text-walnut border border-beige'
        : 'bg-walnut text-ivory border border-walnut-800';

  return (
    <div
      className={`${currentSize.container} rounded-xl ${bgStyle} flex items-center justify-center shadow-sm select-none transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="Gounder &amp; Co. Monogram"
    >
      <span className={`font-serif font-bold ${currentSize.text} tracking-tighter leading-none`}>
        GC
      </span>
    </div>
  );
}
