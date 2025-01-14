import clsx from 'clsx'
import { useDark } from 'rspress/runtime'
import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'
import { SandpackProvider } from '@codesandbox/sandpack-react'
import { PlaygroundProps } from '@pluginPlayground/shared/types'
import { EntryFiles, Language } from '@pluginPlayground/shared/constants'
import { useFiles } from '../../context/hooks/useState'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { Wrapper } from './Wrapper'
import styles from './PlaygroundSmall.module.css'

export const PlaygroundSmall = (props: PlaygroundProps) => {
  const isDarkTheme = useDark()
  const fullscreenProps = useFullscreen()

  const [language] = useLocalStorageLanguage()
  const allFiles = useFiles()
  const files = allFiles[language]

  const wrapperSize = useElementSize()
  const smallScreen = wrapperSize.width < 580

  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullscreen]: fullscreenProps.fullscreen,
  })

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <SandpackProvider
        files={files}
        // `react(-ts)` is a CRA template
        // seems to launch faster than `vite-react(-ts)`
        template={language === Language.tsx ? 'react-ts' : 'react'}
        theme={isDarkTheme ? 'dark' : 'light'}
        customSetup={{ dependencies: props.dependencies }}
        options={{ activeFile: EntryFiles[language] }}
        className={styles.sandpackProvider}
      >
        <Wrapper
          files={allFiles[language]}
          smallScreen={smallScreen}
          fullscreenProps={fullscreenProps}
        />
      </SandpackProvider>
    </div>
  )
}
