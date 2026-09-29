import { buildApp } from "./app.js";
const port = Number(process.env.PORT) || 3001;
const app = await buildApp();
async function shutdown(signal) {
    app.log.info(`${signal} received, shutting down`);
    try {
        await app.close();
        process.exit(0);
    }
    catch (err) {
        app.log.error(err, "error during shutdown");
        process.exit(1);
    }
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
await app.listen({ port, host: "0.0.0.0" });
//# sourceMappingURL=index.js.map