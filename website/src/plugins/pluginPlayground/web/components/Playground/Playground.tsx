import './global.css'
import clsx from 'clsx'
import { useDark } from 'rspress/runtime'
import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'
import { SandpackProvider } from '@codesandbox/sandpack-react'
import { PlaygroundProps } from '@pluginPlayground/shared/types'
import { EntryFiles, Language } from '@pluginPlayground/shared/constants'
import { useFiles } from '../../context/hooks/useState'
import { Panels } from '../Panels/Panels'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import styles from './Playground.module.css'

export const Playground = (props: PlaygroundProps) => {
  const isDarkTheme = useDark()
  const fullscreenProps = useFullscreen()

  const files = useFiles()
  const [language] = useLocalStorageLanguage()

  const wrapperSize = useElementSize()
  const smallScreen = wrapperSize.width < 580

  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullscreen]: fullscreenProps.fullscreen,
    [styles.fullHeight]: props.standalone,
  })

  const fullHeightPanels = Boolean(fullscreenProps.fullscreen || props.standalone)

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <SandpackProvider
        files={files[language]}
        // `react(-ts)` is a CRA template
        // seems to launch faster than `vite-react(-ts)`
        template={language === Language.tsx ? 'react-ts' : 'react'}
        theme={isDarkTheme ? 'dark' : 'light'}
        customSetup={{ dependencies: props.dependencies }}
        options={{ activeFile: EntryFiles[language] }}
        className={styles.sandpackProvider}
      >
        <div className={styles.layout}>
          <ControlPanel
            smallScreen={smallScreen}
            fullscreen={fullscreenProps.fullscreen}
            toggleFullscreen={fullscreenProps.toggle}
          />

          <Panels
            isVertical={smallScreen}
            fullHeight={fullHeightPanels}
            standalone={props.standalone}
          />
        </div>
      </SandpackProvider>
    </div>
  )
}
