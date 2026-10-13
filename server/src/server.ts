import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "node:path";

import sequelize from "./connections/databaseAuth.js";

import "./models/User.js";
import "./models/Association.js";

import authRoutes from "./routes/authRoutes.js";
import myListRoutes from "./routes/User-Anime-List-Routes.js";
import animeRoutes from "./routes/Anime-Routes.js";
import profileRoutes from "./routes/Profile-Route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static Images
app.use(
    "/images",
    express.static(
        path.join(process.cwd(), "public", "images")
    )
);

// API Routes
app.use("/api", authRoutes);
app.use("/api/animes", animeRoutes);
app.use("/api/my-list", myListRoutes);
app.use("/api", profileRoutes);

// Test Route
app.get("/", (_req, res) => {
    res.json({
        message: "Server is running",
    });
});

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log("PostgreSQL connected successfully");

        console.log(
            "Registered models:",
            Object.keys(sequelize.models)
        );

        await sequelize.sync({ alter: true });

        console.log("Database tables synchronized");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(
                `Images available at http://localhost:${PORT}/images/`
            );
        });
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

startServer();  