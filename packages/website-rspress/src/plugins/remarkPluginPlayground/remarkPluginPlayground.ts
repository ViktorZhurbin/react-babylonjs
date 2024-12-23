import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { getSources } from './getSources'
import { getMdxFromMarkdown } from './getMdxFromMarkdown'

export const remarkPluginPlayground = () => async (tree: Root, file: VFile) => {
  // for testing
  // if (!file.dirname?.endsWith('2d-gui')) return

  const seen: Record<string, boolean> = {}
  const promises: Promise<void>[] = []

  visit(tree, 'paragraph', (paragraphNode, index) => {
    if (!index) return

    promises.push(
      (async () => {
        // Only process parent nodes
        if (!paragraphNode.children) return

        /**
         * Shortcode `[devtool:BasicAnimations.tsx]` is parsed as:
         * {
         *    type: "paragraph",
         *    children: [
         *      {
         *        type: "text",
         *        value: "[devtool:BasicAnimations.tsx]"
         *      }
         *    ]
         */
        if (paragraphNode.children.length !== 1) return

        const [childNode] = paragraphNode.children

        if (!(childNode.type === 'text' && childNode.value.startsWith('[devtool:'))) return

        if (!childNode.value.endsWith('.tsx]')) {
          throw new Error('Only .tsx files are supported.')
        }

        const moduleName = childNode.value.split(':')[1].replace('.tsx]', '')

        const stringImports: string[] = []
        const stringJsx: string[] = []

        // Insert an import if this component hasn't been seen yet
        // if (!seen[moduleName]) {
        //   stringImports.push(`import ${moduleName} from "./${moduleName}"`)
        //   seen[moduleName] = true
        // }

        // Insert plain preview of the component
        // stringJsx.push(`<${moduleName} />`)

        if (!file.dirname) return

        // Import the SandpackPlayground component
        if (!seen['SandpackPlayground']) {
          stringImports.push(
            `import SandpackPlayground from '@/components/SandpackPlayground/SandpackPlayground'`
          )
          seen['SandpackPlayground'] = true
        }

        const files = getSources({ fileBase: moduleName, dirPath: file.dirname })

        stringJsx.push(`<SandpackPlayground files={${JSON.stringify(sources)}} />`)

        const appendedContentString = [...stringImports, '\n', ...stringJsx].join('\n')

        const appendedContent = getMdxFromMarkdown(appendedContentString)

        // @ts-expect-error
        tree.children.splice(index, 1, ...appendedContent)
      })()
    )
  })
  await Promise.all(promises)

  return tree
}
