import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await loginUser(email, password);

        const token = generateToken(user.id);


        return res.status(200).json({
            message: "Login successful",
            token,
            user,
        });



    } catch (error) {
        console.error("Login error:", error);

        return res.status(401).json({
            message: "Invalid email or password",
        });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }

        const user = await registerUser(username, email, password);

        return res.status(201).json({
            message: "User registered successfully",
            user,
        });

    } catch (error) {
        console.error("Register error:", error);

        return res.status(400).json({
            message: (error as Error).message,
        });
    }
};


