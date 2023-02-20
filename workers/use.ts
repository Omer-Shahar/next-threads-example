import { randomUUID } from "crypto";
import { parentPort, Worker as RegularWorker } from "worker_threads";

export class Worker<T> extends RegularWorker {}

type MessageType = "get" | "run";

type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? Promise<(...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>>>
    : Promise<T[K]>;
};

export function Spawn<T extends object>(worker: Worker<T>) {
  return new Proxy<any>(
    {},
    {
      get: (_, key) => {
        return getProxyPromise("get", worker, key, []);
      },
    }
  ) as Promisify<T>;
}

function getProxyPromise<T>(type: MessageType, worker: Worker<T>, key: string | symbol, args: any[]) {
  return new Promise((resolve, reject) => {
    const id = randomUUID();
    worker.postMessage({ id, type, key, args });

    function onMessage(message: any) {
      if (message.id !== id) return;
      worker.off("message", onMessage);
      if (message.type === "success") {
        resolve(message.result);
      }
      if (message.type === "error") {
        reject({ message: message.error.message, stack: message.error.stack });
      }
      if (message.type === "function") {
        resolve((...args: any[]) => getProxyPromise("run", worker, key, args));
      }
    }
    worker.on("message", onMessage);

    worker.once("exit", (code) => {
      if (code === 0) return;
      reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

export function Expose<T extends object>(exposed: T) {
  parentPort?.on(
    "message",
    <K extends keyof T>({ type, key, id, args }: { type: MessageType; key: K; id: string; args: any[] }) => {
      if (!(key in exposed)) return;
      if (type === "run" && typeof exposed[key] === "function") {
        handleRun(exposed[key] as Function, args, id);
      } else if (type === "get") {
        handleGet(exposed[key], id);
      }
    }
  );
}

function handleRun(fn: Function, args: any[], id: string) {
  try {
    parentPort?.postMessage({ result: fn(...args), id, type: "success" });
  } catch (error) {
    parentPort?.postMessage({ error, id, type: "error" });
  }
}

function handleGet(value: any, id: string) {
  if (typeof value === "function") {
    parentPort?.postMessage({ id, type: "function" });
  } else {
    parentPort?.postMessage({ result: value, id, type: "success" });
  }
}
