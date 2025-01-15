import { View } from '../../../constants'
import { useIsSmallScreen } from '../../../context/Layout'
import { useLocalStorageLanguage, useLocalStorageView } from '../../../hooks/localStorage'
import { ToggleButtonGroup } from '../../components/ToggleButtonGroup/ToggleButtonGroup'
import { FullscreenToggleButton } from '../FullscreenToggleButton/FullscreenToggleButton'
import { CopyButton } from '../ShareButton/CopyButton'
import { StartOverButton } from '../StartOverButton/StartOverButton'
import styles from './ControlPanel.module.css'
import { LanguageValues, getViewValues } from './labels'

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

      <div className={styles.section}>
        {view !== View.Preview && (
          <ToggleButtonGroup
            values={LanguageValues}
            activeValue={language}
            setValue={setLanguage}
          />
        )}
      </div>

      <div className={styles.section}>
        <StartOverButton />
        <CopyButton />
        <FullscreenToggleButton smallScreen={smallScreen} />
      </div>
    </div>
  )
}
