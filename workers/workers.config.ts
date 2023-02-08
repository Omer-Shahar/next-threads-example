import { Worker } from "threads";
import { ThreadsWorkerOptions } from "threads/dist/types/master";

const Base = "workers";
type WorkerFiles = "math.worker.ts"; // | "other.worker.ts"

// export type-safe worker classes

export class SingleThreadWorker extends Worker {
  constructor(url: WorkerFiles, options?: ThreadsWorkerOptions) {
    // sometimes a different number of ../ is needed
    super(`../../../../../../../../${Base}/${url}`, options);
  }
}

export class PoolWorker extends Worker {
  constructor(url: WorkerFiles, options?: ThreadsWorkerOptions) {
    // sometimes a different number of ../ is needed
    super(`../../../../../../../${Base}/${url}`, options);
  }
}
