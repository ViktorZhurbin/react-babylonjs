import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFiles,
} from '@codesandbox/sandpack-react'
import { HTMLAttributes, ReactNode } from 'react'
import { useDark } from 'rspress/runtime'
import { MyRunner } from './Runner'

type Direction = 'horizontal' | 'vertical'

export interface PlaygroundProps extends HTMLAttributes<HTMLDivElement> {
  code: string
  language: string
  direction?: Direction
  editorPosition?: 'left' | 'right'
  renderChildren?: (props: PlaygroundProps, code: string, direction: Direction) => ReactNode
}

const SandpressPlayground = (props: PlaygroundProps) => {
  const isDarkTheme = useDark()
  const theme = isDarkTheme ? 'dark' : 'light'

  return (
    <SandpackProvider template="react-ts" files={{ '/App.tsx': props.code }} theme={theme}>
      <SandpackLayout>
        <SandpackCodeEditor
          showTabs
          showLineNumbers={false}
          showInlineErrors
          wrapContent
          closableTabs
        />
        <MyRunner />
      </SandpackLayout>
    </SandpackProvider>
  )
}

export default SandpressPlayground
