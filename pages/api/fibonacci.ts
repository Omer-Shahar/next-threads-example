import { spawn, Thread } from "threads";
import { MathWorker } from "../../workers/math.worker";
import { SingleThreadWorker } from "../../workers/workers.config";

export default async (req: any, res: any) => {
  const worker = await spawn<MathWorker>(new SingleThreadWorker("math.worker.ts"));

  const result = await worker.fibonacci(35);

  await Thread.terminate(worker);

  res.status(200).json(result);
};
