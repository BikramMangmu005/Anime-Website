
export interface Anime {
  id: number;
  title: string;
  image: string | null;
  background: string | null;
  description: string | null;
}

export interface Episode {
  number: number;
  title: string;
  videoUrl: string | null;
}

export interface CombinedSlide {
  id: number;
  title: string;
  image: string | null;
  background: string | null;
}
