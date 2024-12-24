import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import type { VFile } from 'vfile'
import { getCodeSources } from './getCodeSources'
import { getMdxFromMarkdown } from './getMdxFromMarkdown'

export const remarkPluginPlayground = () => async (tree: Root, file: VFile) => {
  const dirPath = file.dirname
  // for testing
  // if (!file.dirname?.endsWith('2d-gui')) return

  if (!dirPath) return

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

        if (childNode.type !== 'text') return

        const [devtoolCode, fileName] = childNode.value.split(':')

        if (devtoolCode !== '[devtool') return

        if (!fileName.endsWith('.tsx]')) {
          throw new Error('Only .tsx files are supported.')
        }

        const fileNameWithExt = fileName.replace(']', '')
        const [moduleName] = fileNameWithExt.split('.')

        const stringImports: string[] = []

        // Insert an import if this component hasn't been seen yet
        if (!seen[moduleName]) {
          stringImports.push(`import ${moduleName} from "./${moduleName}"`)
          seen[moduleName] = true
        }

        // Import the SandpackPlayground component
        if (!seen['SandpackPlayground']) {
          stringImports.push(
            `import SandpackPlayground from '@/components/SandpackPlayground/SandpackPlayground'`
          )
          seen['SandpackPlayground'] = true
        }

        if (!seen['Tabs']) {
          stringImports.push(`import { Tabs, Tab } from 'rspress/theme'`)
          seen['Tabs'] = true
        }

        const codeSources = getCodeSources({ fileBase: moduleName, dirPath })

        const tabsJsx = `
          <Tabs groupId="previews">
            <Tab value="preview" label="Preview">
              <${moduleName} />
            </Tab>
            <Tab value="code-tsx" label="Typescript">\n${codeSources.tsx}\n</Tab>
            <Tab value="code-jsx" label="Javascript">\n${codeSources.jsx}\n</Tab>
            <Tab value="playground" label="Playground">
              <SandpackPlayground files={${JSON.stringify(codeSources.files)}} />
            </Tab>

          </Tabs>
        `

        // stringJsx.push(`<SandpackPlayground files={${JSON.stringify(sources)}} />`)

        const appendedContentString = [...stringImports, '\n', tabsJsx].join('\n')

        const appendedContent = getMdxFromMarkdown(appendedContentString)

        // @ts-expect-error
        tree.children.splice(index, 1, ...appendedContent)
      })()
    )
  })
  await Promise.all(promises)

  return tree
}
