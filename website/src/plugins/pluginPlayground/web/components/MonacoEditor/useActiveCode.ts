import { EntryFiles } from '../../../shared/constants'
import { useFilesContext } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'

export const useActiveCode = () => {
  const { files, setFiles } = useFilesContext()
  const [language] = useLocalStorageLanguage()

  const entryFile = EntryFiles[language]
  const code = files[language][entryFile]

  return {
    code,
    updateCode: (value: string) => {
      const entryFile = EntryFiles[language]

      setFiles((prev) => {
        const update = {
          [language]: {
            ...prev[language],
            [entryFile]: value,
          },
        }

        return { ...prev, ...update }
      })
    },
  }
}
