import { Tariff } from "#types/tariffs.js";
import knex from "../config/database.js";

/** TariffsModel class handles all operations related to the wildberries_tariffs table. */
class TariffsModel {
    private tableName = "wildberries_tariffs";

    /**
     * Inserts or updates tariff data in the wildberries_tariffs table.
     *
     * @param tariffs - Array of Tariff objects to insert or update.
     * @returns {Promise<void>}
     */
    async upsertTariffs(tariffs: Tariff[]): Promise<void> {
        await knex.transaction(async (trx) => {
            for (const tariff of tariffs) {
                await trx(this.tableName)
                    .insert(tariff)
                    .onConflict(["dtNextBox", "dtTillMax", "warehouseName"]) // Composite key for conflict resolution
                    .merge();
            }
        });
    }

    /**
     * Retrieves all tariffs from the wildberries_tariffs table, sorted by boxDeliveryAndStorageExpr.
     *
     * @returns {Promise<Tariff[]>} - Array of Tariff objects.
     */
    async getAllTariffs(): Promise<Tariff[]> {
        return knex<Tariff>(this.tableName).select("*").orderBy("boxDeliveryAndStorageExpr", "asc");
    }

    /**
     * Retrieves tariffs for a specific date range based on dtNextBox.
     *
     * @param date - The date (in 'YYYY-MM-DD' format) to retrieve tariffs for.
     * @returns {Promise<Tariff[]>} - Array of Tariff objects for the specified date.
     */
    async getTariffsByDate(date: string): Promise<Tariff[]> {
        return knex<Tariff>(this.tableName).select("*").where("dtNextBox", date).orderBy("boxDeliveryAndStorageExpr", "asc");
    }
}

export default new TariffsModel();
