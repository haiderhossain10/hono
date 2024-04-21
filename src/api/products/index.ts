import { Hono } from "hono";
import db from "../../db";
import { products } from "../../db/schema";
import { desc, eq } from "drizzle-orm";

const app = new Hono();

interface Product {
    name: string;
    price: string;
}

// create a new product
app.post("/", async (c) => {
    try {
        const { name, price }: Product = await c.req.json();

        const data = await db
            .insert(products)
            .values({
                name,
                price,
            })
            .returning();

        return c.json({ data }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
});

// get all products
app.get("/", async (c) => {
    try {
        const data = await db.query.products.findMany({
            orderBy: [desc(products.id)],
        });

        return c.json({ data });
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
});

// get a single product
app.get("/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));

        const data = await db
            .select()
            .from(products)
            .where(eq(products.id, id));

        return c.json({ data });
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
});

// delete a product
app.delete(":id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));

        const deleted = await db
            .delete(products)
            .where(eq(products.id, id))
            .execute();

        return c.json({ deleted }, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
});

// update a product
app.patch("/:id", async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        const { name, price }: Product = await c.req.json();

        const data = await db
            .update(products)
            .set({
                name,
                price,
            })
            .where(eq(products.id, id))
            .returning();

        return c.json({ data }, 201);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
});

export default app;
