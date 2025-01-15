import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'
import clsx from 'clsx'
import type { PlaygroundProps } from '../../../../shared/types'
import { FilesProvider } from '../../../context/Files'
import { LayoutProvider } from '../../../context/Layout'
import { useIsPlaygroundPage } from '../../../hooks/location'
import { ControlPanel } from '../../controlPanel/ControlPanel/ControlPanel'
import { EditorCodeMirror } from '../../editor/EditorCodeMirror/EditorCodeMirror'
import './global.css'
import { EditorMonaco } from '../../editor/EditorMonaco/EditorMonaco'
import { ResizablePanels } from '../ResizablePanels/ResizablePanels'
import styles from './Playground.module.css'

type PlaygroundStringifiedProps = {
  [Key in keyof PlaygroundProps]: string
}

export const Playground = (props: PlaygroundStringifiedProps) => {
  const parsedProps = parseProps(props)
  const isPlaygroundPage = useIsPlaygroundPage()
  const editor = isPlaygroundPage ? <EditorMonaco /> : <EditorCodeMirror />

  const fullscreenProps = useFullscreen()
  const wrapperSize = useElementSize()
  const SMALL_THRESHOLD = isPlaygroundPage ? 600 : 580
  const smallScreen = wrapperSize.width < SMALL_THRESHOLD

  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullHeight]: isPlaygroundPage,
  })

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <LayoutProvider value={{ fullscreenProps, smallScreen }}>
        <FilesProvider initialValue={parsedProps}>
          <div className={styles.layout}>
            <ControlPanel />
            <ResizablePanels editor={editor} />
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
