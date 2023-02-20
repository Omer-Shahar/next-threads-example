import { Worker } from "workers/use";
import { MathWorker } from "./math.worker";

export const createMathWorker = () => new Worker<MathWorker>(new URL("workers/math.worker.ts", import.meta.url));
