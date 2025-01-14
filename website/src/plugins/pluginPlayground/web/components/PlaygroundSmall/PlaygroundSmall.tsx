import { SandpackProvider } from '@codesandbox/sandpack-react'
import { EntryFiles, Language } from '@pluginPlayground/shared/constants'
import { useDark } from 'rspress/runtime'
import { useFiles } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import styles from './PlaygroundSmall.module.css'
import { Wrapper } from './Wrapper'

export const PlaygroundSmall = () => {
  const isDarkTheme = useDark()
  const [language] = useLocalStorageLanguage()

  const allFiles = useFiles()
  const files = allFiles[language]

  return (
    <SandpackProvider
      files={files}
      template={language === Language.tsx ? 'react-ts' : 'react'}
      theme={isDarkTheme ? 'dark' : 'light'}
      options={{ activeFile: EntryFiles[language] }}
      className={styles.sandpackProvider}
    >
      <Wrapper files={allFiles[language]} />
    </SandpackProvider>
  )
}
