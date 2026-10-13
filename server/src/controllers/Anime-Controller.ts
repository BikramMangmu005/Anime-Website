import type { Request, Response } from "express";
import {
    createAnime,
    getAllAnime,
    getAnimeById,
    updateAnime,
    deleteAnime,
} from "../services/Anime-Services";

export const getAnimeList = async (
    req: Request,
    res: Response
) => {
    try {
        const anime = await getAllAnime();

        return res.status(200).json({
            message: "Anime fetched successfully",
            data: anime,
        });
    } catch (error) {
        console.error("Get Anime error:", error);

        return res.status(500).json({
            message: "Failed to fetch anime",
        });
    }
};

export const getSingleAnime = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const anime = await getAnimeById(id);

        if (!anime) {
            return res.status(404).json({
                message: "Anime not found",
            });
        }

        return res.status(200).json({
            message: "Anime fetched successfully",
            data: anime,
        });
    } catch (error) {
        console.error("Get Anime error:", error);

        return res.status(500).json({
            message: "Failed to fetch anime",
        });
    }
};

export const addAnime = async (
    req: Request,
    res: Response
) => {
    try {
        const { title, image } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const anime = await createAnime({
            title,
            image,
        });

        return res.status(201).json({
            message: "Anime created successfully",
            data: anime,
        });
    } catch (error) {
        console.error("Create Anime error:", error);

        return res.status(500).json({
            message: "Failed to create anime",
        });
    }
};

export const editAnime = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const anime = await updateAnime(id, req.body);

        return res.status(200).json({
            message: "Anime updated successfully",
            data: anime,
        });
    } catch (error) {
        console.error("Update Anime error:", error);

        if (
            error instanceof Error &&
            error.message === "Anime not found"
        ) {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Failed to update anime",
        });
    }
};

export const removeAnime = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await deleteAnime(id);

        return res.status(200).json({
            message: "Anime deleted successfully",
        });
    } catch (error) {
        console.error("Delete Anime error:", error);

        if (
            error instanceof Error &&
            error.message === "Anime not found"
        ) {
            return res.status(404).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Failed to delete anime",
        });
    }
};