import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { applications } from "./db";
import z from "zod";
export const insertApplicationSchema = createInsertSchema(applications, {
    dateApplied: () => z.coerce.date().nullable().optional(),
}).omit({
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
    nextActionDate: () => z.coerce.date().nullable().optional(),
    notes: (schema) => schema,
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
//# sourceMappingURL=zod.js.map