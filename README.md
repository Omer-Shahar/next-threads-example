# Next.js Threads Example

This is a minimal example of how to use Next.js with Threads.js, using only TypeScript.

## How to use

Start a new Next.js project with TypeScript.

My recommendation is to use [create-t3-app](https://github.com/t3-oss/create-t3-app).

```bash
npm create t3-app@latest
```

<!-- Put a note with warning here: -->

> Don't use this repo as a template for your Next.js project.
> It's not a template, it's a minimal example.

Add `threads` as a dependency.

```bash
npm i threads
```

Add `ts-node` as a dev dependency.

```bash
npm i -D ts-node
```

Add the following code to `tsconfig.json`:

```json
{
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  },
  ... // other options
}
```

Copy the content of the `api` folder to your `api` folder.

Copy the `workers` folder to your project

Start the development server.

```bash
npm run dev
```

Next, the `workers/workers.config.ts` file needs to be adjusted according to your project:

> This file is only used for improved type-safety.
> You can use the `Worker` class directly if you want.

Go to `http://localhost:3000/api/fibonacci` and check that everything works.

If the error `Error: Cannot find module` appears, add or remove the string `../` from the code of the class `SingleThreadWorker`.

Then, do the same for `http://localhost:3000/api/fibonacciPool` and the class `PoolWorker`.

Happy Coding!
