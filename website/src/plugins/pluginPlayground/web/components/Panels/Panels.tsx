import clsx from 'clsx'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { SandpackCodeEditor, SandpackStack } from '@codesandbox/sandpack-react'
import { Preview } from '../Preview/Preview'
import { View } from '../../constants'
import { useLocalStorageView } from '../../hooks/localStorage'
import styles from './Panels.module.css'
import { MonacoEditor } from '../MonacoEditor/MonacoEditor'

type PanelsProps = {
  standalone?: boolean
  fullHeight: boolean
  isVertical: boolean
}

export const Panels = ({ standalone, fullHeight, isVertical }: PanelsProps) => {
  const [view] = useLocalStorageView()

  const wrapperClass = clsx(styles.wrapper, {
    [styles.vertical]: isVertical,
    [styles.fullHeight]: fullHeight,
    [styles.singlePanel]: view !== View.Split,
  })

  const getHiddenClass = (isHidden: boolean) => clsx({ [styles.hiddenPanel]: isHidden })

  return (
    <div className={wrapperClass}>
      <PanelGroup
        style={{ flexDirection: isVertical ? 'column-reverse' : 'row' }}
        direction={isVertical ? 'vertical' : 'horizontal'}
        autoSaveId="react-babylonjs-playground"
      >
        <Panel
          id="editor"
          defaultSize={50}
          order={isVertical ? 1 : 0}
          className={getHiddenClass(view === View.Preview)}
        >
          {standalone ? (
            <SandpackStack className={styles.sandpackStack}>
              <MonacoEditor />
            </SandpackStack>
          ) : (
            // Monaco wouldn't handle multiple files yet, and is heavier overall. Using CodeMirror for demos for now
            <SandpackCodeEditor showRunButton={false} className={styles.sandpackStack} />
          )}
        </Panel>

        {view === View.Split && <PanelResizeHandle className={styles.resizeHandle} />}

        <Panel
          id="preview"
          defaultSize={50}
          order={isVertical ? 0 : 1}
          className={getHiddenClass(view === View.Code)}
        >
          <SandpackStack className={styles.sandpackStack}>
            <Preview />
          </SandpackStack>
        </Panel>
      </PanelGroup>
    </div>
  )
}
