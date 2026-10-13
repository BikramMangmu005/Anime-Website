
interface AnimeCardProps {
  id: string | number;
  title: string;
  info: string;
  image?: string;
  rank?: number;
}

const BrowseAnimeCard = ({
  id,
  title,
  info,
  image,
  rank,
}: AnimeCardProps) => {
  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80";

  return (
    <div
      key={id}
      className="
        group
        relative
        w-[210px]
        sm:w-[220px]
        overflow-hidden
        rounded-xl
        border border-white/10
        bg-[#111010]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-purple-500/40
        hover:shadow-lg
      "
    >
      {/* IMAGE */}
      <div className="relative h-[260px] w-full overflow-hidden bg-black">
        <img
          src={imageUrl}
          alt={title}
          draggable={false}
          className="
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111010]/80 via-transparent to-transparent" />

        {/* Rank */}
        {rank !== undefined && (
          <div
            className="
              absolute
              left-2
              top-2
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              border border-white/20
              bg-black/70
              text-[10px]
              font-bold
              text-white
              backdrop-blur-md
            "
          >
            #{String(rank).padStart(2, "0")}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="h-[58px] px-3 py-2">
        <h3 className="truncate text-xs font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 truncate text-[10px] text-white/40">
          {info}
        </p>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export default BrowseAnimeCard;

