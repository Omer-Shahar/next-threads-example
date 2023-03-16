import Link from "next/link";
import { useEffect, useRef } from "react";
import { ModuleThread, spawn, Thread } from "threads";
import { getHelloWorker } from "workers/getClientWorker";
import { HelloWorker } from "workers/hello.worker";

export default function Home() {
  const worker = useRef<ModuleThread<HelloWorker>>();

  useEffect(() => {
    if (!worker.current) {
      const load = async () => {
        worker.current = await spawn<HelloWorker>(getHelloWorker());
      };
      load();
    }
    return () => {
      if (worker.current) {
        Thread.terminate(worker.current);
      }
    };
  }, []);

  return (
    <>
      <Link href={"./api/fibonacci"}>Thread API</Link>
      <br />
      <Link href={"./api/fibonacciPool"}>Thread Pool API</Link>
      <br />
      <button
        onClick={async () => {
          alert(await worker.current?.hello("World"));
        }}
      >
        Run Hello Worker
      </button>
    </>
  );
}
