export type MyListStatus =
    | "watching"
    | "completed"
    | "on-hold"
    | "dropped"
    | "plan-to-watch";

export interface AddToMyListInput {
    animeId: number;
    status?: MyListStatus;
}
