import express, { Application } from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/database.js";
import { logger, httpLogger } from "#utils/logger.js";
import tariffsRoutes from "#routes/tariffsRoutes.js";
import "./scheduler/fetchDataScheduler.js";
import { errorHandler } from "#middlewares/errorHandler.js";

dotenv.config();

const createApp = async (): Promise<Application> => {
    const app = express();

    // Middleware to parse JSON requests
    app.use(express.json());

    // HTTP request logger
    app.use(httpLogger);

    // Database connection 916603531 Oybek
    await connectDB()
        .then(() => {
            logger.info("Connected to PostgreSQL database");
        })
        .catch((error) => {
            logger.error("Database connection failed:", error);
            process.exit(1); // Exit the process if the database connection fails
        });

    // Routes setup 916552043
    app.use("/api/tariffs", tariffsRoutes);

    // Error handling middleware
    app.use(errorHandler);

    return app;
};

export default createApp;
