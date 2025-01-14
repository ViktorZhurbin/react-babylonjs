import { EntryFiles } from '../../../shared/constants'
import { useObservableState } from '../../context/hooks/useState'
import { useLocalStorageLanguage } from '../../hooks/localStorage'

export const useActiveMainFile = () => {
  const state$ = useObservableState()
  const [language] = useLocalStorageLanguage()

  const entryFile = EntryFiles[language]
  const activeFile = state$.files[language][entryFile]

  return activeFile
}
