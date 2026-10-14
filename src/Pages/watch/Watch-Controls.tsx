import { ChevronLeft, ChevronRight } from "lucide-react";

interface WatchControlsProps {
  episodeNumber: number;
  episodes: { number: number }[];
  onSelectEpisode: (number: number) => void;
}

export default function WatchControls({
  episodeNumber,
  episodes,
  onSelectEpisode,
}: WatchControlsProps) {
  const hasPrevious = episodes.some(
    (episode) => episode.number === episodeNumber - 1,
  );

  const hasNext = episodes.some(
    (episode) => episode.number === episodeNumber + 1,
  );

  return (
    <div className="mt-5 flex flex-wrap justify-between gap-3">
      <button
        disabled={!hasPrevious}
        onClick={() => onSelectEpisode(episodeNumber - 1)}
        className="flex items-center gap-2 rounded-lg bg-[#1e222b] px-4 py-3 hover:bg-[#292e39] disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <button
        disabled={!hasNext}
        onClick={() => onSelectEpisode(episodeNumber + 1)}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 hover:bg-indigo-500 disabled:opacity-40"
      >
        Next episode
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
