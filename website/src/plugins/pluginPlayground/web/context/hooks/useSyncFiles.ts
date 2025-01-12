import { useShallowEffect } from '@mantine/hooks'
import { useSandpack } from '@codesandbox/sandpack-react'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { useObservableState } from './useState'

// Update state$.files when sandpack.files change
export const useSyncFiles = () => {
  const { sandpack } = useSandpack()
  const [language] = useLocalStorageLanguage()
  const state$ = useObservableState()

  useShallowEffect(() => {
    const isCodeNotBeingChanged = sandpack.status !== 'running'

    if (isCodeNotBeingChanged) return

    const files = sandpack.visibleFilesFromProps.reduce<Record<string, string>>((acc, fileName) => {
      const file = sandpack.files[fileName]
      acc[fileName] = typeof file === 'string' ? file : file.code

      return acc
    }, {})

    state$.files[language].set(files)
  }, [sandpack.files])
}
