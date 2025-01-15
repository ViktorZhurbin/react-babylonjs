import { id } from '@instantdb/react'
import { useDebouncedCallback } from '@mantine/hooks'
import { useSearchParams } from 'rspress/runtime'
import { addFiles } from '../db/addFiles'
import { updateFiles } from '../db/updateFiles'
import { useLocalStorageLanguage } from './localStorage'
import { usePlayground } from './location'
import { useCurrentFiles } from './useCurrentFiles'

const DEBOUNCE_TIME = 1000

export const useSaveFileToDb = () => {
  const { pgId } = usePlayground()
  const [, setSearchParams] = useSearchParams()
  const [language] = useLocalStorageLanguage()
  const { activeFile } = useCurrentFiles()

  return useDebouncedCallback((code: string) => {
    const filesPerLanguage = {
      [language]: { [activeFile]: code },
    }

    if (pgId) {
      updateFiles(pgId, filesPerLanguage)
    } else {
      const newPgId = id()

      addFiles(newPgId, filesPerLanguage)
      setSearchParams({ pgId: newPgId })
    }
  }, DEBOUNCE_TIME)
}
