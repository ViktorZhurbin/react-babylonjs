import { createContext, useContext, useState } from 'react'
import { PlaygroundProps } from '../../shared/types'

type Files = PlaygroundProps['files']

type FilesContextValue = {
  files: Files
  setFiles: React.Dispatch<React.SetStateAction<Files>>
  dependencies: PlaygroundProps['dependencies']
}

const FilesContext = createContext<FilesContextValue | undefined>(undefined)

type FilesProviderProps = {
  children: React.ReactNode
  initialValue: PlaygroundProps
}

function FilesProvider({ initialValue, children }: FilesProviderProps) {
  const [files, setFiles] = useState(initialValue.files)

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        dependencies: initialValue.dependencies,
      }}
    >
      {children}
    </FilesContext.Provider>
  )
}

const useFilesContext = () => {
  const context = useContext(FilesContext)

  if (context === undefined) {
    throw new Error('useFilesContext must be used within a FilesProvider')
  }

  return context
}

export { FilesProvider, useFilesContext }
