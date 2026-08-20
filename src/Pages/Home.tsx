import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import demonSlayer from "../assets/images/DShashiraarc.jpeg";
import demonsBG from "../assets/images/demon-slayer-3840x2160-17643.jpg";
import oneP from "../assets/images/onep.jpg";
import onepc from "../assets/images/onepc.jpeg";
import aotp from "../assets/images/AOTp.jpg";
import aotpc from "../assets/images/eren mikas.png";

import TrendingCard from "../components/Cards/TrendingCards";

const trendingData = [
  {
    id: 1,
    title: "Demon Slayer",
    info: "TV • 24 Episodes",
    image: demonSlayer,
  },
  {
    id: 2,
    title: "One Piece",
    info: "TV • 1100+ Episodes",
    image: oneP,
  },
  {
    id: 3,
    title: "Attack On Titan",
    info: "TV • 87 Episodes",
    image: aotp,
  },
  {
    id: 4,
    title: "One Piece",
    info: "TV • New Release",
    image: oneP,
  },
  {
    id: 5,
    title: "Attack On Titan",
    info: "TV • Popular",
    image: aotp,
  },
  {
    id: 6,
    title: "Demon Slayer",
    info: "TV • Featured",
    image: demonSlayer,
  },
];

const slides = [
  {
    id: 1,
    title: "Demon Slayer",
    image: demonSlayer,
    bg: demonsBG,
    description:
      "Lorem ipsum dolor sit amet consectetur. Nam vitae egestas ut tempus. Condimentum nec sed ut tempor vestibulum laoreet posuere pulvinar. Arcu gravida risus accumsan venenatis. Ullamcorper in magna viverra aliquet mi elementum.",
  },
  {
    id: 2,
    title: "One Piece",
    image: oneP,
    bg: onepc,
    description:
      "Explore the majestic beauty of untouched wilderness, soaring towering peaks, and serene natural horizons that stretch infinitely across the breathtaking terrain.",
  },
  {
    id: 3,
    title: "Attack On Titan",
    image: aotp,
    bg: aotpc,
    description:
      "Immerse yourself in modern structural designs, metropolitan cityscapes, and the fast-paced energy of urban environments.",
  },
];

export default function SnapStoryHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const CARD_STEP = 216;
  const hasDragged = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    hasDragged.current = false;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const distance = e.clientX - dragStartX;

    if (Math.abs(distance) > 5) {
      hasDragged.current = true;
    }

    let offset = distance;

    if (currentIndex === 0 && distance > 0) {
      offset = distance * 0.25;
    }

    if (currentIndex === slides.length - 1 && distance < 0) {
      offset = distance * 0.25;
    }

    setDragOffset(offset);
  };

  const finishDrag = () => {
    if (!isDragging) return;

    const movedCards = Math.round(-dragOffset / CARD_STEP);

    setCurrentIndex((prev) => {
      const next = prev + movedCards;
      return Math.max(0, Math.min(slides.length - 1, next));
    });

    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const active = slides[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-[#0d0a0a] text-white font-sans selection:bg-white/20">
      {/* Background */}
      <div
        key={currentIndex}
        className="absolute top-0 left-0 w-full h-[750px] bg-cover bg-center bg-no-repeat animate-slow-zoom animate-fade-in"
        style={{ backgroundImage: `url(${active.bg})` }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a0a]/50 via-[#0d0a0a]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a0a]/80 via-transparent to-[#0d0a0a]/60" />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 md:px-12 lg:px-20 py-6">
        <main className="relative min-h-175">
          {/* Left Content */}
          <div className="absolute left-0 bottom-7 lg:w-[42%] space-y-6 pb-6">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif tracking-wide text-white drop-shadow-md transition-all duration-700">
              {active.title}
            </h2>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md font-light transition-all duration-700">
              {active.description}
            </p>

            <div className="pt-2">
              <button className="rounded-full bg-[#2a2222]/80 hover:bg-[#382e2e] border border-white/10 px-7 py-3 text-xs tracking-wider uppercase font-medium text-white backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer">
                Explore now
              </button>
            </div>
          </div>

          {/* Right Card Slider */}
          <div className="absolute right-0 bottom-[10px] lg:w-[58%] flex flex-col items-center">
            <div className="relative w-full flex items-center">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-2 z-50 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Card Viewport */}
              <div
                className={`w-full overflow-hidden px-16 select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{ touchAction: "pan-y" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={finishDrag}
              >
                {/* Card Track */}
                <div
                  className={`flex items-center gap-4 ${
                    isDragging
                      ? ""
                      : "transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  } will-change-transform`}
                  style={{
                    transform: `translate3d(${
                      -(currentIndex * CARD_STEP) + dragOffset
                    }px, 0, 0)`,
                  }}
                >
                  {slides.map((slide, index) => {
                    const isCurrent = index === currentIndex;

                    return (
                      <div
                        key={slide.id}
                        onClick={() => {
                          if (!hasDragged.current) {
                            setCurrentIndex(index);
                          }
                        }}
                        className={`group relative h-75 w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-black transition-all duration-700 ease-out ${
                          isCurrent
                            ? "z-20 scale-100 border-2 border-white opacity-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                            : "border border-white/20 opacity-70 scale-95"
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          draggable={false}
                          className="pointer-events-none h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-sm font-semibold text-white">
                            {slide.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-2 z-50 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Trending Section */}
      <section className="relative z-30 w-full bg-[#0d0a0a] px-6 md:px-12 lg:px-20 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingData.map((item, index) => (
            <TrendingCard
              key={item.id}
              title={item.title}
              info={item.info}
              image={item.image}
              rank={index + 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
