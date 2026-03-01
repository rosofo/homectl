import Fastify from "fastify";
import { integrationsOfType, loadConfig } from "./config";
import { getLogger, initLogger } from "./logger";
import createClient, { type Client } from "openapi-fetch";
import { type paths as otbrPaths } from "otbr-posix-api";
import { loadIntegrations, OtbrRestService } from "./integrations";

export interface EnvVars {
  [k: string]: string | undefined;
}

export async function main(configPath: string, envVars: EnvVars) {
  const config = await loadConfig(configPath, (query) => envVars[query]);
  const logger = initLogger(config);
  logger.info("Logging initalized!");
  logger.info(config);

  const integration = integrationsOfType(config.integrations, "otbr-rest")[0];
  if (integration !== undefined) {
  }
  // TODO: Pretty sure none of this is actually run-time type checked, so uhhhh do that at some point plz
  const services = await loadIntegrations(config.integrations);
  for (const [name, otbr] of services.getServicesOfType(OtbrRestService)) {
    const result = await otbr.client.GET("/node/network-name");
    const data = result.data;
    console.log(data);
  }

  const fastify = Fastify({
    loggerInstance: logger,
  });

  // TODO: move out to its own route area
  fastify.get("/api/otbr/:name/node", async (request, reply) => {
    const { name } = request.params as { name: string };
    const svc = services.getServiceWithName(name, OtbrRestService);
    if (svc === undefined) {
      return reply.status(404);
    }
    return (await svc.client.GET("/node")).data;
  });

  fastify.listen({ port: config.server.http.port }, function (err) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
}
