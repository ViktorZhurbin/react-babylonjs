import { IconMaximize, IconMinimize } from '@tabler/icons-react'
import { RoundedButton } from '@codesandbox/sandpack-react'
import { useFullscreenProps } from '../../context/Layout'

type FullscreenToggleButtonProps = {
  smallScreen: boolean
}

export const FullscreenToggleButton = ({ smallScreen }: FullscreenToggleButtonProps) => {
  const fullscreenProps = useFullscreenProps()

  const Icon = fullscreenProps.fullscreen ? IconMinimize : IconMaximize
  const text = fullscreenProps.fullscreen ? 'Exit fullscreen' : 'Fullscreen'

  return (
    <RoundedButton title="Fullscreen toggle" onClick={fullscreenProps.toggle}>
      <Icon /> {smallScreen ? null : <span>{text}</span>}
    </RoundedButton>
  )
}
