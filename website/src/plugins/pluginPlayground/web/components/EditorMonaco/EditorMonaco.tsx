import Editor from '@monaco-editor/react'
import { useDark } from '@rspress/core/runtime'
import { useActiveCode } from '../../hooks/useActiveCode'
import { useSaveFileToDb } from '../../hooks/useSaveFiles'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { MonacoLanguage, MonacoTheme } from './constants'
import { initMonacoEditor } from './initMonacoEditor'

if (typeof window !== 'undefined') {
  initMonacoEditor()
}

export function EditorMonaco() {
  const theme = useDark() ? MonacoTheme.Dark : MonacoTheme.Light

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
