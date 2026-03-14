import { pino, type Logger } from "pino";

let logger: Logger | undefined = undefined;

export function initLogger(config: object): Logger {
  if (logger !== undefined) {
    throw new Error("TODO: Double init");
  }
  // TODO: Create/Load logger config
  logger = pino();
  return logger;
}

export function getLogger(): Logger {
  if (logger === undefined) {
    throw new Error("TODO: Better error");
  }
  return logger;
}
