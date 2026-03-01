import { isArray, isObject } from "./types";

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = {
  [k: string]: Json;
};
export type Json = JsonObject | JsonArray | JsonPrimitive;

export function recurseJson(
  json: Json,
  mapper: (element: JsonPrimitive) => Json | undefined,
): Json {
  if (isObject(json)) {
    const jsonCopy = { ...json };
    for (const key in json) {
      json[key] = recurseJson(json[key] as Json, mapper);
    }
    return jsonCopy;
  } else if (isArray(json)) {
    const jsonCopy = [...json];
    for (const index in jsonCopy) {
      jsonCopy[index] = recurseJson(jsonCopy[index] as Json, mapper);
    }
    return jsonCopy;
  }

  return mapper(json) ?? json;
}
