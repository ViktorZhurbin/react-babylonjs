import { EntryFiles, Language } from '../../../shared/constants'
import { useFilesContext } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'

export const useActiveCode = () => {
  const { files, setFiles } = useFilesContext()
  const [language] = useLocalStorageLanguage()

  const entryFile = EntryFiles[language]
  const code = files[language][entryFile]

  return {
    code,
    updateCode: (value: string, language: Language) => {
      console.log('updateCode')
      const entryFile = EntryFiles[language]

      console.log({ isSame: value === code, language, entryFile, value })

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
