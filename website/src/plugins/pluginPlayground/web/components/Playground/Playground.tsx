import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'
import clsx from 'clsx'
import { PlaygroundProps } from '../../../shared/types'
import { FilesProvider } from '../../context/Files'
import { LayoutProvider } from '../../context/Layout'
import { useIsPlaygroundPage } from '../../hooks/location'
import { CodeMirrorEditor } from '../CodeMirrorEditor/CodeMirrorEditor'
import { ControlPanel } from '../ControlPanel/ControlPanel'
import { MonacoEditor } from '../MonacoEditor/MonacoEditor'
import { Panels } from '../Panels/Panels'
import './global.css'
import styles from './Playground.module.css'

type PlaygroundStringifiedProps = {
  [Key in keyof PlaygroundProps]: string
}

export const Playground = (props: PlaygroundStringifiedProps) => {
  const parsedProps = parseProps(props)
  const isPlaygroundPage = useIsPlaygroundPage()
  const editor = isPlaygroundPage ? <MonacoEditor /> : <CodeMirrorEditor />

  const fullscreenProps = useFullscreen()
  const wrapperSize = useElementSize()
  const smallScreen = wrapperSize.width < 580

  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullHeight]: isPlaygroundPage,
  })

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <LayoutProvider value={{ fullscreenProps, smallScreen }}>
        <FilesProvider initialValue={parsedProps.files}>
          <div className={styles.layout}>
            <ControlPanel />
            <Panels editor={editor} />
          </div>
        </FilesProvider>
      </LayoutProvider>
    </div>
  )
}

/**
 * Parse props, as they come JSON.stringified.
 * Without stringification having code strings (props.files) in MDX tends to break things.
 */
function parseProps(props: PlaygroundStringifiedProps): PlaygroundProps {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      return [key, JSON.parse(value)]
    })
  ) as PlaygroundProps
}
