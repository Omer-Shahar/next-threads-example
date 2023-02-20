import { threadId } from "worker_threads";
import { Expose } from "./use";

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
    if (n < 0) throw new Error("n must be >= 0");
    return { type: "fibonacci", n, result: fibonacci(n), threadId } as const;
  },
  lucas(n: number) {
    console.log(`Calculating lucas(${n}) in thread ${threadId}...`);
    return { type: "lucas", n, result: lucas(n), threadId } as const;
  },
  test(n: number, m: number) {
    console.log(`Calculating test(${n}, ${m}) in thread ${threadId}...`);
    return { type: "test", n, m, result: n + m, threadId } as const;
  },
  field: { a: 1, b: 2, c: 3 },
};

export type MathWorker = typeof mathWorker;

Expose(mathWorker);
