import { createContext, useContext, useEffect, useState } from 'react'
import { PlaygroundProps } from '../../shared/types'
import { EntryFiles } from '../../shared/constants'
import { useLocalStorageLanguage } from '../hooks/localStorage'

type Files = PlaygroundProps['files']

type FilesContextValue = {
  files: Files
  setFiles: React.Dispatch<React.SetStateAction<Files>>

  activeFile: string
  setActiveFile: React.Dispatch<React.SetStateAction<string>>

  dependencies: PlaygroundProps['dependencies']
}

const FilesContext = createContext<FilesContextValue | undefined>(undefined)

type FilesProviderProps = {
  children: React.ReactNode
  initialValue: PlaygroundProps
}

function FilesProvider({ initialValue, children }: FilesProviderProps) {
  const [files, setFiles] = useState(initialValue.files)

  const [language] = useLocalStorageLanguage()
  const [activeFile, setActiveFile] = useState(EntryFiles[language])

  useEffect(() => {
    const fileNames = Object.keys(initialValue.files[language])
    const [activeFileNameBase] = activeFile.split('.')
    const nextActiveFile = fileNames.find((fileName) => fileName.includes(activeFileNameBase))

    setActiveFile(nextActiveFile ?? EntryFiles[language])
  }, [language])

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        activeFile,
        setActiveFile,
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
