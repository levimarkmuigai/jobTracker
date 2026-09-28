import Fastify from "fastify";
import cors from "@fastify/cors";
import z from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { AppError, notFound } from "./errors.js";
import {
  insertApplicationSchema,
  selectApplicationSchema,
  updateApplicationSchema,
} from "@jobTracker/schema";
import {
  createApplication,
  readAllApplications,
  updateApplication,
  deleteApplication,
} from "./queries.js";

export async function buildApp() {
  const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({
        error: { code: "VALIDATION_ERROR", message: "Invalid request", details: error.validation },
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: { code: error.code, message: error.message },
      });
    }

    request.log.error({ err: error }, "unhandled error");
    return reply.status(500).send({
      error: { code: "INTERNAL_ERROR", message: "Something went wrong", requestId: request.id },
    });
  });

  await app.register(cors, {
    origin: "http://localhost:5173",
  });

  app.get("/health", async () => ({ status: "ok" }));

  app.post(
    "/application",
    { schema: { body: insertApplicationSchema, response: { 201: selectApplicationSchema } } },
    async (request, reply) => {
      const row = await createApplication(request.body);
      return reply.status(201).header("Location", `/applications/${row.id}`).send(row);
    },
  );

  app.get(
    "/applications",
    { schema: { response: { 200: z.array(selectApplicationSchema) } } },
    async (_request, _reply) => {
      return readAllApplications();
    },
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/application/:id",
    {
      schema: {
        params: z.object({ id: z.coerce.number().int().positive() }),
        body: updateApplicationSchema,
        response: { 200: selectApplicationSchema },
      },
    },
    async (request) => {
      const row = await updateApplication(request.body, request.params.id);
      if (!row) throw notFound("Application");
      return row;
    },
  );

  app.delete(
    "/application/:id",
    { schema: { params: z.object({ id: z.coerce.number().int().positive() }) } },
    async (request, reply) => {
      const deleted = await deleteApplication(request.params.id);
      if (!deleted) throw notFound("Application");
      return reply.status(204).send();
    },
  );

  return app;
}
