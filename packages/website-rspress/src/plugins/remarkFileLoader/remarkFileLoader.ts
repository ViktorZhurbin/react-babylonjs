import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { getSources } from './getSources'
import { getMdxFromMarkdown } from './getMdxFromMarkdown'

export const remarkFileLoader = () => async (tree: Root, file: VFile) => {
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

        // Import the Playground component
        if (!seen['Playground']) {
          stringImports.push(`import Playground from '@/components/Playground/Playground'`)
          seen['Playground'] = true
        }

        // Insert an import if this component hasn't been seen yet
        if (!seen[moduleName]) {
          stringImports.push(`import ${moduleName} from "./${moduleName}"`)
          seen[moduleName] = true
        }

        if (!file.dirname) return

        const files = getSources({ fileBase: moduleName, dirPath: file.dirname })

        const devTool = `<Playground files={${JSON.stringify(files)}} />`

        stringJsx.push(devTool)

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
