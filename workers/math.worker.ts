import { expose } from "threads/worker";
import { threadId } from "worker_threads";

function fibonacci(n: number): number {
  if (n < 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function lucas(n: number): number {
  if (n === 0) return 2;
  if (n === 1) return 1;
  return lucas(n - 1) + lucas(n - 2);
}

const mathWorker = {
  fibonacci(n: number) {
    console.log(`Calculating fibonacci(${n}) in thread ${threadId}...`);
    return { type: "fibonacci", n, result: fibonacci(n), threadId } as const;
  },
  lucas(n: number) {
    console.log(`Calculating lucas(${n}) in thread ${threadId}...`);
    return { type: "lucas", n, result: lucas(n), threadId } as const;
  },
};

export type MathWorker = typeof mathWorker;

expose(mathWorker);

//! IMPORTANT:
// 1. Add ts-node as a dev dependency
// 2. Add ts-node configurations in tsconfig.json
// 3. Make sure that workers/workers.ts has the right path to the worker files
