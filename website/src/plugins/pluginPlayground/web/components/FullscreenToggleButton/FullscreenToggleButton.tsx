import { IconMaximize, IconMinimize } from '@tabler/icons-react'
import { useFullscreenProps } from '../../context/Layout'
import { Button } from '../Button/Button'

type FullscreenToggleButtonProps = {
  smallScreen: boolean
}

export const FullscreenToggleButton = ({ smallScreen }: FullscreenToggleButtonProps) => {
  const fullscreenProps = useFullscreenProps()

  const Icon = fullscreenProps.fullscreen ? IconMinimize : IconMaximize
  const text = fullscreenProps.fullscreen ? 'Exit fullscreen' : 'Fullscreen'

  return (
    <Button title="Fullscreen toggle" onClick={fullscreenProps.toggle}>
      <Icon /> {smallScreen ? null : <span>{text}</span>}
    </Button>
  )
}
