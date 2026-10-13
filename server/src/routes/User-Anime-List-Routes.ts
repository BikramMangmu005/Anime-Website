import express from "express";

import {
    addToMyList,
    getMyList,
    updateMyListItem,
    deleteFromMyList,
} from "../controllers/userAnimeListController";

import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();


// ADD
router.post(
    "/",
    authMiddleware,
    addToMyList
);


// GET ALL
router.get(
    "/",
    authMiddleware,
    getMyList
);


// UPDATE
router.patch(
    "/:id",
    authMiddleware,
    updateMyListItem
);


// DELETE
router.delete(
    "/:id",
    authMiddleware,
    deleteFromMyList
);

export default router;