import { useCallback } from 'react'
import { FilesEntry } from '../../shared/types'
import { useFilesContext } from '../context/Files'
import { useLocalStorageLanguage } from './localStorage'

export const useCurrentFiles = () => {
  const { files, setFiles } = useFilesContext()
  const [language] = useLocalStorageLanguage()

  const currentFiles = files[language]

  const updateCurrentFiles = useCallback(
    (updatedFiles: FilesEntry) =>
      setFiles((prevFiles) => {
        const update = {
          [language]: {
            ...prevFiles[language],
            ...updatedFiles,
          },
        }

        return { ...prevFiles, ...update }
      }),
    [language, setFiles]
  )

  return { currentFiles, updateCurrentFiles }
}
