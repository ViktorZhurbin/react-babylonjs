import * as acorn from 'acorn'
import { mdxJsx } from 'micromark-extension-mdx-jsx'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxJsxFromMarkdown } from 'mdast-util-mdx-jsx'

export const getMdxJsx = (doc: string) => {
  const tree = fromMarkdown(doc, {
    extensions: [mdxJsx({ acorn, addResult: true })],
    mdastExtensions: [mdxJsxFromMarkdown()],
  })

  return tree.children
}
