import { useCurrentFiles } from './useCurrentFiles'

export const useActiveCode = () => {
  const { currentFiles, updateCurrentFiles, activeFile } = useCurrentFiles()

  return {
    code: currentFiles[activeFile],

    updateCode: (value: string) => {
      updateCurrentFiles({
        [activeFile]: value,
      })
    },
  }
}
