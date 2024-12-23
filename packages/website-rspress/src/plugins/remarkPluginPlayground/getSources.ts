import fs from 'node:fs'
import { JsxEmit, ModuleKind, NewLineKind, ScriptTarget, TranspileOptions } from 'typescript'
import { getFileSourcesWithRelativeImports } from './getFileSourcesWithRelativeImports'
import { transformAssetPaths } from './transformAssetPaths'

const TRANSPILE_OPTIONS: TranspileOptions = {
  reportDiagnostics: false,
  compilerOptions: {
    jsx: JsxEmit.Preserve,
    module: ModuleKind.ESNext,
    target: ScriptTarget.ESNext,
    newLine: NewLineKind.CarriageReturnLineFeed,
    // removeComments: false,
  },
}

export const getSources = ({ fileBase, dirPath }: { fileBase: string; dirPath: string }) => {
  const sourceFilePath = `${dirPath}/${fileBase}.tsx`

  let appFileString

  try {
    const appFileStringBase = fs.readFileSync(sourceFilePath, 'utf-8')
    appFileString = transformAssetPaths(appFileStringBase)
  } catch (err) {
    throw new Error(
      `Could not find file at ${sourceFilePath}. Make sure you have a file named ${fileBase}.tsx`
    )
  }

  const sources = getFileSourcesWithRelativeImports(appFileString, dirPath)

  return sources
}
