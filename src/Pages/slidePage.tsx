import { useParams } from "react-router-dom";
import AddToListButton from "../components/My-LIst/AddToListButton";
import { Play, Bell, Film, Star } from "lucide-react";

import { getImageUrl } from "../utils/Image-URL";
import ImageWithFallback from "../components/Image/ImageWithFallback";

import { useEffect, useState } from "react";
import { getAnimeById, type Anime } from "../api/Anime-Api";

export default function SlidePage() {
  const { id } = useParams();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnime = async () => {
      try {
        const data = await getAnimeById(Number(id));

        console.log("ANIME FROM DATABASE:", data);

        setAnime(data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111318] text-white flex items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-[#111318] text-white flex items-center justify-center">
        <h1 className="text-2xl">Anime not found</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#111318] text-gray-200 font-sans overflow-x-hidden">
      {/* Background Banner */}
      <div className="absolute top-0 right-0 w-full lg:w-4/5 h-[450px] overflow-hidden opacity-40 lg:opacity-60 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/60 to-transparent z-10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent z-10" />

        <ImageWithFallback
          src={anime.background ? getImageUrl(anime.background) : ""}
          className="w-full h-full object-cover object-top scale-105 transform"
          alt={anime.title}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Poster */}
          <div className="w-full sm:w-72 md:w-80 flex-shrink-0 mx-auto lg:mx-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#1a1d24] aspect-[3/4] relative group">
              <ImageWithFallback
                src={anime.image ? getImageUrl(anime.image) : ""}
                className="w-full h-full object-cover object-top scale-105 transform"
                alt={anime.title}
              />
            </div>

            {/* Stats */}
            <div className="mt-4 rounded-xl bg-[#161920]/90 backdrop-blur-md border border-gray-800/80 p-4 space-y-3 shadow-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 font-medium">Score</span>

                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>8.3</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-gray-800/60 pt-2.5">
                <span className="text-gray-400 font-medium">Popularity</span>

                <span className="font-semibold text-gray-200">#41,102</span>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-gray-800/60 pt-2.5">
                <span className="text-gray-400 font-medium">Episodes</span>

                <span className="font-semibold text-gray-200">12</span>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-gray-800/60 pt-2.5">
                <span className="text-gray-400 font-medium">Duration</span>

                <span className="font-semibold text-gray-200">23m</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                Airing
              </span>

              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700/50">
                TV
              </span>

              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950 text-blue-400 border border-blue-800/50">
                DUB
              </span>

              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/50">
                PG-13
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {anime.title}
              </h1>
            </div>

            {/* Genres */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/70 text-gray-300 border border-gray-700/40">
                Adventure
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800/70 text-gray-300 border border-gray-700/40">
                Drama
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200">
                <Play className="w-4 h-4 fill-white" />
                Watch Ep 1
              </button>

              <AddToListButton animeId={anime.id} status="watching" />

              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1e222b] hover:bg-[#262a35] text-gray-200 font-medium border border-gray-700/60 transition-all duration-200">
                <Bell className="w-4 h-4" />
                Ep 12 alert
              </button>

              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#1e222b] hover:bg-[#262a35] text-gray-200 font-medium border border-gray-700/60 transition-all duration-200">
                <Film className="w-4 h-4" />
                Trailer
              </button>
            </div>

            {/* Description */}
            <div className="pt-4 max-w-3xl">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {anime.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
