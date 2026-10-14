import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getAnimeById, getEpisodesForAnime } from "../api/Anime-Api";
import type { Anime, Episode } from "../types/Anime-Types";

import VideoPlayer from "./watch/Video-Player";
import EpisodeList from "./watch/Episode-List";
import WatchControls from "./watch/Watch-Controls";

export default function WatchPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const episodeNumber = Math.max(1, Number(searchParams.get("episode")) || 1);

  const currentEpisode = episodes.find(
    (episode) => episode.number === episodeNumber,
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAnime() {
      if (!id || !Number.isFinite(Number(id)) || Number(id) <= 0) {
        setAnime(null);
        setEpisodes([]);
        setError("Invalid anime ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      setAnime(null);
      setEpisodes([]);

      try {
        const animeData = await getAnimeById(Number(id));

        if (cancelled) return;

        if (!animeData) {
          setAnime(null);
          return;
        }

        setAnime(animeData);

        const episodeData = await getEpisodesForAnime(Number(id));

        if (cancelled) return;

        setEpisodes(episodeData);
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load anime or episodes:", err);
          setError("Unable to load anime or episodes. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnime();

    return () => {
      cancelled = true;
    };
  }, [id]);

  function selectEpisode(number: number) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set("episode", String(number));
      return next;
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111318] text-white">
        Loading anime and episodes...
      </main>
    );
  }

  if (!anime) {
    return (
      <main className="min-h-screen bg-[#111318] p-10 text-white">
        <p>{error || "Anime not found."}</p>

        <Link to="/" className="mt-3 inline-block text-indigo-400">
          Go home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#111318] text-gray-200">
      <header className="mx-auto max-w-7xl px-4 py-5">
        <Link
          to={`/slide/${anime.id}`}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to anime
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-white">{anime.title}</h1>

          <p className="mt-1 text-gray-400">
            Episode {episodeNumber}
            {currentEpisode?.title ? ` — ${currentEpisode.title}` : ""}
          </p>
        </div>

        <VideoPlayer anime={anime} videoUrl={currentEpisode?.videoUrl} />

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <WatchControls
          episodeNumber={episodeNumber}
          episodes={episodes}
          onSelectEpisode={selectEpisode}
        />

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-white">
            Episodes ({episodes.length})
          </h2>

          {episodes.length === 0 ? (
            <p className="text-gray-400">No episodes are available yet.</p>
          ) : (
            <EpisodeList
              episodes={episodes}
              episodeNumber={episodeNumber}
              onSelectEpisode={selectEpisode}
            />
          )}
        </section>
      </div>
    </main>
  );
}
