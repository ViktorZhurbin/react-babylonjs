import * as acorn from 'acorn'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxjsEsm } from 'micromark-extension-mdxjs-esm'
import { mdxjsEsmFromMarkdown } from 'mdast-util-mdxjs-esm'

export const getMdxJsEsm = (doc: string) => {
  const tree = fromMarkdown(doc, {
    extensions: [mdxjsEsm({ acorn, addResult: true })],
    mdastExtensions: [mdxjsEsmFromMarkdown()],
  })

  return tree.children
}
