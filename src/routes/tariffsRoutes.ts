import { exportTariffsToGoogleSheets, fetchAndStoreTariffs } from "#controllers/tariffsController.js";
import { Router } from "express";

const router = Router();

// Route to fetch and store tariff data (could be restricted to scheduled tasks only)
router.get("/fetch", fetchAndStoreTariffs);

// Define the export route
router.post("/export-to-sheets", exportTariffsToGoogleSheets);

export default router;
