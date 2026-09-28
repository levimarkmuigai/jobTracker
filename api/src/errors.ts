export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    readonly code: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
  }
}

export const notFound = (what: string) => new AppError(404, "NOT_FOUND", `${what} not found`);
