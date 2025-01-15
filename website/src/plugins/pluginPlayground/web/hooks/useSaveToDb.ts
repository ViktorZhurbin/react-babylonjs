import { useDebouncedCallback } from '@mantine/hooks'
import { toMerged } from 'es-toolkit'
import { useSearchParams } from 'rspress/runtime'
import { createSnippet, updateSnippet } from '../db/crud'
import { useSnippetId } from './location'
import { useFiles } from './useCurrentFiles'
import { makeId } from '../utils/makeId'
import { SearchParams } from '../constants'

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
