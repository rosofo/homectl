export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

export interface BasicObject {
  [k: string]: unknown;
}

export function isObject(value: unknown): value is BasicObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
