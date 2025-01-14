import clsx from 'clsx'
// import { OpenInCodeSandboxButton } from '@codesandbox/sandpack-react'
import { Language } from '../../../shared/constants'
import { View } from '../../constants'
import { useIsSmallScreen } from '../../context/Layout'
import { useLocalStorageLanguage, useLocalStorageView } from '../../hooks/localStorage'
import { FullscreenToggleButton } from '../FullscreenToggleButton/FullscreenToggleButton'
import { ToggleButtonGroup } from '../ToggleButtonGroup/ToggleButtonGroup'
import styles from './ControlPanel.module.css'
import { getViewValues, LanguageValues } from './labels'

type ControlPanelProps = {
  setLanguage: (language: Language) => void
}

export const ControlPanel = (props: ControlPanelProps) => {
  const { setLanguage } = props

  const [view, setView] = useLocalStorageView()
  const [language] = useLocalStorageLanguage()
  const smallScreen = useIsSmallScreen()

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
