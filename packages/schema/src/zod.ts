import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { applications } from "./db";
import z from "zod";

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  updatedAt: true,
});
export const selectApplicationSchema = createSelectSchema(applications);
export const updateApplicationSchema = createUpdateSchema(applications, {
  status: z.enum([
    "wishlist",
    "applied",
    "screening",
    "interviewing",
    "offer",
    "rejected",
    "withdrawn",
  ]),
  nextAction: (schema) => schema,
  nextActionDate: (schema) => schema,
  notes: (schema) => schema,
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one feild must be provided",
});
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = z.infer<typeof selectApplicationSchema>;
export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
