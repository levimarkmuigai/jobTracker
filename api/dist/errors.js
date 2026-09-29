export class AppError extends Error {
    statusCode;
    code;
    constructor(statusCode, code, message, options) {
        super(message, options);
        this.statusCode = statusCode;
        this.code = code;
    }
}
export const notFound = (what) => new AppError(404, "NOT_FOUND", `${what} not found`);
//# sourceMappingURL=errors.js.map