// src/repositories/tariffsRepository.ts

import knex from "../config/database.js";
import { Tariff } from "#types/tariffs.js";

/**
 * Inserts or updates hourly tariff data in the database for the current day.
 *
 * @param tariffs - Array of Tariff objects representing the warehouse tariffs.
 * @returns {Promise<void>}
 */
export async function upsertHourlyTariffs(tariffs: Tariff[]): Promise<void> {
    await knex.transaction(async (trx) => {
        for (const tariff of tariffs) {
            await trx("wildberries_tariffs")
                .insert({
                    ...tariff,
                    dtNextBox: tariff.dtNextBox || null,
                    dtTillMax: tariff.dtTillMax || null,
                })
                .onConflict(["dtNextBox", "dtTillMax", "warehouseName"]) // Composite key for conflict resolution
                .merge({
                    boxDeliveryAndStorageExpr: tariff.boxDeliveryAndStorageExpr,
                    boxDeliveryBase: tariff.boxDeliveryBase,
                    boxDeliveryLiter: tariff.boxDeliveryLiter,
                    boxStorageBase: tariff.boxStorageBase,
                    boxStorageLiter: tariff.boxStorageLiter,
                    updated_at: new Date(),
                });
        }
    });
}
/**
 * Retrieves sorted tariff data from PostgreSQL.
 *
 * @returns {Promise<Tariff[]>} - Sorted array of tariffs.
 */
export async function getSortedTariffs(): Promise<Tariff[]> {
    return knex<Tariff>("wildberries_tariffs").select("*").orderBy("boxDeliveryAndStorageExpr", "asc"); // Sort by the coefficient
}
