import { useEffect } from 'react'
import type { PlaygroundProps } from '../../shared/types'
import { useFilesContext } from '../context/Files'
import { db } from '../db/db'
import { useSnippetId } from './location'

export const useReadFilesFromDb = () => {
  const snippetId = useSnippetId()
  const { setFiles } = useFilesContext()

  useEffect(() => {
    if (!snippetId) return

    const query = {
      files: { $: { where: { snippetId } } },
    }

    db.queryOnce(query).then((response) => {
      const filesItem = response.data.files[0]

      if (!filesItem) return

      const files = JSON.parse(filesItem.filesJson) as PlaygroundProps['files']

      setFiles(files)
    })
  }, [snippetId, setFiles])
}
