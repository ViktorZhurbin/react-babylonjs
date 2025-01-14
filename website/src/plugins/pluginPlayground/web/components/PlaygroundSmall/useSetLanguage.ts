import { useSandpack } from '@codesandbox/sandpack-react'
import { Language } from '../../../shared/constants'
import { useObservableState } from '../../context/hooks/useState'
import { useLocalStorageLanguage } from '../../hooks/localStorage'

export const useSetLanguage = () => {
  const { sandpack } = useSandpack()
  const state$ = useObservableState()
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
