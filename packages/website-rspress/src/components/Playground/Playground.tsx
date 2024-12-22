import { useDark } from 'rspress/runtime'
import { Sandpack, SandpackFiles } from '@codesandbox/sandpack-react'
import { dependencies } from './dependencies'
import { defaultFiles } from './defaultFiles'

type PlaygroundProps = {
  files: string | SandpackFiles
}

export default function Playground(props: PlaygroundProps) {
  const isDarkTheme = useDark()
  const filesProp = typeof props.files === 'string' ? JSON.parse(props.files) : props.files

  return (
    <Sandpack
      template="react-ts"
      customSetup={{
        dependencies,
      }}
      files={{ ...filesProp, ...defaultFiles }}
      options={{
        activeFile: 'App.tsx',
      }}
      theme={isDarkTheme ? 'dark' : 'light'}
    />
  )
}
