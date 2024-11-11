// src/services/wildberriesService.ts

import axios from "axios";
import dayjs from "dayjs";
import { TariffData } from "#types/tariffs.js";

const WILDBERRIES_API_URL = "https://common-api.wildberries.ru/api/v1/tariffs/box";

/**
 * Fetches tariff data from the Wildberries API.
 *
 * @returns {Promise<TariffData>} - The tariff data fetched from the API.
 */
export async function fetchWildberriesTariffs(): Promise<TariffData> {
    try {
        const currentDate = dayjs().format("YYYY-MM-DD");
        const response = await axios.get(WILDBERRIES_API_URL, {
            headers: { "Authorization": `Bearer ${process.env.WB_API_TOKEN}` },
            params: { date: currentDate },
        });

        const { data } = response.data.response;
        const { dtNextBox, dtTillMax, warehouseList } = data;

        return { dtNextBox, dtTillMax, warehouseList };
    } catch (error) {
        console.error("Error fetching data from Wildberries API:", error);
        throw error;
    }
}
