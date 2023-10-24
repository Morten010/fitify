import * as schema from "./schema"
import 'dotenv/config'
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

console.log("DATABASE: url", process.env.DATABASE_URL);

// create the connection
const connection = connect({
    url: process.env.DATABASE_URL
  });

export const db = drizzle(connection, {schema})
