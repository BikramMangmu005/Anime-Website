
import type { Request, Response } from "express";

export const uploadProfilePicture = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Profile picture is required",
            });
        }

        const user = req.user;

        if (!user) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const profilePicture =
            `/images/profiles/${req.file.filename}`;

        await user.update({
            profilePicture,
        });

        return res.status(200).json({
            message: "Profile picture uploaded successfully",
            profilePicture,
        });
    } catch (error) {
        console.error("Profile picture upload error:", error);

        return res.status(500).json({
            message: "Failed to upload profile picture",
        });
    }
};