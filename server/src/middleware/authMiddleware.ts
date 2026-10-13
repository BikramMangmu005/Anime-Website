import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const token = authHeader.slice(7).trim();

        console.log("TOKEN:", token);
        console.log("TOKEN PARTS:", token.split(".").length);

        if (!token) {
            return res.status(401).json({
                message: "Token is missing",
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        ) as unknown as {
            userId: number;
        };

        const user = await User.findByPk(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error("JWT ERROR:", error);
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

