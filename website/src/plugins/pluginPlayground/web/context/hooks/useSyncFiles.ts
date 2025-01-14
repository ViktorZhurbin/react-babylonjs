import { shallowEqual, useShallowEffect } from '@mantine/hooks'
import { SandpackFiles, useSandpack } from '@codesandbox/sandpack-react'
import { useSaveFiles } from '../../hooks/useSaveFiles'
import { FilesEntry } from '../../../shared/types'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useObservableState } from './useState'

/**
 * When user starts typing in the editor, ie sandpack.files change,
 * - Update state$.files, to persist locally
 * - Save files to db, when applicable
 */
export const useSyncFiles = () => {
  const state$ = useObservableState()
  const { sandpack } = useSandpack()
  const [language] = useLocalStorageLanguage()

  const saveFilesToDb = useSaveFiles()
  const filesForLanguage = state$.files[language]

  useShallowEffect(() => {
    const visibleFiles = getVisibleFiles(sandpack.visibleFilesFromProps, sandpack.files)

    const isSandpackRunning = sandpack.status === 'running'
    const areFilesUnchanged = shallowEqual(filesForLanguage.get(), visibleFiles)

    if (!isSandpackRunning || areFilesUnchanged) {
      console.log('no update')
      return
    }

    saveFilesToDb(visibleFiles)
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
