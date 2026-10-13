import type { Request, Response } from "express";

import {
    addAnimeToMyList,
    getUserAnimeList,
    updateMyList,
    removeAnimeFromMyList,
} from "../services/user-AnimeList-Services";


// ADD TO MY LIST
export const addToMyList = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = req.user.id;

        const myList = await addAnimeToMyList(
            userId,
            req.body
        );

        return res.status(201).json({
            message: "Anime added to My List",
            data: myList,
        });

    } catch (error) {

        console.error(
            "Add to My List error:",
            error
        );

        if (
            error instanceof Error &&
            error.message ===
            "Anime already exists in your list"
        ) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message:
                "Failed to add anime to My List",
        });
    }
};


// GET MY LIST
export const getMyList = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = req.user.id;

        const myList =
            await getUserAnimeList(userId);

        return res.status(200).json({
            message:
                "My List fetched successfully",
            data: myList,
        });

    } catch (error) {

        console.error(
            "Get My List error:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to fetch My List",
        });
    }
};


// UPDATE MY LIST
export const updateMyListItem = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = req.user.id;

        const myListId =
            Number(req.params.id);

        const updatedList =
            await updateMyList(
                userId,
                myListId,
                req.body
            );

        return res.status(200).json({
            message:
                "My List updated successfully",
            data: updatedList,
        });

    } catch (error) {

        console.error(
            "Update My List error:",
            error
        );

        if (
            error instanceof Error &&
            error.message ===
            "Anime not found in your list"
        ) {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message:
                "Failed to update My List",
        });
    }
};


// DELETE FROM MY LIST
export const deleteFromMyList = async (
    req: Request,
    res: Response
) => {
    try {

        const userId = req.user.id;

        const myListId =
            Number(req.params.id);

        await removeAnimeFromMyList(
            userId,
            myListId
        );

        return res.status(200).json({
            message:
                "Anime removed from My List",
        });

    } catch (error) {

        console.error(
            "Delete My List error:",
            error
        );

        if (
            error instanceof Error &&
            error.message ===
            "Anime not found in your list"
        ) {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message:
                "Failed to remove anime from My List",
        });
    }
};