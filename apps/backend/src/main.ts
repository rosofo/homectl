import Fastify from "fastify";
import { loadConfig } from "./config";
import { getLogger, initLogger } from "./logger";

export interface EnvVars {
  [k: string]: string | undefined;
}

export async function main(configPath: string, envVars: EnvVars) {
  const configFile = await loadConfig(configPath, (query) => envVars[query]);
  const logger = initLogger(configFile);
  logger.info("Logging initalized!");
  logger.info(configFile);

  // const fastify = Fastify({
  //   logger:
  // })
}
