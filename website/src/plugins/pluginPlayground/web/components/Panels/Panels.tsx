import clsx from 'clsx'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Preview } from '../Preview/Preview'
import { View } from '../../constants'
import { FilesEntry } from '../../../shared/types'
import { useIsSmallScreen } from '../../context/Layout'
import { useLocalStorageView } from '../../hooks/localStorage'
import styles from './Panels.module.css'

type PanelsProps = {
  files: FilesEntry
  editor: React.ReactElement
}

export const Panels = ({ editor, files }: PanelsProps) => {
  const [view] = useLocalStorageView()
  const isVertical = useIsSmallScreen()

  const wrapperClass = clsx(styles.wrapper, {
    [styles.vertical]: isVertical,
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
          {editor}
        </Panel>

        {view === View.Split && <PanelResizeHandle className={styles.resizeHandle} />}

        <Panel
          id="preview"
          defaultSize={50}
          order={isVertical ? 0 : 1}
          className={getHiddenClass(view === View.Code)}
        >
          <Preview files={files} />
        </Panel>
      </PanelGroup>
    </div>
  )
}
