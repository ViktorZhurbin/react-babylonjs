import clsx from 'clsx'
// import { OpenInCodeSandboxButton } from '@codesandbox/sandpack-react'
import { View } from '../../constants'
import { ToggleButtonGroup } from '../ToggleButtonGroup/ToggleButtonGroup'
import { FullscreenToggleButton } from '../FullscreenToggleButton/FullscreenToggleButton'
import { useLocalStorageLanguage, useLocalStorageView } from '../../hooks/localStorage'
import { getViewValues, LanguageValues } from './labels'
import { Language } from '../../../shared/constants'
import styles from './ControlPanel.module.css'

type ControlPanelProps = {
  smallScreen: boolean
  fullscreen: boolean
  toggleFullscreen: () => void
  setLanguage: (language: Language) => void
}

export const ControlPanel = (props: ControlPanelProps) => {
  const { smallScreen, fullscreen, toggleFullscreen, setLanguage } = props

  const [view, setView] = useLocalStorageView()
  const [language] = useLocalStorageLanguage()

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
        {/* <OpenInCodeSandboxButton /> */}
      </div>
    </div>
  )
}
