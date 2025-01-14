import { useFullscreen } from '@mantine/hooks'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { CodeMirrorEditor } from '../CodeMirrorEditor/CodeMirrorEditor'
import { FilesEntry } from '../../../shared/types'
import { Panels } from '../Panels/Panels'
import { useSetLanguage } from './useSetLanguage'
import styles from './Wrapper.module.css'

type WrapperProps = {
  smallScreen: boolean
  files: FilesEntry
  fullscreenProps: ReturnType<typeof useFullscreen>
}

export const Wrapper = (props: WrapperProps) => {
  const { smallScreen, fullscreenProps } = props

  const setLanguage = useSetLanguage()

  return (
    <div className={styles.layout}>
      <ControlPanel
        setLanguage={setLanguage}
        smallScreen={smallScreen}
        fullscreen={fullscreenProps.fullscreen}
        toggleFullscreen={fullscreenProps.toggle}
      />

      <Panels
        files={props.files}
        isVertical={smallScreen}
        fullHeight={fullscreenProps.fullscreen}
        editor={<CodeMirrorEditor className={styles.editor} />}
      />
    </div>
  )
}
