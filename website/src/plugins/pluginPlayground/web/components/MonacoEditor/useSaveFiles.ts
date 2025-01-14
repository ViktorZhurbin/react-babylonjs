import { id } from '@instantdb/react'
import { useSearchParams } from 'rspress/runtime'
import { useDebouncedCallback } from '@mantine/hooks'
import { FilesEntry } from '../../../shared/types'
import { addFiles } from '../../state/addFiles'
import { updateFiles } from '../../state/updateFiles'
import { useObservableState } from '../../context/hooks/useState'
import { usePlayground } from '../../hooks/location'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useActiveMainFile } from './useActiveCode'
import { use$ } from '@legendapp/state/react'
import { EntryFiles } from '../../../shared/constants'

const DEBOUNCE_TIME = 1000

export const useSaveFileToDb = () => {
  const { pgId } = usePlayground()
  const [, setSearchParams] = useSearchParams()
  const [language] = useLocalStorageLanguage()

  return useDebouncedCallback((code: string) => {
    const entryFile = EntryFiles[language]
    const filesByLanguage = {
      [language]: { [entryFile]: code },
    }

    if (pgId) {
      updateFiles(pgId, filesByLanguage)
    } else {
      const newPgId = id()

      addFiles(newPgId, filesByLanguage)
      setSearchParams({ pgId: newPgId })
    }
  }, DEBOUNCE_TIME)
}
