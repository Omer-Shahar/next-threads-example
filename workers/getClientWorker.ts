import { Worker } from "threads";

export function getHelloWorker() {
  return new Worker(new URL("hello.worker", import.meta.url));
}
