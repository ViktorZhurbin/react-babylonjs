import { Language } from '@pluginPlayground/shared/constants'
import { FilesEntry } from '@/src/plugins/pluginPlayground/shared/types'
import { getRollupBundledCode } from './getRollupBundledCode'
import { getBabelTransformedFiles } from './getBabelTransformedFiles'
import { getComponentFnFromCodeString } from './getFnFromFunctionString'

export const compileComponentFromFiles = async (files: FilesEntry, language: Language) => {
  if (!window.Babel) return

  // Rollup requires plugins to handle JSX/TSX,
  // but they don't work in the browser.
  // Using @babel/standalone to transform JSX/TSX into JS
  const babelTransformedFiles = getBabelTransformedFiles({ files, language })

  // Bundle files into a single chunk
  const bundledCode = await getRollupBundledCode({
    language,
    files: babelTransformedFiles,
  })

  return getComponentFnFromCodeString(bundledCode)
}
