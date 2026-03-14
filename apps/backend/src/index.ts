import { env } from "node:process";
import { main } from "./main";

const configPath = env["CONFIG_FILE"];
if (configPath === undefined) {
  throw new Error("'CONFIG_FILE' env var is required but was not provided");
}
main(configPath, { ...env });
