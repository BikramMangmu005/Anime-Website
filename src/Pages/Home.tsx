import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Anime, CombinedSlide } from "../types/Anime-Types";

import useHeroSlider from "../hooks/Main-UI-Pointer_Slider";
import { getAllAnime } from "../api/Anime-Api";

import TrendingData from "./Slides/Trending-Anime-Slides";
import PopularAnimeSlides from "./Slides/Popular-Anime-Slides";
import RecentlyAddedAnime from "./Slides/Recently-Added-Anime";

export default function SnapStoryHero() {
  const navigate = useNavigate();
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await getAllAnime();
        setAnime(data);
      } catch (err) {
        console.error("Failed to fetch anime:", err);
        setError("Failed to load anime.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const animeSlides: CombinedSlide[] = anime.map((dbAnime) => ({
    id: dbAnime.id,
    title: dbAnime.title,
    image: dbAnime.image,
    background: dbAnime.background,
  }));

  const {
    currentIndex,
    isDragging,
    dragOffset,
    CARD_STEP,
    active,
    handlePointerDown,
    handlePointerMove,
    handleCardClick,
    finishDrag,
    handlePrev,
    handleNext,
  } = useHeroSlider(animeSlides);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0a0a] text-white">
        <p className="text-lg">Loading anime...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0a0a] text-white">
        <p className="text-lg text-red-400">{error}</p>
      </div>
    );
  }

  // No anime found
  if (animeSlides.length === 0 || !active) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0a0a] text-white">
        <p className="text-lg">No anime found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-[#0d0a0a] text-white font-sans selection:bg-white/20">
      {/* Background */}
      <div
        key={currentIndex}
        className="absolute top-0 left-0 w-full h-[750px] bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: active.background
            ? `url(http://localhost:5000${active.background})`
            : "none",
        }}
      />

      {/* Gradients */}
      <div className="absolute inset-0 h-[750px] bg-gradient-to-r from-[#0d0a0a]/80 via-[#0d0a0a]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 h-[750px] bg-gradient-to-t from-[#0d0a0a] via-transparent to-[#0d0a0a]/60 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex min-h-[750px] flex-col justify-between px-6 md:px-12 lg:px-20 py-6">
        <main className="relative min-h-[600px] flex flex-col lg:flex-row items-end justify-between pt-24 lg:pt-32">
          {/* Left Content */}
          <div className="w-full lg:w-[42%] space-y-6 pb-6 z-20">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif tracking-wide text-white drop-shadow-md transition-all duration-700">
              {active.title}
            </h2>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md font-light transition-all duration-700">
              {active.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Watch Now */}
              <button
                type="button"
                onClick={() => navigate(`/slide/${active.id}`)}
                className="group inline-flex items-center justify-between gap-3 rounded-full bg-[#48A111] px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_8px_30px_rgba(72,161,17,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#56B91A] hover:shadow-[0_10px_35px_rgba(72,161,17,0.4)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#48A111]/50 cursor-pointer"
              >
                <span>Watch Now</span>
              </button>

              {/* Details */}
              <button
                type="button"
                onClick={() => navigate(`/slide/${active.id}`)}
                className="group inline-flex items-center justify-between gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:border-white/30 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
              >
                <span>Details</span>
              </button>
            </div>
          </div>

          {/* Right Card Slider */}
          <div className="w-full lg:w-[58%] flex flex-col items-center mt-10 lg:mt-0 z-20">
            <div className="relative w-full flex items-center">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-0 z-50 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl -translate-x-3 lg:-translate-x-6"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Card Viewport */}
              <div
                className={`w-full overflow-hidden px-12 select-none ${
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
                    transform: `translate3d(${-(currentIndex * CARD_STEP) + dragOffset}px, 0, 0)`,
                  }}
                >
                  {animeSlides.map((slide, index) => {
                    const isCurrent = index === currentIndex;
                    const image = slide.image;

                    return (
                      <div
                        key={slide.id}
                        onClick={() => handleCardClick(slide.id)}
                        className={`group relative h-[300px] w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-black transition-all duration-700 ease-out ${
                          isCurrent
                            ? "z-25 scale-100 border-2 border-white opacity-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                            : "border border-white/20 opacity-70 scale-95"
                        }`}
                      >
                        {image ? (
                          <img
                            src={`http://localhost:5000${image}`}
                            alt={slide.title}
                            draggable={false}
                            className="pointer-events-none h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-white">
                            No image
                          </div>
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-sm font-semibold text-white drop-shadow">
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
                className="absolute right-0 z-50 h-12 w-12 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xl translate-x-3 lg:translate-x-6"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Other Sections (Make sure these are imported if used) */}
      <div className="relative z-20 bg-[#0d0a0a] pt-12">
        <TrendingData />
        <PopularAnimeSlides />
        <RecentlyAddedAnime />
      </div>
    </div>
  );
}
