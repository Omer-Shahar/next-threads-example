import { expose } from "threads/worker";

const hello = (name: string) => "Hello " + name;

const mathWorker = {
  hello,
};

export type HelloWorker = typeof mathWorker;

expose(mathWorker);
