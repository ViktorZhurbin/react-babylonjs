import { useDark } from '@rspress/core/runtime'
import Editor from '@monaco-editor/react'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { EditorTheme } from './theme'
import { MonacoLanguage } from './constants'
import { useActiveCode } from './useActiveCode'
import { initMonacoEditor } from './initMonacoEditor'
import { useSaveFileToDb } from './useSaveFiles'

if (typeof window !== 'undefined') {
  initMonacoEditor()
}

export function MonacoEditor() {
  const theme = useDark() ? EditorTheme.Dark : EditorTheme.Light

  const [language] = useLocalStorageLanguage()
  const { code, updateCode } = useActiveCode()

  const saveFile = useSaveFileToDb()

  return (
    <Editor
      theme={theme}
      path="App.tsx"
      defaultLanguage="typescript"
      value={code}
      onChange={(code = '') => {
        updateCode(code)
        saveFile(code)
      }}
      language={MonacoLanguage[language]}
      options={{
        fontSize: 14,
        lineNumbers: 'off',
        minimap: { enabled: false },
        quickSuggestions: true,
        scrollBeyondLastLine: false,
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  )
}
