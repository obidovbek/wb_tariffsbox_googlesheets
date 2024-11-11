/**
 * Type definitions for the structure of data returned from the Wildberries API.
 *
 * @typedef {Object} WarehouseTariff
 * @property {string} warehouseName - The name of the warehouse.
 * @property {string} boxDeliveryAndStorageExpr - Combined cost of delivery and storage.
 * @property {string} boxDeliveryBase - Base delivery cost.
 * @property {string} boxDeliveryLiter - Delivery cost per liter.
 * @property {string | null} boxStorageBase - Base storage cost, or null if unavailable.
 * @property {string | null} boxStorageLiter - Storage cost per liter, or null if unavailable.
 */
export interface WarehouseTariff {
    warehouseName: string;
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string | null;
    boxStorageLiter: string | null;
}

/**
 * Type definition for the main structure of tariff data returned from the Wildberries API.
 *
 * @typedef {Object} TariffData
 * @property {string} dtNextBox - The next box date from the API response.
 * @property {string} dtTillMax - The maximum date from the API response.
 * @property {WarehouseTariff[]} warehouseList - List of warehouses and their tariffs.
 */
export interface TariffData {
    dtNextBox: string;
    dtTillMax: string;
    warehouseList: WarehouseTariff[];
}

/**
 * Type definition for the processed tariff data stored in PostgreSQL.
 *
 * @typedef {Object} Tariff
 * @property {string} dtNextBox - The next box date.
 * @property {string} dtTillMax - The maximum storage date.
 * @property {string} warehouseName - The name of the warehouse.
 * @property {number | null} boxDeliveryAndStorageExpr - Combined delivery and storage cost.
 * @property {number | null} boxDeliveryBase - Base delivery cost.
 * @property {number | null} boxDeliveryLiter - Delivery cost per liter.
 * @property {number | null} boxStorageBase - Base storage cost.
 * @property {number | null} boxStorageLiter - Storage cost per liter.
 * @property {Date} [created_at] - Timestamp for creation (optional).
 * @property {Date} [updated_at] - Timestamp for last update (optional).
 */
export interface Tariff {
    dtNextBox: string;
    dtTillMax: string;
    warehouseName: string;
    boxDeliveryAndStorageExpr: number | null;
    boxDeliveryBase: number | null;
    boxDeliveryLiter: number | null;
    boxStorageBase: number | null;
    boxStorageLiter: number | null;
    created_at?: Date;
    updated_at?: Date;
}
