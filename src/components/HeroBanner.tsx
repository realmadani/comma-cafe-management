import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../data/menuData';

interface HeroBannerProps {
  onCtaClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onCtaClick }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  return (
    <section className="relative w-full rounded-[28px] bg-[#0B6E4F] text-white overflow-hidden shadow-clay-float p-5 sm:p-6 flex flex-col justify-between min-h-[220px] transition-all">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#00543B] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#056C4D] rounded-full blur-2xl opacity-50 pointer-events-none" />

      <div className="grid grid-cols-12 gap-2 items-center relative z-10">
        {/* Text Content (7 cols) */}
        <div className="col-span-7 flex flex-col items-start text-right">
          <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-[#FFF8F1] text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2">
            <span className="material-symbols-outlined text-[14px] fill-icon text-[#98EDC6]">
              local_cafe
            </span>
            {slide.tag}
          </span>

          <h2 className="font-headline text-[20px] sm:text-[23px] font-extrabold text-white leading-tight mb-1.5">
            {slide.title1}
            <br />
            {slide.title2}
          </h2>

          <p className="text-[11.5px] sm:text-[12px] text-[#98EDC6] line-clamp-2 mb-3.5 opacity-90 leading-relaxed font-normal">
            {slide.description}
          </p>

          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 bg-white text-[#0B6E4F] text-[13px] font-bold px-4 py-2.5 rounded-full shadow-clay-card hover:bg-[#FAF3EA] active:scale-95 transition-all group cursor-pointer"
            type="button"
          >
            <span>{slide.ctaText}</span>
            <span className="material-symbols-outlined text-[17px] transform group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
          </button>
        </div>

        {/* Hero Food Image Nest (5 cols) */}
        <div className="col-span-5 relative flex justify-center items-center">
          <div className="relative w-32 h-32 sm:w-38 sm:h-38 rounded-full p-1.5 bg-gradient-to-tr from-white/30 to-transparent">
            <img
              src={slide.image}
              alt={slide.title1}
              className="w-full h-full object-cover rounded-full shadow-clay-card transform -rotate-6 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* Banner Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3 pt-1 z-10">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlideIndex === index
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
            title={`اسلاید ${index + 1}`}
            aria-label={`اسلاید ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
};
