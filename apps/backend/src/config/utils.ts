import type { Integration } from "./schema";

export function integrationsOfType<T extends Integration["type"]>(
  integrations: Integration[],
  desired: T,
): Extract<Integration, { type: T }>[] {
  return integrations.filter(
    (integration) => integration.type === desired,
  ) as Extract<Integration, { type: T }>[];
}
