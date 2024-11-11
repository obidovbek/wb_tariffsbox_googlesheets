// src/scheduler/fetchDataScheduler.ts

import cron from "node-cron";
import { fetchAndStoreTariffsCore } from "../controllers/tariffsController.js";

// Schedule the fetch and store function to run every hour
cron.schedule("0 * * * *", async () => {
    try {
        console.log("Running hourly Wildberries tariffs data fetch...");
        await fetchAndStoreTariffsCore();
        console.log("Hourly Wildberries tariffs data fetch and store completed successfully");
    } catch (error) {
        console.error("Error in hourly scheduled fetch and store:", error);
    }
});
