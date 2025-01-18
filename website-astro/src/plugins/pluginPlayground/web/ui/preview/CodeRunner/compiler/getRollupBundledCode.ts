import { type Plugin, rollup } from '@rollup/browser'
import { Language, ENTRY_FILE_BASE } from '../../../../../shared/constants'
import { isRelativeImport, prepareFileNameWithExt } from '../../../../../shared/pathHelpers'
import type { FilesEntry } from '../../../../../shared/types'

type GetBundledCode = {
  files: FilesEntry
  language: Language
}

export const getRollupBundledCode = async ({ files, language }: GetBundledCode) => {
  const entryFilename = Object.keys(files).find((name) => name.includes(ENTRY_FILE_BASE))

  const bundle = await rollup({
    input: entryFilename,
    plugins: [loaderPlugin(files, language)],
    external: (source) => {
      const isLocal = isRelativeImport(source) || files[source]

      return !isLocal
    },
  })

  const { output } = await bundle.generate({
    compact: false,
    strict: false,
    exports: 'named',
    format: 'commonjs',
    generatedCode: 'es2015',
    plugins: [],
  })

  const bundledCode = output[0].code

  return bundledCode
}

// Based off of https://rollupjs.org/faqs/#how-do-i-run-rollup-itself-in-a-browser
// Resolve and load modules to be bundled
function loaderPlugin(files: FilesEntry, language: Language): Plugin {
  return {
    name: 'in-memory-loader',
    resolveId(source) {
      if (Object.hasOwn(files, source)) {
        return source
      }

      // resolve file name from the relative import
      if (isRelativeImport(source)) {
        const fileName = prepareFileNameWithExt(source, language)

        if (Object.hasOwn(files, fileName)) {
          return fileName
        }
      }

      return null
    },
    load(fileName) {
      // use fileName resolved above to load its code for bundling
      if (Object.hasOwn(files, fileName)) {
        return files[fileName]
      }
    },
  }
}
