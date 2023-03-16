import { Worker } from "threads";

export function getMathWorker() {
  return new Worker(new URL("math.worker", import.meta.url));
}
