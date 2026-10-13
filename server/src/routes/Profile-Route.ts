import { Router } from "express";

import { uploadProfilePicture } from "../controllers/Profile-Controller";
import { uploadProfile } from "../middleware/Upload-Profile";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            message: "User not found",
        });
    }

    return res.json({
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
        },
    });
});


router.post(
    "/profile-picture",
    authMiddleware,
    uploadProfile.single("profilePicture"),
    uploadProfilePicture
);

export default router;
