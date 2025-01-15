import { id } from '@instantdb/react'
import { useDebouncedCallback } from '@mantine/hooks'
import { toMerged } from 'es-toolkit'
import { useSearchParams } from 'rspress/runtime'
import { addFiles, updateFiles } from '../db/crud'
import { usePlaygroundId } from './location'
import { useFiles } from './useCurrentFiles'

const DEBOUNCE_TIME = 1000

export const useSaveFilesToDbCallback = () => {
  const pgId = usePlaygroundId()
  const [, setSearchParams] = useSearchParams()
  const { allFiles, language, activeFile } = useFiles()

  return useDebouncedCallback((fileContent: string) => {
    const newFiles = toMerged(allFiles, {
      [language]: {
        [activeFile]: fileContent,
      },
    })

    if (pgId) {
      updateFiles(pgId, newFiles)
    } else {
      const newPgId = id()

      addFiles(newPgId, newFiles)
      setSearchParams({ pgId: newPgId })
    }
  }, DEBOUNCE_TIME)
}
