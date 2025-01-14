import { shallowEqual, useShallowEffect } from '@mantine/hooks'
import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react'
import { FilesEntry } from '../../../shared/types'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useObservableState } from '../../context/hooks/useState'

/**
 * When user starts typing in the editor `sandpack.files` change.
 * Then we need to sync them with state$.files
 */
export const useSyncFiles = () => {
  const state$ = useObservableState()
  const { sandpack } = useSandpack()
  const [language] = useLocalStorageLanguage()

  const filesForLanguage = state$.files[language]

  useShallowEffect(() => {
    const visibleFiles = getVisibleFiles(sandpack.visibleFilesFromProps, sandpack.files)

    const isSandpackRunning = sandpack.status === 'running'
    const areFilesUnchanged = shallowEqual(filesForLanguage.get(), visibleFiles)

    if (!isSandpackRunning || areFilesUnchanged) {
      console.log('no update')
      return
    }

    filesForLanguage.set(visibleFiles)
  }, [sandpack.files])
}

function getVisibleFiles(fileNames: string[], files: SandpackFiles) {
  return fileNames.reduce<FilesEntry>((acc, fileName) => {
    const file = files[fileName]

    acc[fileName] = typeof file === 'string' ? file : file?.code ?? ''

    return acc
  }, {})
}
