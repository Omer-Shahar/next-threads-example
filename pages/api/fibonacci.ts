import { spawn, Thread } from "threads";
import { getMathWorker } from "workers/getServerWorker";
import { MathWorker } from "workers/math.worker";

export default async (req: any, res: any) => {
  const worker = await spawn<MathWorker>(getMathWorker());

  const result = await worker.fibonacci(35);

  await Thread.terminate(worker);

  res.status(200).json(result);
};
