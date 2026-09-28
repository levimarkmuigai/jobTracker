import {
  Application,
  applications,
  type InsertApplication,
  type UpdateApplication,
} from "@jobTracker/schema";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

async function query<T>(action: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[database error] failed to ${action}:`, error);
    throw new Error(`${action} failed`, { cause: error });
  }
}

export async function createApplication(data: InsertApplication): Promise<Application> {
  return query("create application", async () => {
    const [row] = await db.insert(applications).values(data).returning();
    return row;
  });
}

export async function readAllApplications(): Promise<Application[]> {
  return query("read applications", async () => await db.select().from(applications));
}

export async function updateApplication(
  data: UpdateApplication,
  id: number,
): Promise<Application | undefined> {
  return query("update application", async () => {
    const [row] = await db
      .update(applications)
      .set(data)
      .where(eq(applications.id, id))
      .returning();
    return row;
  });
}

export async function deleteApplication(id: number): Promise<boolean> {
  return query("delete application", async () => {
    const row = await db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning({ id: applications.id });
    return row != null;
  });
}
