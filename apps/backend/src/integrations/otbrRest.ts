import type { Client } from "openapi-fetch";
import type { Service } from "./common";
import { type paths as otbrPaths } from "otbr-posix-api";

export class OtbrRestService implements Service {
  private _name: string;
  public readonly client: Client<otbrPaths>;

  constructor(name: string, client: Client<otbrPaths>) {
    this._name = name;
    this.client = client;
  }

  get name(): string {
    return this._name;
  }
}
