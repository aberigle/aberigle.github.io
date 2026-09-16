import { $ } from "bun"
import type { BunPlugin } from "bun"
import { html } from "./src/main"

await $`rm -rf dist`

// SSG: inyecta el HTML ya renderizado al principio de <body> antes de bundlear.
// El cliente solo hidrata comportamiento (iconos, animación, background, lastfm).
const ssg: BunPlugin = {
  name: "ssg",
  setup(build) {
    build.onLoad({ filter: /index\.html$/ }, async ({ path }) => {
      const page = await Bun.file(path).text()

      return {
        contents: page.replace("<body>", () => `<body>${html}`),
        loader: "html",
      }
    })
  },
}

const result = await Bun.build({
  entrypoints : ["index.html", "./cheap-notion/index.html"],
  target      : "browser",
  outdir      : "./dist",
  external    : ["./public/umascript.js"],
  define      : { "import.meta.env.PROD": "true" },
  plugins     : [ssg],
});

if (!result.success) {
  for (const log of result.logs) console.error(log);
  process.exit(1);
}

await $`mkdir -p dist/public && cp public/* dist/public/`
