import getImport from '_playground_virtual_imports'
import * as esbuild from 'esbuild-wasm'
import path from 'node:path'
import { GET_IMPORT_FUNC_NAME } from '../constants'

const wasmUrl = new URL('./esbuild.wasm', import.meta.url)

const GLOBAL_MODULE_NAME = 'xyz'

export class Compiler {
  private isInitialized = false
  private readonly decoder: TextDecoder

  constructor() {
    this.decoder = new TextDecoder()

    esbuild
      .initialize({
        wasmURL: wasmUrl.pathname,
      })
      .then(() => {
        this.isInitialized = true
      })
  }

  public async compile(options: { tree: Record<string, string>; entryPoint?: string }) {
    if (!this.isInitialized) return

    const { tree, entryPoint = 'App.tsx' } = options

    const result = await esbuild.build({
      entryPoints: [entryPoint.charAt(0) === '/' ? entryPoint.slice(1) : entryPoint],
      plugins: [
        {
          name: 'import-resolve',
          setup: (build) => {
            build.onResolve({ filter: /.*/ }, this.onResolveCallback)
            build.onLoad({ filter: /.*/ }, (args) => this.onLoadCallback(args, tree))
          },
        },
      ],
      loader: {
        '.tsx': 'tsx',
        '.jsx': 'jsx',
      },
      target: ['es2020'],
      minify: false,
      format: 'iife',
      globalName: GLOBAL_MODULE_NAME,

      // required
      bundle: true,
      write: false,
    })

    const contents = result.outputFiles[0].contents

    const decoded = this.decoder.decode(contents)

    return this.getDefaultExport(decoded)
  }

  private getDefaultExport(moduleString: string) {
    const withReplacedRequire = moduleString.replaceAll('__require(', `${GET_IMPORT_FUNC_NAME}(`)

    const runExports: Record<'default', React.FC | null> = { default: null }
    const func = new Function(
      GET_IMPORT_FUNC_NAME,
      'runExports',
      `var React = ${GET_IMPORT_FUNC_NAME}('react', true);\n${withReplacedRequire}\nrunExports.default = ${GLOBAL_MODULE_NAME}.default`
    )
    func(getImport, runExports)

    // console.log({ esbuild: runExports.default?.toString() })

    return runExports.default
  }

  private onResolveCallback(args: esbuild.OnResolveArgs) {
    // console.log({ args })
    if (args.kind === 'entry-point') {
      const path = `/${args.path}`
      // console.log({ path })

      return { path }
    }

    if (args.kind !== 'import-statement') {
      return { path: args.path }
    }

    // console.log(args.path)
    if (args.path.startsWith('.')) {
      // console.log('local')
      const basename = path.basename(args.path)
      const hasExtension = !!path.extname(basename)
      const resolvedExt = hasExtension ? '' : '.tsx'

      const resolvedPath = `/${basename}${resolvedExt}`

      // console.log({ resolvedPath, basename, extname: hasExtension })
      // const filePath = path.join(dirname, args.path)
      // console.log('importing', args.path)

      return { path: resolvedPath }
    } else {
      return { path: `${args.path}`, external: true }
    }
  }

  private onLoadCallback(args: esbuild.OnLoadArgs, tree: Record<string, string>) {
    // console.log('onLoad args', args)

    if (args.path.includes('.tsx')) {
      const contents = tree[args.path]

      // console.log({ tree, args, contents })

      return { contents, loader: 'tsx' } as const
    } else {
      const newLocal = args.path.replace('/', '')
      // console.log({ newLocal })
      const contents = getImport(newLocal) ?? ''

      // console.log('virtual import', { contents })

      return { contents }
    }
  }
}
