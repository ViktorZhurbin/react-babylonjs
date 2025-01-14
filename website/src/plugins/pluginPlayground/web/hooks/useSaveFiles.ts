import { id } from '@instantdb/react'
import { useSearchParams } from 'rspress/runtime'
import { useDebouncedCallback } from '@mantine/hooks'
import { FilesEntry } from '../../shared/types'
import { addFiles } from '../state/addFiles'
import { updateFiles } from '../state/updateFiles'
import { useLocalStorageLanguage } from './localStorage'
import { usePlayground } from './location'
import { useFilesContext } from '../context/Files'

const DEBOUNCE_TIME = 1000

export const useSaveFiles = () => {
  const state$ = useFilesContext()
  const { isPlayground, pgId } = usePlayground()
  const [, setSearchParams] = useSearchParams()
  const [language] = useLocalStorageLanguage()

  return useDebouncedCallback((files: FilesEntry) => {
    if (!isPlayground) return

    const allFiles = { ...state$.files.get(), [language]: files }

    if (pgId) {
      updateFiles(pgId, allFiles)
    } else {
      const newPgId = id()

      addFiles(newPgId, allFiles)
      setSearchParams({ pgId: newPgId })
    }
  }, DEBOUNCE_TIME)
}
