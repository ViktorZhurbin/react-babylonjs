import './global.css'
import { PlaygroundProps } from '../../../shared/types'
import { StateProvider } from '../../context/StateProvider'
import { useIsPlaygroundPage } from '../../hooks/location'
import { PlaygroundMain } from '../PlaygroundMain/PlaygroundMain'
import { PlaygroundSmall } from '../PlaygroundSmall/PlaygroundSmall'

type PlaygroundStringifiedProps = {
  [Key in keyof PlaygroundProps]: string
}

export const Playground = (props: PlaygroundStringifiedProps) => {
  const parsedProps = parseProps(props)
  const isPlaygroundPage = useIsPlaygroundPage()
  const PlaygroundComponent = isPlaygroundPage ? PlaygroundMain : PlaygroundSmall

  return (
    <StateProvider shouldSync={isPlaygroundPage} initialState={{ files: parsedProps.files }}>
      <PlaygroundComponent {...parsedProps} />
    </StateProvider>
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
