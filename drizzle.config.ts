import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}
 
export default {
    schema: "./src/db/schema.ts",
    driver: "pg",
    out: "./drizzle",
    dbCredentials: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  } satisfies Config