import { EntryFiles } from '../../../shared/constants'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useCurrentFiles } from '../../hooks/useCurrentFiles'

export const useActiveCode = () => {
  const [language] = useLocalStorageLanguage()
  const { currentFiles, updateCurrentFiles } = useCurrentFiles()

  const entryFile = EntryFiles[language]
  const code = currentFiles[entryFile]

  return {
    code,
    updateCode: (value: string) => {
      const entryFile = EntryFiles[language]

      updateCurrentFiles({
        [entryFile]: value,
      })
    },
  }
}
