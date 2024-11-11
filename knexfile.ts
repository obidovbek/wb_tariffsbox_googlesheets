import type { Knex } from "knex";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: process.env.PGHOST || "127.0.0.1",
            user: process.env.PGUSER || "postgres",
            password: process.env.PGPASSWORD || "123456",
            database: process.env.PGDATABASE || "postgres",
            port: Number(process.env.PGPORT) || 5432,
        },
        migrations: {
            directory: "./src/migrations",
            extension: "ts",
        },
        seeds: {
            directory: "./src/seeds",
        },
    },

    production: {
        client: "pg",
        connection: {
            host: process.env.PGHOST,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            port: Number(process.env.PGPORT),
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: "./dist/src/migrations",
            extension: "js",
        },
        seeds: {
            directory: "./dist/src/seeds",
        },
    },
};

export default config;
