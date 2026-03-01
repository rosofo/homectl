import z from "zod";

const matterIntegration = z.object({
  type: z.literal("matter-server"),
  name: z.string(),
  websocket: z.string(),
});
export type MatterIntegration = z.infer<typeof matterIntegration>;

const otbrIntegration = z.object({
  type: z.literal("otbr-rest"),
  name: z.string(),
  restEndpoint: z.string(),
});
export type OtbrIntegration = z.infer<typeof otbrIntegration>;
const integration = z.discriminatedUnion("type", [
  matterIntegration,
  otbrIntegration,
]);
export type Integration = z.infer<typeof integration>;

// TODO: Not happy with config yet :eek:
const configV1 = z.object({
  version: z.literal("v1"),
  server: z
    .object({
      http: z.object({ port: z.number().default(8080) }).prefault({}),
    })
    .prefault({}),
  integrations: z.array(integration).default([]),
});

export const configSchema = z.discriminatedUnion("version", [configV1]);
export type Config = z.infer<typeof configSchema>;
