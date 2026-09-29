export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    constructor(statusCode: number, code: string, message: string, options?: ErrorOptions);
}
export declare const notFound: (what: string) => AppError;
//# sourceMappingURL=errors.d.ts.map