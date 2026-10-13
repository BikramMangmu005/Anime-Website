const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#07050d] text-white">
      {/* Background Effects */}
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-[140px]" />

      {/* Anime Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Top Line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-2xl text-violet-300 shadow-[0_0_35px_rgba(139,92,246,0.2)]">
                ✦
              </div>

              <div>
                <h2 className="font-serif text-3xl font-bold tracking-wide">
                  Bikram Anime
                </h2>

                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.4em] text-violet-300/60">
                  Anime Universe
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/40">
              Your destination for discovering anime. Explore popular series,
              trending titles, characters, genres, and everything you love about
              the anime world.
            </p>

            {/* Social */}
            <div className="mt-8 flex gap-3">
              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              >
                <span className="group-hover:scale-110 transition-transform">
                  X
                </span>
              </a>

              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/50 hover:bg-fuchsia-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.3)]"
              >
                <span className="group-hover:scale-110 transition-transform">
                  IG
                </span>
              </a>

              <a
                href="#"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.3)]"
              >
                <span className="group-hover:scale-110 transition-transform">
                  DC
                </span>
              </a>
            </div>
          </div>

          {/* DISCOVER */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
              <span className="h-[1px] w-7 bg-violet-500" />
              Discover
            </h3>

            <ul className="space-y-4 text-sm text-white/40">
              <li>
                <a
                  href="#discover"
                  className="transition-all duration-200 hover:pl-2 hover:text-violet-300"
                >
                  Discover Anime
                </a>
              </li>

              <li>
                <a
                  href="#trending"
                  className="transition-all duration-200 hover:pl-2 hover:text-violet-300"
                >
                  Trending
                </a>
              </li>

              <li>
                <a
                  href="#popular"
                  className="transition-all duration-200 hover:pl-2 hover:text-violet-300"
                >
                  Popular Anime
                </a>
              </li>

              <li>
                <a
                  href="#genres"
                  className="transition-all duration-200 hover:pl-2 hover:text-violet-300"
                >
                  Anime Genres
                </a>
              </li>

              <li>
                <a
                  href="#characters"
                  className="transition-all duration-200 hover:pl-2 hover:text-violet-300"
                >
                  Characters
                </a>
              </li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h3 className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/80">
              <span className="h-[1px] w-7 bg-fuchsia-500" />
              Information
            </h3>

            <ul className="space-y-4 text-sm text-white/40">
              <li>
                <a
                  href="#about"
                  className="transition-all duration-200 hover:pl-2 hover:text-fuchsia-300"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition-all duration-200 hover:pl-2 hover:text-fuchsia-300"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="#privacy"
                  className="transition-all duration-200 hover:pl-2 hover:text-fuchsia-300"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#terms"
                  className="transition-all duration-200 hover:pl-2 hover:text-fuchsia-300"
                >
                  Terms of Service
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="transition-all duration-200 hover:pl-2 hover:text-fuchsia-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= GENRES ================= */}
        <div className="mt-16 border-y border-white/10 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25">
              Explore Genres
            </span>

            <div className="flex flex-wrap gap-2">
              {[
                "Action",
                "Adventure",
                "Romance",
                "Comedy",
                "Fantasy",
                "Isekai",
                "Shonen",
                "Horror",
              ].map((genre) => (
                <a
                  key={genre}
                  href={`#${genre.toLowerCase()}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/40 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
                >
                  {genre}
                </a>
              ))}
            </div>
          </div>
        </div>

      
        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bikram Anime. All rights reserved.</p>

          <p>
            Made with <span className="text-fuchsia-400">♥</span> for anime
            fans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
