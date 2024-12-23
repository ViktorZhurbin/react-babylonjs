import { useDark } from 'rspress/runtime'
import {
  SandpackCodeEditor,
  SandpackFiles,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react'
import { dependencies } from './dependencies'
import { defaultFiles } from './defaultFiles'

type SandpackPlaygroundProps = {
  files: string | SandpackFiles
}

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex' },
  editor: { height: '400px' },
  preview: { height: '400px' },
}

export default function SandpackPlayground(props: SandpackPlaygroundProps) {
  const isDarkTheme = useDark()
  const filesProp = typeof props.files === 'string' ? JSON.parse(props.files) : props.files

  return (
    <SandpackProvider
      template="react-ts"
      files={{ ...filesProp, ...defaultFiles }}
      theme={isDarkTheme ? 'dark' : 'light'}
      customSetup={{
        dependencies,
      }}
      options={{
        activeFile: 'App.tsx',
      }}
    >
      <div style={styles.container}>
        <SandpackCodeEditor wrapContent style={styles.editor} />
        <SandpackPreview style={styles.preview} />
      </div>
    </SandpackProvider>
  )
}
