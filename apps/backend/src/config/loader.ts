import type { PathLike } from "node:fs";
import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import { type Json, recurseJson } from "utils";
import z from "zod";
import { configSchema, type Config } from "./schema";

function preprocess(yamlContents: Json, envProvider: EnvProvider): Json {
  return recurseJson(yamlContents, (primitive) => {
    if (typeof primitive !== "string") return undefined;
    return primitive.replaceAll(
      /(\\\$|\$){([A-Za-z0-9_-]+)(?::(.+))?}/g,
      (match, dollar, envQuery, defaultVal) => {
        if (
          typeof dollar !== "string" ||
          typeof envQuery !== "string" ||
          (typeof defaultVal !== "string" && defaultVal !== undefined)
        ) {
          throw new Error("TODO: Common error for application bugs");
        }
        // Note: TypeScript not yet smart enough to handle this, should refactor
        //       code to make the solvers job a bit easier
        const defaultValTyped = defaultVal as string | undefined;

        if (dollar == "\\$") return match;

        const requestedValue = envProvider(envQuery);
        const calculatedValue =
          requestedValue !== undefined ? requestedValue : defaultValTyped;

        if (calculatedValue === undefined) {
          // TODO: Offer advice to fix
          throw new Error(`No value or default available for: '${envQuery}'`);
        }

        return calculatedValue;
      },
    );
  });
}

export type EnvProvider = (query: string) => string | undefined;
export async function loadConfig(
  path: PathLike,
  envProvider: EnvProvider,
): Promise<Config> {
  const configFile = await readFile(path);
  const yamlConfig = parse(configFile.toString("utf-8"));
  const preprocessedConfig = preprocess(yamlConfig, envProvider);
  const parseResult = await z.safeParseAsync(configSchema, preprocessedConfig);
  if (parseResult.error !== undefined) {
    const errorMessage = `Invalid config file provided: '${path}'`;
    console.error(errorMessage);
    console.error(z.prettifyError(parseResult.error));
    throw new Error(errorMessage);
  }
  return parseResult.data;
}
