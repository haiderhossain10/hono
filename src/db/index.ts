import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "haider",
    database: "learning",
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
