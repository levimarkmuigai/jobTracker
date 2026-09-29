import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@jobTracker/schema";
import "dotenv/config";
const sqlite = new Database(process.env.DATABASE_URL);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("synchronous = NORMAL");
sqlite.pragma("busy_timeout = 5000");
export const db = drizzle(sqlite, { schema, logger: true });
//# sourceMappingURL=db.js.map