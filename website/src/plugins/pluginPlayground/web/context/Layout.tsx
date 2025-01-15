import type { useFullscreen } from '@mantine/hooks'
import { createContext, useContext } from 'react'

type State = {
  smallScreen: boolean
  fullscreenProps: ReturnType<typeof useFullscreen>
}

const LayoutContext = createContext<State | undefined>(undefined)

function LayoutProvider(props: { children: React.ReactNode; value: State }) {
  return <LayoutContext.Provider value={props.value}>{props.children}</LayoutContext.Provider>
}

const useLayoutContext = () => {
  const context = useContext(LayoutContext)

  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }

  return context
}

const useFullscreenProps = () => {
  const value = useLayoutContext()

  return value.fullscreenProps
}

const useIsSmallScreen = () => {
  const value = useLayoutContext()

  return value.smallScreen
}

export { LayoutProvider, useFullscreenProps, useLayoutContext, useIsSmallScreen }
