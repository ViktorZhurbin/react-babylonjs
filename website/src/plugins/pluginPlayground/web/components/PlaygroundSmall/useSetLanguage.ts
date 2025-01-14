import { useSandpack } from '@codesandbox/sandpack-react'
import { Language } from '../../../shared/constants'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useFilesContext } from '../../context/Files'

export const useSetLanguage = () => {
  const { sandpack } = useSandpack()
  const state$ = useFilesContext()
  const [prevLanguage, setLanguage] = useLocalStorageLanguage()

  return (nextLanguage: Language) => {
    if (nextLanguage === prevLanguage) return

    for (const filePath of sandpack.visibleFilesFromProps) {
      sandpack.deleteFile(filePath)
    }

    const nextFiles = state$.files.get()[nextLanguage]

    sandpack.addFile(nextFiles)
    setLanguage(nextLanguage)
  }
}
