import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const applications = sqliteTable(
  "applications",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    company: text("company").notNull(),
    role: text("role").notNull(),
    status: text("status", {
      enum: ["wishlist", "applied", "screening", "interviewing", "offer", "rejected", "withdrawn"],
    })
      .notNull()
      .default("applied"),
    dateApplied: integer("date_applied", { mode: "timestamp" }),
    link: text("link"),
    source: text("source"),
    nextAction: text("next_action"),
    nextActionDate: integer("next_action_date", { mode: "timestamp" }),
    notes: text("notes"),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [uniqueIndex("job_id_idx").on(table.id)],
);
