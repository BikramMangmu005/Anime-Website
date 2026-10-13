import { useState } from "react";

import BrowseAnimeCard from "../../components/Cards/Browse-Anime-Cards";
import SectionTitle from "../../components/Selection-Ttile/Selection-Title";

import AnimeFilters from "../../components/Filters/Anime-Filters";
import { ANIME_FILTERS } from "../../constants/Anime-Filters";

import { ANIME_LIST } from "../../data/Anime-Data";

const BrowseAnime = () => {
  const [activeTab, setActiveTab] = useState("Most Popular");

  return (
    <main className="min-h-screen bg-black px-4 pt-24 pb-16 text-white sm:px-6 sm:pt-28 md:px-8 lg:px-10 lg:pt-32">
      {/* Header */}
      <SectionTitle title="BrowseAnime" />

      <p className="mb-4 ml-7 text-[12px] text-gray-400">12+ results</p>

      <AnimeFilters
        filters={ANIME_FILTERS}
        activeFilter={activeTab}
        onFilterChange={setActiveTab}
      />
      {/* Anime Cards Grid */}
      <div
        className="grid w-full justify-center gap-4 sm:justify-start sm:gap-5 lg:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
        }}
      >
        {ANIME_LIST.map((anime, index) => (
          <BrowseAnimeCard
            key={anime.id}
            id={anime.id}
            title={anime.title}
            info={anime.info}
            image={anime.image}
            rank={index + 1}
          />
        ))}
      </div>
    </main>
  );
};

export default BrowseAnime;
