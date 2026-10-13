import express from "express";

import {
    addAnime,
    getAnimeList,
    getSingleAnime,
    editAnime,
    removeAnime
} from "../controllers/Anime-Controller";

const router = express.Router();

router.post("/", addAnime);

router.get("/", getAnimeList);

router.get("/:id", getSingleAnime);

router.put("/:id", editAnime);

router.delete("/:id", removeAnime);

export default router;
