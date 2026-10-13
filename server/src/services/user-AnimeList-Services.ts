import MyList from "../models/UserAnimeList";
import Anime from "../models/Anime";

import type { AddToMyListInput } from "../types/User-Anime-List-Types";

export const addAnimeToMyList = async (
    userId: number,
    data: AddToMyListInput
) => {
    const { animeId, status } = data;

    const existing = await MyList.findOne({
        where: {
            userId,
            animeId,
        },
    });

    if (existing) {
        throw new Error("Anime already exists in your list");
    }

    const myList = await MyList.create({
        userId,
        animeId,
        status: status || "watching",
        episodesWatched: 0,
        rating: null,
    });

    return myList;
};

export const getUserAnimeList = async (userId: number) => {
    return await MyList.findAll({
        where: {
            userId,
        },
        include: [
            {
                model: Anime,
                as: "anime",
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};


// UPDATE MY LIST
export const updateMyList = async (
    userId: number,
    myListId: number,
    data: {
        status?: "watching" | "completed" | "on-hold" | "dropped" | "plan-to-watch";
        episodesWatched?: number;
        rating?: number | null;
    }
) => {

    const myList = await MyList.findOne({
        where: {
            id: myListId,
            userId,
        },
    });

    if (!myList) {
        throw new Error("Anime not found in your list");
    }

    await myList.update({
        ...(data.status !== undefined && {
            status: data.status,
        }),

        ...(data.episodesWatched !== undefined && {
            episodesWatched: data.episodesWatched,
        }),

        ...(data.rating !== undefined && {
            rating: data.rating,
        }),
    });

    return myList;
};


// DELETE FROM MY LIST
export const removeAnimeFromMyList = async (
    userId: number,
    myListId: number
) => {

    const myList = await MyList.findOne({
        where: {
            id: myListId,
            userId,
        },
    });

    if (!myList) {
        throw new Error("Anime not found in your list");
    }

    await myList.destroy();

    return myList;
};