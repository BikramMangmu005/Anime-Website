import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Grid2X2,
  Trophy,
  Zap,
  Award,
  User,
} from "lucide-react";

import { getImageUrl } from "../utils/Image-URL";
import { getAllAnime } from "../api/Anime-Api";
import type { Anime } from "../api/Anime-Api";

import { useAuth } from "../context/Auth-Context";

const Header = () => {
  //profile state
  const [profileOpen, setProfileOpen] = useState(false);

  //useref for profile state
  const profileRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  //use context
  const { user, isLoggedIn, logout } = useAuth();
  console.log("Header profile picture:", user?.profilePicture);
  console.log("Profile picture path:", user?.profilePicture);
  console.log(
    "Full image URL:",
    user?.profilePicture ? getImageUrl(user.profilePicture) : null,
  );

  console.log(location.pathname);

  console.log("CURRENT PATH:", JSON.stringify(location.pathname));
  console.log("PATH LENGTH:", location.pathname.length);
  console.log("IS MY LISTS:", location.pathname === "/mylists");

  const hideSearch =
    location.pathname === "/mylists" || location.pathname.startsWith("/slide/");

  const searchRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [animes, setAnimes] = useState<Anime[]>([]);
  useEffect(() => {
    const loadAnime = async () => {
      try {
        const data = await getAllAnime();

        console.log("ANIME FROM DATABASE:", data);

        setAnimes(data);
      } catch (error) {
        console.error("Failed to load anime:", error);
      }
    };

    loadAnime();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchOpen(false);
      }

      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredAnime = animes
    .filter((anime) => anime.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 3);

  const [discoverOpen, setDiscoverOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 mx-10 mt-5">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide font-serif text-white/90"
        >
          Bikram Anime
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          {/* Anime-style search */}
          {!hideSearch && (
            <div ref={searchRef} className="relative">
              <div className="group flex items-center gap-2 rounded-full border border-pink-300/30 bg-white/10 px-4 py-2 backdrop-blur-md transition-all duration-300 hover:border-pink-300/60 hover:bg-white/15 focus-within:border-pink-300/70 focus-within:shadow-[0_0_20px_rgba(244,114,182,0.25)]">
                <Search
                  size={17}
                  className="text-pink-200 transition-colors group-focus-within:text-pink-300"
                />

                <input
                  type="text"
                  placeholder="Search Anime"
                  value={search}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => setSearch(e.target.value)}
                  className="font-code w-48 bg-transparent text-sm text-white placeholder:text-white/40 outline-none transition-all duration-300 focus:w-60"
                />
              </div>

              {/* Search results will go here */}

              {searchOpen && search.trim() && (
                <div className="absolute left-0 top-full mt-3 ml-3 w-[260px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  {filteredAnime.length > 0 ? (
                    filteredAnime.map((anime) => (
                      <Link
                        key={anime.id}
                        to={`/slide/${anime.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearch("");
                        }}
                        className="flex items-center gap-3 p-3 transition-colors hover:bg-white/10"
                      >
                        {/* Anime Image */}
                        <img
                          src={
                            anime.image
                              ? getImageUrl(anime.image)
                              : "/placeholder-anime.jpg"
                          }
                          alt={anime.title}
                          className="h-14 w-10 rounded-md object-cover"
                        />

                        {/* Anime Title */}
                        <span className="font-code text-sm text-white">
                          {anime.title}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="p-4 text-sm text-white/50">No anime found</p>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <Link to="/mylists" className="font-code">
              My Lists
            </Link>
          </div>

          {/* Discover Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDiscoverOpen(!discoverOpen)}
              className="font-code flex items-center gap-1 transition-colors duration-200 hover:text-white"
            >
              Discover
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  discoverOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {discoverOpen && (
              <div className="absolute left-[-100px] font-code top-full mt-5 z-50 w-[320px] rounded-lg bg-[#12121a] p-4 shadow-2xl border border-zinc-800">
                {/* Top Menu */}
                <div className="grid grid-cols-2 gap-y-3 pb-4">
                  <Link
                    to="/browse"
                    onClick={() => setDiscoverOpen(false)}
                    className="flex items-center gap-3 text-sm text-[#a6a1bd] transition-colors hover:text-white"
                  >
                    <Grid2X2 size={16} />
                    Browse
                  </Link>

                  <Link
                    to="/top"
                    onClick={() => setDiscoverOpen(false)}
                    className="flex items-center gap-3 text-sm text-[#a6a1bd] transition-colors hover:text-white"
                  >
                    <Trophy size={16} />
                    Top
                  </Link>

                  <Link
                    to="/latest"
                    onClick={() => setDiscoverOpen(false)}
                    className="flex items-center gap-3 text-sm text-[#a6a1bd] transition-colors hover:text-white"
                  >
                    <Zap size={16} />
                    Latest
                  </Link>

                  <Link
                    to="/awards"
                    onClick={() => setDiscoverOpen(false)}
                    className="flex items-center gap-3 text-sm text-[#a6a1bd] transition-colors hover:text-white"
                  >
                    <Award size={16} />
                    Awards
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-800 pt-3">
                  {/* Genre Title */}
                  <p className="mb-3 text-xs font-medium tracking-wide text-[#858098]">
                    GENRES
                  </p>

                  {/* Genres */}
                  <div className="font-(--font-code) grid grid-cols-2 gap-y-2.5">
                    {[
                      { name: "Action", path: "action" },
                      { name: "Adventure", path: "adventure" },
                      { name: "Comedy", path: "comedy" },
                      { name: "Drama", path: "drama" },
                      { name: "Fantasy", path: "fantasy" },
                      { name: "Horror", path: "horror" },
                      { name: "Mystery", path: "mystery" },
                      { name: "Romance", path: "romance" },
                      { name: "Sci-Fi", path: "sci-fi" },
                      { name: "Slice of Life", path: "slice-of-life" },
                      { name: "Sports", path: "sports" },
                      { name: "Supernatural", path: "supernatural" },
                      { name: "Thriller", path: "thriller" },
                      { name: "Psychological", path: "psychological" },
                      { name: "Mecha", path: "mecha" },
                      { name: "Historical", path: "historical" },
                    ].map((genre) => (
                      <Link
                        key={genre.path}
                        to={`/genre/${genre.path}`}
                        onClick={() => setDiscoverOpen(false)}
                        className="text-sm text-[#a6a1bd] hover:text-white transition-colors"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#styles"
            className="font-code hover:text-white transition-colors duration-200"
          >
            Styles
          </a>

          <a
            href="#contacts"
            className="hover:text-white font-code transition-colors duration-200"
          >
            Contacts
          </a>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className="hover:text-white font-code transition-colors duration-200"
            >
              Login
            </Link>
          ) : (
            <div ref={profileRef} className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full transition-all duration-200 hover:opacity-90"
              >
                {/* Profile Picture */}
                <div className="h-9 w-9 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg">
                  {user?.profilePicture ? (
                    <img
                      src={getImageUrl(user.profilePicture)}
                      alt={user.username}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        console.error(
                          "Image failed to load:",
                          e.currentTarget.src,
                        );
                      }}
                      onLoad={() =>
                        console.log("Profile image loaded successfully")
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User size={17} className="text-white/70" />
                    </div>
                  )}
                </div>

                <ChevronDown
                  size={14}
                  className={`text-white/60 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#12121a]/95 shadow-2xl backdrop-blur-xl">
                  {/* User Info */}
                  <div className="border-b border-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 overflow-hidden rounded-full border border-white/20 bg-white/10">
                        {user?.profilePicture ? (
                          <img
                            src={getImageUrl(user.profilePicture)}
                            alt={user.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <User size={20} className="text-white/60" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-code text-sm font-medium text-white">
                          {user?.username}
                        </p>

                        <p className="truncate font-code text-xs text-white/40">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-code text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <Link
                      to="/mylists"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-code text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      My Lists
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-white/10 p-2">
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-left font-code text-sm text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
