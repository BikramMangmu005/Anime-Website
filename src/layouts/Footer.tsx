const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#0d0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-semibold tracking-wide text-white">
              SnapStory
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
              Discover your next favorite anime. Explore trending series,
              unforgettable characters, and stories worth watching.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="Discord"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/60 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                DC
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/45">
              <li>
                <a
                  href="#discover"
                  className="transition-colors hover:text-white"
                >
                  Discover
                </a>
              </li>
              <li>
                <a
                  href="#trending"
                  className="transition-colors hover:text-white"
                >
                  Trending Anime
                </a>
              </li>
              <li>
                <a
                  href="#popular"
                  className="transition-colors hover:text-white"
                >
                  Popular
                </a>
              </li>
              <li>
                <a
                  href="#genres"
                  className="transition-colors hover:text-white"
                >
                  Genres
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/45">
              <li>
                <a href="#about" className="transition-colors hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="transition-colors hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} SnapStory. All rights reserved.
          </p>

          <p>
            Made with <span className="text-white/60">♥</span> for anime fans.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
