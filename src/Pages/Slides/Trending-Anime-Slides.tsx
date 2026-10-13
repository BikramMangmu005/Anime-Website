import picture7 from "../../assets/images/picture7.jpg";
import picture8 from "../../assets/images/picture8.jpg";
import picture9 from "../../assets/images/picture9.jpg";
import picture3 from "../../assets/images/picture3.jpg";
import picture4 from "../../assets/images/picture4.jpg";

import TrendingCard from "../../components/Cards/TrendingCards";
import SwipeCarousel from "../../components/Carousel/SwipeCarousel";

const trendingData = [
  {
    id: 1,
    title: "星の継承者たち",
    info: "TV • 24 Episodes",
    image: picture7,
  },
  {
    id: 2,
    title: "女神アクアの憂鬱な休日",
    info: "TV • 1100+ Episodes",
    image: picture8,
  },
  {
    id: 3,
    title: "紅蓮の約束",
    info: "TV • 87 Episodes",
    image: picture9,
  },
  {
    id: 4,
    title: "One Piece",
    info: "TV • New Release",
    image: picture3,
  },
  {
    id: 5,
    title: "紅蓮の約束",
    info: "TV • Popular",
    image: picture4,
  },
  {
    id: 6,
    title: "Demon Slayer",
    info: "TV • Featured",
    image: picture4,
  },
  {
    id: 7,
    title: "Demon Slayer",
    info: "TV • Featured",
    image: picture4,
  },
  {
    id: 8,
    title: "Demon Slayer",
    info: "TV • Featured",
    image: picture4,
  },
];

const TrendingData = () => {
  return (
    <div className="container ml-7 mt-20 w-full overflow-hidden">
      <div className="mb-6 flex items-end justify-between pr-7">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 rounded-full bg-white" />

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-code drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
              Trending Anime
            </h1>

            <p className="mt-1 text-md text-white">Popular anime right now</p>
          </div>
        </div>

        <button className="text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-white">
          View All →
        </button>
      </div>

      <SwipeCarousel
        items={trendingData}
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

export default TrendingData;
