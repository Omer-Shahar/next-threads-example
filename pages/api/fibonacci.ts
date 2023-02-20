import { createMathWorker } from "workers/create";
import { Spawn } from "workers/use";

export default async (req: any, res: any) => {
  const rawWorker = createMathWorker();
  const worker = Spawn(rawWorker);

  const fibonacci = await worker.fibonacci;
  const field = await worker.field;
  const promises = [fibonacci(35), fibonacci(-1)];
  const results = await Promise.allSettled(promises);
  rawWorker.terminate();

  res.status(200).json({ results, field });
};
