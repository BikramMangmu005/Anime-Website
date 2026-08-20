"use client";

import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    description: "Immerse yourself in a breathtaking world of dark fantasy and gripping animation. Follow legendary warriors as they battle through peril and unfold stories of resilience."
  },
  {
    id: 2,
    title: "Basketball Action",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop",
    description: "Experience high-octane sports energy and fierce competitive spirit. Witness breathtaking plays, explosive athletic feats, and unforgettable moments captured in motion."
  },
  {
    id: 3,
    title: "Mountain Landscapes",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    description: "Explore the majestic beauty of untouched wilderness, soaring towering peaks, and serene natural horizons that stretch infinitely across the breathtaking terrain."
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSlide = slides[currentIndex];

  // Helper to re-order slides so the active one is always displayed first in the row
  const getOrderedSlides = () => {
    const arr = [...slides];
    return arr.slice(currentIndex).concat(arr.slice(0, currentIndex));
  };

  const displaySlides = getOrderedSlides();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0707] text-white font-sans selection:bg-white/20">
      {/* Background Image with Dynamic Blur & Zoom */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 blur-[3px] scale-105 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url('${activeSlide.bg}')`,
        }}
      />
      
      {/* Sophisticated Multi-layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0707] via-[#0a0707]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0707] via-transparent to-[#0a0707]/40" />

      {/* Main Layout Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 md:px-12 lg:px-20 py-8">
        
        {/* Navigation Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-lg md:text-xl font-bold tracking-widest uppercase font-serif">
              Bikram Anime
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
            {['Discover', 'Styles', 'Contacts', 'Login'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="relative hover:text-white transition-colors duration-200 py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-xs tracking-wider text-gray-200 border border-white/10 uppercase">
              <span>Featured Showcase</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-wide text-white leading-[1.1]">
              {activeSlide.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              {activeSlide.description}
            </p>

            <div className="pt-2">
              <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200 hover:shadow-2xl hover:shadow-white/20 active:scale-95 cursor-pointer">
                <span>Explore Now</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Horizontal Cards Carousel */}
          <div className="lg:col-span-7 flex items-center space-x-5 overflow-x-auto pb-6 pt-2 scrollbar-none">
            {displaySlides.map((slide, idx) => {
              const isCurrent = idx === 0;

              return (
                <div 
                  key={slide.id}
                  onClick={() => setCurrentIndex(slides.findIndex(s => s.id === slide.id))}
                  className={`group relative flex-shrink-0 overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-out shadow-2xl ${
                    isCurrent 
                      ? "h-[380px] w-[280px] sm:w-[330px] border-4 border-white/90 shadow-white/10 scale-100" 
                      : idx === 1
                      ? "h-[330px] w-[230px] sm:w-[270px] opacity-75 hover:opacity-100 scale-95" 
                      : "h-[330px] w-[180px] sm:w-[210px] opacity-40 hover:opacity-75 scale-90"
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Card Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Card Title Label on Hover/Active */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-xs tracking-wider uppercase text-gray-300 font-medium">
                      {isCurrent ? "Active View" : "Click to view"}
                    </p>
                    <h4 className="text-sm font-semibold text-white truncate">
                      {slide.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

        </main>

        {/* Footer Pagination Navigation */}
        <footer className="flex flex-col sm:flex-row items-center justify-between pb-4 gap-4">
          <div className="text-xs tracking-widest text-gray-400 uppercase">
            0{currentIndex + 1} / 0{slides.length}
          </div>

          <div className="flex space-x-2.5">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full cursor-pointer transition-all duration-500 ${
                  currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-gray-500 hidden sm:block">
            Designed with Tailwind CSS
          </div>
        </footer>

      </div>
    </div>
  );
}