import MDXComponents from '@theme-original/MDXComponents'
import { CodeSandbox } from '@site/src/components/CodeSandbox'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<CodeSandbox>" tag to our CodeSandbox component
  // `CodeSandbox` will receive all props that were passed to `<CodeSandbox>` in MDX
  CodeSandbox,
}
