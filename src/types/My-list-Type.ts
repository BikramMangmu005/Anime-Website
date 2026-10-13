export type MyListStatus =
    | "watching"
    | "completed"
    | "on-hold"
    | "dropped"
    | "plan-to-watch";

export interface AddToListParams {
    animeId: number;
    status: MyListStatus;
}

export interface MyListAnime {
    id: number;
    title: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface MyListItem {
    id: number;
    userId: number;
    animeId: number;
    status: MyListStatus;
    episodesWatched: number;
    rating: number | null;
    createdAt: string;
    updatedAt: string;
    anime: MyListAnime;
}