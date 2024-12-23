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

export const getSourceJs = (source: string) => {
  return transpileModule(source, TRANSPILE_OPTIONS).outputText
}
