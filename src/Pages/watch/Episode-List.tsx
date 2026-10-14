import type { Episode } from "../../types/Anime-Types";

interface EpisodeListProps {
  episodes: Episode[];
  episodeNumber: number;
  onSelectEpisode: (number: number) => void;
}

export default function EpisodeList({
  episodes,
  episodeNumber,
  onSelectEpisode,
}: EpisodeListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {episodes.map((episode) => (
        <button
          key={episode.number}
          onClick={() => onSelectEpisode(episode.number)}
          aria-current={episode.number === episodeNumber ? "true" : undefined}
          className={`rounded-lg border p-4 text-left transition ${
            episode.number === episodeNumber
              ? "border-indigo-500 bg-indigo-600/20"
              : "border-gray-800 bg-[#191c24] hover:bg-[#252a35]"
          }`}
        >
          <span className="block text-sm text-gray-400">
            EP {episode.number}
          </span>

          <span className="mt-1 block truncate font-medium text-white">
            {episode.title || `Episode ${episode.number}`}
          </span>
        </button>
      ))}
    </div>
  );
}
