import './styles.css'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode'
import CodeMirror from '@uiw/react-codemirror'
import { useDark } from 'rspress/runtime'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useActiveCode } from '../MonacoEditor/useActiveCode'

export const CodeMirrorEditor = () => {
  const theme = useDark() ? vscodeDark : vscodeLight

  const activeCode = useActiveCode()

  const [language] = useLocalStorageLanguage()

  return (
    <CodeMirror
      value={activeCode.code}
      onChange={(code) => {
        activeCode.updateCode(code, language)
      }}
      extensions={[javascript({ jsx: true, typescript: true })]}
      theme={theme}
      basicSetup={{
        lineNumbers: false,
        foldGutter: false,
        autocompletion: false,
      }}
    />
  )
}
