import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";
import "dotenv/config";

// const client = new Client({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

const client = new Client({
    connectionString: process.env.DB_URL!!,
});

client
    .connect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const db = drizzle(client, { schema });

export default db;
