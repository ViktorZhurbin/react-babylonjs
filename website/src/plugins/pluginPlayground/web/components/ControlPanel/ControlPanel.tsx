import clsx from 'clsx'
import { OpenInCodeSandboxButton } from '@codesandbox/sandpack-react'
import { View } from '../../constants'
import { useSetLanguage } from './useSetLanguage'
import { ToggleButtonGroup } from '../ToggleButtonGroup/ToggleButtonGroup'
import { FullscreenToggleButton } from '../FullscreenToggleButton/FullscreenToggleButton'
import { useLocalStorageLanguage, useLocalStorageView } from '../../hooks/localStorage'
import { getViewValues, LanguageValues } from './labels'
import styles from './ControlPanel.module.css'

type ControlPanelProps = {
  smallScreen: boolean
  fullscreen: boolean
  toggleFullscreen: () => void
}

export const ControlPanel = (props: ControlPanelProps) => {
  const { smallScreen, fullscreen, toggleFullscreen } = props

  const [view, setView] = useLocalStorageView()
  const [language] = useLocalStorageLanguage()
  const setLanguage = useSetLanguage()

  return (
    <div className={styles.wrapper}>
      <ToggleButtonGroup
        values={getViewValues(smallScreen)}
        activeValue={view}
        setValue={setView}
      />

      {view !== View.Preview && (
        <ToggleButtonGroup values={LanguageValues} activeValue={language} setValue={setLanguage} />
      )}

      <div className={clsx(styles.section, { [styles.smallScreen]: smallScreen })}>
        <FullscreenToggleButton
          smallScreen={smallScreen}
          fullscreen={fullscreen}
          onClick={toggleFullscreen}
        />
        <OpenInCodeSandboxButton />
      </div>
    </div>
  )
}
