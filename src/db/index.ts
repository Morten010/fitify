import * as schema from "./schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

if (!process.env.DATABASE_URL) throw new Error("missing DATABASE_URL");

export const db = drizzle(process.env.DATABASE_URL, {
  mode: "default",
  schema,
});
