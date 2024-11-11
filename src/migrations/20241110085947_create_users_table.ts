import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("wildberries_tariffs", (table) => {
        table.increments("id").primary();
        table.date("dtNextBox").nullable();
        table.date("dtTillMax").nullable();
        table.string("warehouseName").notNullable();
        table.decimal("boxDeliveryAndStorageExpr", 10, 2);
        table.decimal("boxDeliveryBase", 10, 2);
        table.decimal("boxDeliveryLiter", 10, 2);
        table.decimal("boxStorageBase", 10, 2);
        table.decimal("boxStorageLiter", 10, 2);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.unique(["dtNextBox", "dtTillMax", "warehouseName"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("wildberries_tariffs");
}
