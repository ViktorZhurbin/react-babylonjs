import { PlaygroundProps } from '../../../shared/types'
import { StateProvider } from '../../context/StateProvider'
import { Playground } from './Playground'

type PlaygroundStringifiedProps = {
  [Key in keyof PlaygroundProps]: string
}

const WrappedPlayground = (props: PlaygroundStringifiedProps) => {
  const parsedProps = parseProps(props)

  return (
    <StateProvider shouldSync={parsedProps.standalone} initialState={{ files: parsedProps.files }}>
      <Playground {...parsedProps} />
    </StateProvider>
  )
}

/**
 * Parse props, as they come JSON.stringified.
 * Without stringification passing object types as props in MDX tend to break things.
 */
function parseProps(props: PlaygroundStringifiedProps): PlaygroundProps {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      return [key, JSON.parse(value)]
    })
  ) as PlaygroundProps
}

export default WrappedPlayground
