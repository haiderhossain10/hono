import { serve } from "@hono/node-server";
import { Hono } from "hono";
import products from "./api/products/";
export const app = new Hono();

const port = 3000;
console.log(`Server is running on port ${port}`);

app.route("/api/products", products);

serve({
    fetch: app.fetch,
    port,
});
