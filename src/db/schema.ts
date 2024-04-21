import {
    pgTable,
    serial,
    varchar,
    decimal,
    timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    price: decimal("price", { precision: 10 }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});
