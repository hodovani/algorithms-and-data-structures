# Algorithms and Data Structures

My TypeScript solutions to data structure and algorithm exercises. Each exercise has its implementation and tests in the same directory under `src/`.

## Run locally

Use Node.js 24 and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```

To run one exercise's tests, pass the file to Node's built-in runner.

```sh
node --test src/queue/queue.test.mjs
```

Use the committed Biome configuration with your editor, or run the pinned version from the command line.

```sh
pnpm dlx @biomejs/biome@2.6.9 check
```
