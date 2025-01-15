import { id } from '@instantdb/react'
import { useDebouncedCallback } from '@mantine/hooks'
import { useSearchParams } from 'rspress/runtime'
import { EntryFiles } from '../../shared/constants'
import { addFiles } from '../db/addFiles'
import { updateFiles } from '../db/updateFiles'
import { useLocalStorageLanguage } from './localStorage'
import { usePlayground } from './location'

const DEBOUNCE_TIME = 1000

export const useSaveFileToDb = () => {
  const { pgId } = usePlayground()
  const [, setSearchParams] = useSearchParams()
  const [language] = useLocalStorageLanguage()

  return useDebouncedCallback((code: string) => {
    const entryFile = EntryFiles[language]
    const filesPerLanguage = {
      [language]: { [entryFile]: code },
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
