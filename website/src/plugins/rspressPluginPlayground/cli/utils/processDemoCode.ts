import path from 'node:path'
import { getSourcesAndFiles } from './getSourcesAndFiles'
import { getPathWithExt, localImportRegex } from './getImport'
import { getAstBody } from './babel'

export const processDemoCode = async (params: { importPath: string; dirname: string }) => {
  const { importPath, dirname } = params

  const filePath = getPathWithExt(importPath)
  const resolvedPath = path.join(dirname, filePath)

  const { sources, files } = await getSourcesAndFiles({ resolvedPath, importPath })

  const importPaths: Record<string, string> = {}
  const localImportSources: Record<string, string> = {}

  const astBody = getAstBody(sources.tsx)
  for (const statement of astBody) {
    if (statement.type !== 'ImportDeclaration') continue

    const importPath = statement.source.value

    if (localImportRegex.test(importPath)) {
      const nested = await processDemoCode({ importPath, dirname })

      localImportSources[importPath] = nested.sources.tsx
    } else {
      importPaths[importPath] = importPath
    }
  }

  return {
    files,
    sources,
    importPaths,
    localImportSources,
  }
}
