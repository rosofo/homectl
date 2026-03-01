import createClient from "openapi-fetch";
import { MatterServerService } from "./matterServer";
import { OtbrRestService } from "./otbrRest";
import { type paths as otbrPaths } from "otbr-posix-api";
import type {
  Integration,
  MatterIntegration,
  OtbrIntegration,
} from "../config";
import { getLogger } from "../logger";

export abstract class Service {
  abstract get name(): string;
}

export type Class<T> = new (...args: any[]) => T;

export class InstanceCatalog<B = unknown> {
  instances: Map<string, B>;

  constructor(instances: Map<string, B>) {
    this.instances = new Map(instances);
  }

  getServicesOfType<T>(desiredClass: Class<T>): Map<string, T> {
    return new Map(
      Object.entries(this.instances)
        .filter(([, instance]) => instance instanceof desiredClass)
        .map(([key, instance]) => [key, instance] as [string, T]),
    );
  }
  getServiceWithName<T extends B>(name: string, type: Class<T>): T | undefined;
  getServiceWithName<T extends B>(
    name: string,
    type: Class<T> | undefined = undefined,
  ): B | undefined {
    const instance = this.instances.get(name);
    if (
      instance !== undefined &&
      type !== undefined &&
      !(instance instanceof type)
    ) {
      throw new Error(
        "TODO: Proper error message about unexpectedly wrong type",
      );
    }
    return instance;
  }
}

export type ServiceGenerator<I, R> = (integration: I) => Promise<R>;

interface IntegrationGenerators {
  "matter-server": ServiceGenerator<MatterIntegration, MatterServerService>;
  "otbr-rest": ServiceGenerator<OtbrIntegration, OtbrRestService>;
}

const integrationGenerators: IntegrationGenerators = {
  "matter-server": async (i) => {
    const ws = new WebSocket(i.websocket);
    // TODO: Wait for connection open
    return new MatterServerService(i.name, ws);
  },
  "otbr-rest": async (i) => {
    const client = createClient<otbrPaths>({ baseUrl: i.restEndpoint });
    const result = await client.GET("/node/state");
    if (result.error !== undefined) {
      throw new Error("TODO: OTBR is unhappy");
    }
    return new OtbrRestService(i.name, client);
  },
};

export async function loadIntegrations(
  integrations: Integration[],
): Promise<InstanceCatalog<Service>> {
  const map: Map<string, Service> = new Map();
  const promises = integrations.map(async (integration) => {
    const generator = integrationGenerators[integration.type];
    // @ts-ignore
    const promise = await generator(integration);
    getLogger().info(
      `Setup integration '${integration.name}' of type '${integration.type}'`,
    );
    return [integration.name, promise] as [string, typeof promise];
  });
  const results = await Promise.allSettled(promises);
  for (const result of results) {
    if (result.status === "rejected") {
      throw new Error("TODO: Merge into 1 error instead of early throw oops");
    }
    const [name, service] = result.value;
    if (map.has(name)) {
      throw new Error("TODO: We should handle this before we get here");
    }
    map.set(name, service);
  }
  return new InstanceCatalog(map);
}
