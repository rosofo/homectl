import type { Service } from "./common";

export class MatterServerService implements Service {
  private _name: string;
  private _websocket: WebSocket;

  constructor(name: string, websocket: WebSocket) {
    this._name = name;
    this._websocket = websocket;
  }

  get name(): string {
    return this._name;
  }
}
