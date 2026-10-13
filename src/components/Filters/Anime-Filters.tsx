interface AnimeFiltersProps {
  filters: readonly string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const AnimeFilters = ({
  filters,
  activeFilter,
  onFilterChange,
}: AnimeFiltersProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              rounded-full
              border
              px-3 py-2
              text-xs
              font-medium
              transition-all
              duration-200
              sm:px-4 sm:py-2.5 sm:text-sm

              ${
                isActive
                  ? "border-purple-500/80 bg-[#111010] text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  : "border-white/10 bg-[#111010]/60 text-white/70 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default AnimeFilters;
