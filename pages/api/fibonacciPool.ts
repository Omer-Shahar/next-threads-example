// import { spawn, Pool } from "threads";
// import { QueuedTask } from "threads/dist/master/pool";
import { MathWorker } from "workers/math.worker";
// import { PoolWorker } from "../../workers/use";

// export default async (req: any, res: any) => {
//   const POOL_SIZE = 4;

//   const pool = Pool(() => spawn<MathWorker>(new PoolWorker("math.worker.ts")), POOL_SIZE);

//   type UnwrapPool<T> = T extends Pool<infer U> ? U : T;
//   type TaskType = UnwrapPool<typeof pool>;
//   const tasks: QueuedTask<TaskType, ReturnType<MathWorker["fibonacci"]>>[] = [];

//   for (let n = 0; n < 10; n++) {
//     tasks.push(pool.queue((worker) => worker.fibonacci(n)));
//   }

//   const results = await Promise.all(tasks);

//   await pool.terminate();

//   res.status(200).json(results);
// };
