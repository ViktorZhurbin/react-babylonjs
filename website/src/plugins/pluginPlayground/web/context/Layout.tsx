import { createContext, useContext } from 'react'
import { useFullscreen } from '@mantine/hooks'

type State = {
  smallScreen: boolean
  fullscreenProps: ReturnType<typeof useFullscreen>
}

const LayoutContext = createContext<State>(undefined as any)

function LayoutProvider(props: { children: React.ReactNode; value: State }) {
  return <LayoutContext.Provider value={props.value}>{props.children}</LayoutContext.Provider>
}

const useLayoutContext = () => useContext(LayoutContext)

const useFullscreenProps = () => {
  const value = useLayoutContext()

  return value.fullscreenProps
}

const useIsSmallScreen = () => {
  const value = useLayoutContext()

  return value.smallScreen
}

export { LayoutProvider, useFullscreenProps, useLayoutContext, useIsSmallScreen }
