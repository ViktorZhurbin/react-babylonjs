import './global.css'
import clsx from 'clsx'
import { useElementSize, useFullscreen, useMergedRef } from '@mantine/hooks'

import { PlaygroundProps } from '../../../shared/types'
import { FilesProvider } from '../../context/Files'
import { useIsPlaygroundPage } from '../../hooks/location'
import { PlaygroundMain } from '../PlaygroundMain/PlaygroundMain'
import { PlaygroundSmall } from '../PlaygroundSmall/PlaygroundSmall'
import styles from './Playground.module.css'
import { LayoutProvider } from '../../context/Layout'

type PlaygroundStringifiedProps = {
  [Key in keyof PlaygroundProps]: string
}

export const Playground = (props: PlaygroundStringifiedProps) => {
  const parsedProps = parseProps(props)
  const isPlaygroundPage = useIsPlaygroundPage()
  const PlaygroundComponent = isPlaygroundPage ? PlaygroundMain : PlaygroundSmall

  const fullscreenProps = useFullscreen()
  const wrapperSize = useElementSize()
  const smallScreen = wrapperSize.width < 580

  const wrapperRef = useMergedRef(fullscreenProps.ref, wrapperSize.ref)

  const wrapperClass = clsx(styles.wrapper, {
    [styles.fullHeight]: props.standalone,
  })

  return (
    <div className={wrapperClass} ref={wrapperRef}>
      <LayoutProvider value={{ fullscreenProps, smallScreen }}>
        <FilesProvider initialState={{ files: parsedProps.files }}>
          <PlaygroundComponent />
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
