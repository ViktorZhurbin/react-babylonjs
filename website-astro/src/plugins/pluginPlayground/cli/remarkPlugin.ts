import path from 'node:path'
import type { Root } from 'mdast'
import type { MdxJsxFlowElement } from 'mdast-util-mdx'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'
import { _skipForTesting } from './helpers/_skipForTesting'
import { getMdxJsxAttribute } from './helpers/getMdxJsxAttribute'
import type { DemoDataByPath } from './pluginPlayground'
import { getFilesAndImports } from './helpers/getFilesAndImports'
import { getDemoDependencies, getPackageJsonDependencies } from './helpers/getDependencies'
import { allImports } from './virtualModules'

/**
 * Inject <Playground /> into MDX
 */
export const remarkPlugin: Plugin<[{}], Root> = () => {
  console.log('remarkPlugin', { allImports })

  return async (tree, vfile) => {
    if (_skipForTesting(vfile.path)) return

    const packageJsonDependencies = await getPackageJsonDependencies()

    // Transform <code src="./Component.tsx" />
    // into <Playground files={files} dependencies={dependencies} />
    visit(tree, 'mdxJsxFlowElement', (node: MdxJsxFlowElement) => {
      if (node.name !== 'code') return

      const importPath = getMdxJsxAttribute(node, 'src')

      if (typeof importPath !== 'string') {
        return
      }

      const demo = getFilesAndImports({
        importPath,
        dirname: path.dirname(vfile.path),
      })

      Object.assign(allImports, demo.imports)

      const dependencies = getDemoDependencies(Object.keys(demo.imports), packageJsonDependencies)

      console.log({ allImports, demo, dependencies })

      Object.assign(node, {
        type: 'mdxJsxFlowElement',
        name: 'Playground',
        attributes: getMdxJsxAttributes([
          ['files', JSON.stringify(demo.files)],
          ['dependencies', JSON.stringify(dependencies)],
        ]),
      })
    })
  }
}

function getMdxJsxAttributes(attrs: Array<[string, string]>): MdxJsxFlowElement['attributes'] {
  return attrs.map(([name, value]) => ({
    name,
    value,
    type: 'mdxJsxAttribute',
  }))
}
