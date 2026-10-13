import SwipeCarousel from "../Carousel/SwipeCarousel";
import TrendingCard, { type TrendingCardProps } from "./TrendingCards";

export type TrendingCardsProps = {
  items: Omit<TrendingCardProps, "rank">[];
};

export default function TrendingCards({ items }: TrendingCardsProps) {
  return (
    <SwipeCarousel
      items={items}
      itemWidth={180}
      gap={12}
      renderItem={(anime, index) => (
        <TrendingCard
          title={anime.title}
          info={anime.info}
          image={anime.image}
          rank={index + 1}
        />
      )}
    />
  );
}

