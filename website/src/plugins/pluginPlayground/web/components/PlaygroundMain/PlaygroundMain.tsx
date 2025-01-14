import clsx from 'clsx'
import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'
import { PlaygroundProps } from '@pluginPlayground/shared/types'
import { Panels } from '../Panels/Panels'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { MonacoEditor } from '../MonacoEditor/MonacoEditor'
import styles from './Playground.module.css'
import { useFiles } from '../../context/hooks/useState'

export const PlaygroundMain = (props: PlaygroundProps) => {
  const fullscreenProps = useFullscreen()
  const wrapperSize = useElementSize()
  const smallScreen = wrapperSize.width < 580
  const [language, setLanguage] = useLocalStorageLanguage()

  const files = useFiles()
  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullscreen]: fullscreenProps.fullscreen,
    [styles.fullHeight]: props.standalone,
  })

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <div className={styles.layout}>
        <ControlPanel
          setLanguage={setLanguage}
          smallScreen={smallScreen}
          fullscreen={fullscreenProps.fullscreen}
          toggleFullscreen={fullscreenProps.toggle}
        />

        <Panels
          fullHeight
          files={files[language]}
          isVertical={smallScreen}
          editor={<MonacoEditor />}
        />
      </div>
    </div>
  )
}
