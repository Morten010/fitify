import * as schema from "./schema"
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import 'dotenv/config'

neonConfig.fetchConnectionCache = true;

console.log(process.env.DATABASE_URL!);

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, {schema});
