// these packages are avail from rspress
import { mdxFromMarkdown } from 'mdast-util-mdx'
import { mdxjs } from 'micromark-extension-mdxjs'
import { fromMarkdown } from 'mdast-util-from-markdown'

export const getMdxFromMarkdown = (doc: string) =>
  fromMarkdown(doc, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  })