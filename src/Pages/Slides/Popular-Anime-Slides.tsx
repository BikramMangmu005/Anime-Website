import picture1 from "../../assets/images/picture1.jpg";
import picture3 from "../../assets/images/picture3.jpg";
import picture4 from "../../assets/images/picture4.jpg";
import picture5 from "../../assets/images/picture5.jpg";
import picture6 from "../../assets/images/picture5.jpg";
import picture7 from "../../assets/images/picture6.jpg";
import picture8 from "../../assets/images/picture6.jpg";
import picture9 from "../../assets/images/picture6.jpg";

import TrendingCard from "../../components/Cards/TrendingCards";
import SwipeCarousel from "../../components/Carousel/SwipeCarousel";

const popularData = [
  {
    id: 1,
    title: "Attack on Titan",
    info: "TV • 87 Episodes",
    image: picture1,
  },
  {
    id: 2,
    title: "Demon Slayer",
    info: "TV • 55 Episodes",
    image: picture3,
  },
  {
    id: 3,
    title: "One Piece",
    info: "TV • 1100+ Episodes",
    image: picture4,
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    info: "TV • 47 Episodes",
    image: picture5,
  },
  {
    id: 5,
    title: "Naruto",
    info: "TV • 220 Episodes",
    image: picture6,
  },
  {
    id: 6,
    title: "Blue Lock",
    info: "TV • 24 Episodes",
    image: picture7,
  },
  {
    id: 7,
    title: "Solo Leveling",
    info: "TV • 25 Episodes",
    image: picture8,
  },
  {
    id: 8,
    title: "Chainsaw Man",
    info: "TV • 12 Episodes",
    image: picture9,
  },
];

const PopularAnimeSlides = () => {
  return (
    <div className="container ml-7 mt-16 w-full overflow-hidden">
      <div className="mb-6 flex items-end justify-between pr-7">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-white" />

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Popular Anime
            </h1>

            <p className="mt-1 text-md text-white">Most watched anime</p>
          </div>
        </div>

        <button className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white">
          View All →
        </button>
      </div>

      <SwipeCarousel
        items={popularData}
        itemWidth={180}
        gap={14}
        onItemClick={(item) => {
          console.log("Clicked:", item.title);
        }}
        renderItem={(item, index) => (
          <TrendingCard
            title={item.title}
            info={item.info}
            image={item.image}
            rank={index + 1}
          />
        )}
      />
    </div>
  );
};

export default PopularAnimeSlides;
