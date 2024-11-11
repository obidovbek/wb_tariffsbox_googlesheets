import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

/**
 * Knex configuration for PostgreSQL connection.
 *
 * @type {Knex.Config}
 */
const knexConfig: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.PGHOST || "localhost",
        port: Number(process.env.PGPORT) || 5432,
        user: process.env.PGUSER || "postgres",
        password: process.env.PGPASSWORD || "123456",
        database: process.env.PGDATABASE || "postgres",
    },
    pool: { min: 0, max: 10 },
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/migrations",
        extension: "ts",
    },
};

const db: Knex = knex(knexConfig);

/**
 * Test the database connection.
 *
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
    try {
        await db.raw("SELECT 1+1 AS result");
    } catch (error) {
        throw error;
    }
};

export default db;
