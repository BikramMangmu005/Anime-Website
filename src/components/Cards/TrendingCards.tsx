type TrendingCardProps = {
  title: string;
  info: string;
  image: string;
  rank: number;
};

export default function TrendingCard({
  title,
  info,
  image,
  rank,
}: TrendingCardProps) {
  return (
    <div className="group relative bg-[#141212] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] cursor-pointer flex flex-col">
      <div className="relative h-[240px] sm:h-[260px] w-full overflow-hidden bg-black">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#141212] via-transparent to-black/30 opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-xs font-bold text-white tracking-wider shadow-lg">
          #{String(rank).padStart(2, "0")}
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-transparent to-[#100d0d]">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-1">
          {title}
        </h3>

        <p className="text-xs text-white/40 mt-1 font-light tracking-wide group-hover:text-white/60 transition-colors duration-300">
          {info}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
