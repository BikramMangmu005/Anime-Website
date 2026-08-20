"use client";

import React, { useState } from 'react';

const slides = [
  {
    id: 1,
    title: "Demon Slayer",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop",
    description: "Lorem ipsum dolor sit amet consectetur. Nam vitae egestas ut tempus. Condimentum nec sed ut tempor vestibulum laoreet posuere pulvinar. Arcu gravida risus accumsan venenatis."
  },
  {
    id: 2,
    title: "Basketball Action",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop",
    description: "Experience high-octane sports energy and competitive spirit. Witness breathtaking plays and unforgettable moments captured in dynamic motion."
  },
  {
    id: 3,
    title: "Mountain Landscapes",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
    description: "Explore the breathtaking beauty of untouched wilderness, towering peaks, and serene natural horizons that stretch as far as the eye can see."
  }
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeSlide = slides[currentIndex];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#120e0e] text-white font-sans">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 blur-[2px] scale-105 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${activeSlide.bg}')`,
        }}
      />
      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/60" />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 py-6 lg:px-16">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between">
          <div className="text-xl tracking-wider font-bold">
            Bikram Anime
          </div>
          <nav className="flex items-center space-x-8 text-sm font-medium text-gray-300">
            <a href="#discover" className="hover:text-white transition">Discover</a>
            <a href="#styles" className="hover:text-white transition">Styles</a>
            <a href="#contacts" className="hover:text-white transition">Contacts</a>
            <a href="#login" className="hover:text-white transition">Login</a>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-12">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6 transition-all duration-500">
            <h1 className="text-4xl lg:text-5xl font-serif tracking-wide text-white">
              {activeSlide.title}
            </h1>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-md">
              {activeSlide.description}
            </p>
            <div>
              <button className="rounded-full bg-white/25 hover:bg-white/35 backdrop-blur-md px-6 py-3 text-sm font-medium text-white transition border border-white/10 shadow-lg cursor-pointer">
                Explore now
              </button>
            </div>
          </div>

          {/* Right Cards Stack Preview Container */}
          <div className="lg:col-span-7 relative h-[420px] flex items-center justify-center lg:justify-start">
            <div className="relative w-[320px] sm:w-[350px] h-[380px] flex items-center justify-center">
              {slides.map((slide, idx) => {
                // Calculate distance relative to current index
                const position = (idx - currentIndex + slides.length) % slides.length;

                let transformStyle = "";
                let zIndex = 0;
                let opacity = "opacity-100";
                let pointerEvents = "pointer-events-auto";

                if (position === 0) {
                  // Active Card: Center foreground
                  transformStyle = "translate-x-0 scale-100 rotate-0";
                  zIndex = 30;
                  opacity = "opacity-100";
                } else if (position === 1) {
                  // Next Card: Staggered to the right
                  transformStyle = "translate-x-20 sm:translate-x-28 scale-90 rotate-3";
                  zIndex = 20;
                  opacity = "opacity-80 hover:opacity-100";
                } else {
                  // Back Card: Staggered further right or tucked behind
                  transformStyle = "translate-x-36 sm:translate-x-48 scale-80 rotate-6";
                  zIndex = 10;
                  opacity = "opacity-50 hover:opacity-80";
                }

                return (
                  <div 
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`absolute inset-0 h-[380px] w-[300px] sm:w-[340px] overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-in-out shadow-2xl border-4 border-white/80 ${transformStyle} ${opacity} ${pointerEvents}`}
                    style={{ zIndex }}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="h-full w-full object-cover pointer-events-none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

        </main>

        {/* Carousel Pagination Dots */}
        <footer className="flex justify-center pb-4">
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <span 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </footer>

      </div>
    </div>
  );
}