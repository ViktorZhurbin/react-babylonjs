import fs from 'node:fs/promises'
import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { getMdxJsEsm } from './getMdxJsEsm'
import { getMdxJsx } from './getMdxJsx'
import {
  JsxEmit,
  ModuleKind,
  NewLineKind,
  ScriptTarget,
  transpileModule,
  TranspileOptions,
} from 'typescript'

const TRANSPILE_OPTIONS: TranspileOptions = {
  reportDiagnostics: false,
  compilerOptions: {
    jsx: JsxEmit.Preserve,
    module: ModuleKind.ESNext,
    target: ScriptTarget.ESNext,
    newLine: NewLineKind.CarriageReturnLineFeed,
    // removeComments: false,
  },
}

export const remarkFileLoader = () => async (tree: Root, vfile: VFile) => {
  // if (!vfile.dirname.endsWith('basic/animations')) return

  const seen: Record<string, boolean> = {}
  const promises: Promise<void>[] = []

  visit(tree, 'paragraph', (paragraphNode, index) => {
    promises.push(
      (async () => {
        // Only process parent nodes
        if (!paragraphNode.children) return

        /**
         * Shortcode `[devtool:BasicAnimations.tsx]` is parsed as a paragraphNode with three children:
         * {
         *    type: "paragraph",
         *    children: [
         *      { type: "text", value: "[devtool" }
         *      { type: "textDirective", name: "BasicAnimations" }
         *      { type: "text", value: ".tsx]" }
         *    ]
         */
        if (paragraphNode.children.length !== 3) return

        // The [shortcode] syntax shows up as a linkReference node - filter out all others
        const [shortcodeNode, fileNameNode, extensionNode] = paragraphNode.children

        if (!(shortcodeNode.type === 'text' && shortcodeNode.value === '[devtool')) return

        // @ts-expect-error
        if (fileNameNode.type !== 'textDirective') return

        if (!(extensionNode.type === 'text' && extensionNode.value === '.tsx]')) {
          throw new Error('Only .tsx files are supported.')
        }

        const moduleName = (fileNameNode as { name: string }).name

        const stringImports: string[] = []
        const stringJsx: string[] = []

        // Import the DevTool component
        if (!seen['DevTool']) {
          stringImports.push(`import DevTool from "@site/src/components/DevTool/DevTool"`)
          seen['DevTool'] = true
        }

        // Insert an import if this component hasn't been seen yet
        if (!seen[moduleName]) {
          stringImports.push(`import ${moduleName} from "./${moduleName}"`)
          seen[moduleName] = true
        }

        const sourceFilePath = `${vfile.dirname}/${moduleName}.tsx`
        const sourceTs = await fs.readFile(sourceFilePath, 'utf-8')
        const sourceJs = transpileModule(sourceTs, TRANSPILE_OPTIONS).outputText

        stringJsx.push(
          `\n<DevTool component={${moduleName}} sourceTs={${JSON.stringify(
            sourceTs
          )}} sourceJs={${JSON.stringify(sourceJs)}} />\n`
        )

        const mdxJsEsm = getMdxJsEsm(stringImports.join('\n'))
        const mdxJsx = getMdxJsx(stringJsx.join('\n'))

        tree.children.splice(index, 1, ...mdxJsEsm, ...mdxJsx)
      })()
    )
  })
  await Promise.all(promises)

  return tree
}
