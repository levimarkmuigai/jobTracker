import z from "zod";
export declare const insertApplicationSchema: z.ZodObject<{
    company: z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>;
    link: z.ZodOptional<z.ZodNullable<z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>>>;
    role: z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        wishlist: "wishlist";
        applied: "applied";
        screening: "screening";
        interviewing: "interviewing";
        offer: "offer";
        rejected: "rejected";
        withdrawn: "withdrawn";
    }>>;
    dateApplied: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>>>;
    nextAction: z.ZodOptional<z.ZodNullable<z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>>>;
    nextActionDate: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>>>;
}, {
    out: {};
    in: {};
}>;
export declare const selectApplicationSchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "applications";
        dataType: "number";
        columnType: "SQLiteInteger";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    company: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "company";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    role: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "role";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "status";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: "wishlist" | "applied" | "screening" | "interviewing" | "offer" | "rejected" | "withdrawn";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["wishlist", "applied", "screening", "interviewing", "offer", "rejected", "withdrawn"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    dateApplied: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "date_applied";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    link: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "link";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    source: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "source";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    nextAction: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "next_action";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    nextActionDate: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "next_action_date";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    notes: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "notes";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, undefined, undefined>;
export declare const updateApplicationSchema: import("drizzle-zod").BuildSchema<"update", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "applications";
        dataType: "number";
        columnType: "SQLiteInteger";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    company: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "company";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    role: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "role";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "status";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: "wishlist" | "applied" | "screening" | "interviewing" | "offer" | "rejected" | "withdrawn";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["wishlist", "applied", "screening", "interviewing", "offer", "rejected", "withdrawn"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    dateApplied: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "date_applied";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    link: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "link";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    source: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "source";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    nextAction: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "next_action";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    nextActionDate: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "next_action_date";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    notes: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "notes";
        tableName: "applications";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "applications";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, {
    status: z.ZodEnum<{
        wishlist: "wishlist";
        applied: "applied";
        screening: "screening";
        interviewing: "interviewing";
        offer: "offer";
        rejected: "rejected";
        withdrawn: "withdrawn";
    }>;
    nextAction: (schema: z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>) => z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>;
    nextActionDate: (schema: z.ZodDate) => z.ZodDate;
    notes: (schema: z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>) => z.ZodType<Buffer, unknown, z.core.$ZodTypeInternals<Buffer, unknown>>;
}, undefined>;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = z.infer<typeof selectApplicationSchema>;
export type UpdateApplication = z.infer<typeof updateApplicationSchema>;
//# sourceMappingURL=zod.d.ts.map