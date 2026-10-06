import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const dbPath = process.env.DATABASE_URL!;
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

migrate(drizzle(sqlite), { migrationsFolder: "./drizzle" });
sqlite.close();
console.log("migration applied");
