import { Request, Response, NextFunction } from "express";
import { AppError } from "#middlewares/errorHandler.js";
import { logger } from "#utils/logger.js";
import { fetchWildberriesTariffs } from "#services/wildberriesService.js";
import { upsertHourlyTariffs } from "#repositories/tariffsRepository.js";
import { exportTariffsToSheets } from "#services/googleSheetsService.js";

/** Core function to fetch and store tariffs, used by both the scheduler and route. */
export const fetchAndStoreTariffsCore = async () => {
    try {
        const tariffsData = await fetchWildberriesTariffs();
        const { dtNextBox, dtTillMax, warehouseList } = tariffsData;

        const tariffs = warehouseList.map((warehouse) => ({
            dtNextBox,
            dtTillMax,
            warehouseName: warehouse.warehouseName,
            boxDeliveryAndStorageExpr: parseFloat(warehouse.boxDeliveryAndStorageExpr),
            boxDeliveryBase: parseFloat(warehouse.boxDeliveryBase),
            boxDeliveryLiter: parseFloat(warehouse.boxDeliveryLiter.replace(",", ".")),
            boxStorageBase: warehouse.boxStorageBase && warehouse.boxStorageBase !== "-" ? parseFloat(warehouse.boxStorageBase) : null,
            boxStorageLiter: warehouse.boxStorageLiter && warehouse.boxStorageLiter !== "-" ? parseFloat(warehouse.boxStorageLiter) : null,
            updated_at: new Date(),
        }));
        await upsertHourlyTariffs(tariffs);
        logger.info("Tariffs data fetched and stored successfully");
    } catch (error) {
        logger.error("Error in fetchAndStoreTariffsCore:", error);
        throw error;
    }
};

/** Express route handler to fetch and store tariffs. */
export const fetchAndStoreTariffs = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        await fetchAndStoreTariffsCore();
        res.status(200).json({ message: "Tariffs data fetched and stored successfully" });
    } catch (error) {
        next(new AppError("Failed to fetch and store tariffs data", 500));
    }
};

/** Endpoint to export sorted tariffs data to Google Sheets. Expects an array of sheet IDs to be provided in the request body. */
export const exportTariffsToGoogleSheets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sheetIds } = req.body; // Receive Google Sheets IDs in the request body

        if (!Array.isArray(sheetIds) || sheetIds.length === 0) {
            throw new AppError("Invalid input: sheetIds must be a non-empty array of Google Sheets IDs", 400);
        }

        await exportTariffsToSheets(sheetIds);
        res.status(200).json({ message: "Data exported to Google Sheets successfully" });
    } catch (error) {
        next(new AppError("Failed to export data to Google Sheets", 500));
    }
};
