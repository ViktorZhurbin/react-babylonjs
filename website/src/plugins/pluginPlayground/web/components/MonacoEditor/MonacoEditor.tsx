import { useDark } from '@rspress/core/runtime'
import Editor from '@monaco-editor/react'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { EditorTheme } from './theme'
import { MonacoLanguage } from './constants'
import { useActiveMainFile } from './useActiveCode'
import { initMonacoEditor } from './initMonacoEditor'
import { useSaveFileToDb } from './useSaveFiles'

if (typeof window !== 'undefined') {
  initMonacoEditor()
}

export function MonacoEditor() {
  const isDark = useDark()
  const theme = isDark ? EditorTheme.Dark : EditorTheme.Light

  const [language] = useLocalStorageLanguage()
  const activeFile = useActiveMainFile()
  const saveFile = useSaveFileToDb()

  return (
    <Editor
      theme={theme}
      path="App.tsx"
      defaultLanguage="typescript"
      value={activeFile.get()}
      onChange={(code = '') => {
        activeFile.set(code)
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
