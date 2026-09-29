import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { applications } from "./db";
import z from "zod";

const status = z.enum([
  "wishlist",
  "applied",
  "screening",
  "interviewing",
  "offer",
  "rejected",
  "withdrawn",
]);

export const insertApplicationSchema = z.object({
  company: z.string(),
  role: z.string(),
  status: status,
  dateApplied: z.coerce.date().nullable().optional(),
  link: z.string(),
  source: z.string(),
  nextAction: z.string(),
  nextActionDate: z.coerce.date().nullable().optional(),
  notes: z.string(),
});
export const selectApplicationSchema = createSelectSchema(applications);
export const updateApplicationSchema = createUpdateSchema(applications, {
  status: status,
  nextAction: z.string(),
  nextActionDate: z.coerce.date().nullable().optional(),
  notes: z.string(),
})
  .omit({
    id: true,
    company: true,
    role: true,
    dateApplied: true,
    link: true,
    source: true,
    updatedAt: true,
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one feild must be provided",
  });
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = z.infer<typeof selectApplicationSchema>;
export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
