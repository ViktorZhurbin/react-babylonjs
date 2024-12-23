import fs from 'node:fs'

import {
  JsxEmit,
  ModuleKind,
  NewLineKind,
  ScriptTarget,
  transpileModule,
  TranspileOptions,
} from 'typescript'

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

export const getSources = ({ filePath }: { filePath: string }) => {
  const ts = fs.readFileSync(filePath, 'utf-8')
  const js = transpileModule(ts, TRANSPILE_OPTIONS).outputText

  return {
    js,
    ts,
  }
}
