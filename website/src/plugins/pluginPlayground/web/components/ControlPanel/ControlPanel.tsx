import clsx from 'clsx'
import { View } from '../../constants'
import { useIsSmallScreen } from '../../context/Layout'
import { useLocalStorageLanguage, useLocalStorageView } from '../../hooks/localStorage'
import { FullscreenToggleButton } from '../FullscreenToggleButton/FullscreenToggleButton'
import { ToggleButtonGroup } from '../ToggleButtonGroup/ToggleButtonGroup'
import styles from './ControlPanel.module.css'
import { getViewValues, LanguageValues } from './labels'

export const ControlPanel = () => {
  const smallScreen = useIsSmallScreen()

  const [view, setView] = useLocalStorageView()
  const [language, setLanguage] = useLocalStorageLanguage()

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
        <FullscreenToggleButton smallScreen={smallScreen} />
        {/* <OpenInCodeSandboxButton /> */}
      </div>
    </div>
  )
}
