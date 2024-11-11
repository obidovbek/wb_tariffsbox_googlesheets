// src/services/googleSheetsService.ts

import { getSortedTariffs } from "#repositories/tariffsRepository.js";
import { Tariff } from "#types/tariffs.js";
import { sheets } from "#utils/googleSheetsClient.js";

/**
 * Exports sorted tariff data to the specified Google Sheets.
 *
 * @param sheetIds - Array of Google Sheets IDs to update.
 * @returns {Promise<void>}
 */
export async function exportTariffsToSheets(sheetIds: string[]): Promise<void> {
    // Fetch sorted data from PostgreSQL
    const tariffs = await getSortedTariffs();

    // Format data for Google Sheets
    const rows = tariffs.map((tariff: Tariff) => [
        tariff.dtNextBox,
        tariff.dtTillMax,
        tariff.warehouseName,
        tariff.boxDeliveryAndStorageExpr,
        tariff.boxDeliveryBase,
        tariff.boxDeliveryLiter,
        tariff.boxStorageBase,
        tariff.boxStorageLiter,
    ]);
    console.log("rows", rows);
    // Define the range and values for the "stocks_coefs" sheet
    const requestBody = {
        values: [
            ["Next Box Date", "Max Date", "Warehouse Name", "Delivery & Storage", "Delivery Base", "Delivery Per Liter", "Storage Base", "Storage Per Liter"], // Header row
            ...rows,
        ],
    };

    // Export data to each specified Google Sheet
    for (const sheetId of sheetIds) {
        try {
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: "stocks_coefs!A1", // Replace with target sheet and range
                valueInputOption: "RAW",
                requestBody,
            });
            console.log(`Data exported successfully to sheet ${sheetId}`);
        } catch (error) {
            console.error(`Failed to export data to sheet ${sheetId}:`, error);
        }
    }
}
