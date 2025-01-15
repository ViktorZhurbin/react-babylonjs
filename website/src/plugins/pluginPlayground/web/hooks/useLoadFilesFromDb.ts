import { useEffect } from 'react'
import { db } from '../db/db'
import { useSnippetId } from './location'
import { useFilesContext } from '../context/Files'
import { PlaygroundProps } from '../../shared/types'

export const useReadFilesFromDb = () => {
  const playgroundId = useSnippetId()
  const { setFiles } = useFilesContext()

  useEffect(() => {
    if (!playgroundId) return

    const query = {
      files: { $: { where: { id: playgroundId } } },
    }

    db.queryOnce(query).then((response) => {
      const filesItem = response.data.files[0]

      if (!filesItem) return

      const files = JSON.parse(filesItem.filesJson) as PlaygroundProps['files']

      setFiles(files)
    })
  }, [])
}
