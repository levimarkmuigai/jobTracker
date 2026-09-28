import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "../packages/schema/src/db.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
