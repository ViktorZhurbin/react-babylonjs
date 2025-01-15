import { id } from '@instantdb/react'
import { useSearchParams } from 'rspress/runtime'
import { useDebouncedCallback } from '@mantine/hooks'
import { addFiles } from '../../db/addFiles'
import { updateFiles } from '../../db/updateFiles'
import { usePlayground } from '../../hooks/location'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { EntryFiles } from '../../../shared/constants'

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
