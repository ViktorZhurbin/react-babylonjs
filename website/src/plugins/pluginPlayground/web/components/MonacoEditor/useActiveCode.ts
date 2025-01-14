import { EntryFiles } from '../../../shared/constants'
import { useFilesContext } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'

export const useActiveMainFile = () => {
  const state$ = useFilesContext()
  const [language] = useLocalStorageLanguage()

  const entryFile = EntryFiles[language]
  const activeFile = state$.files[language][entryFile]

  return activeFile
}
