import { Application, type InsertApplication, type UpdateApplication } from "@jobTracker/schema";
export declare function createApplication(data: InsertApplication): Promise<Application>;
export declare function readAllApplications(): Promise<Application[]>;
export declare function updateApplication(data: UpdateApplication, id: number): Promise<Application | undefined>;
export declare function deleteApplication(id: number): Promise<boolean>;
//# sourceMappingURL=queries.d.ts.map