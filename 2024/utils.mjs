import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export function numSort(a, b) {
  return a - b;
}

export function inputPath(path) {
  const dir = dirname(fileURLToPath(path));
  return join(dir, "input");
}
