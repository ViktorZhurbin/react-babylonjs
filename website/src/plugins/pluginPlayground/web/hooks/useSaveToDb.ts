import { useDebouncedCallback } from '@mantine/hooks'
import { toMerged } from 'es-toolkit'
import { useSearchParams } from 'rspress/runtime'
import { SearchParams } from '../constants'
import { createSnippet, updateSnippet } from '../db/crud'
import { makeId } from '../utils/makeId'
import { useSnippetId } from './location'
import { useFiles } from './useCurrentFiles'

const DEBOUNCE_TIME = 1000

export const useSaveFilesToDb = () => {
  const snippetId = useSnippetId()
  const [, setSearchParams] = useSearchParams()
  const { allFiles, language, activeFile } = useFiles()

  return useDebouncedCallback((fileContent: string) => {
    const newFiles = toMerged(allFiles, {
      [language]: {
        [activeFile]: fileContent,
      },
    })

    if (snippetId) {
      updateSnippet(snippetId, newFiles)
    } else {
      const snippetId = makeId()

      createSnippet(snippetId, newFiles)
      setSearchParams({ [SearchParams.SnippetId]: snippetId })
    }
  }, DEBOUNCE_TIME)
}
