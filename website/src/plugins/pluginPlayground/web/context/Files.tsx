import { createContext, useContext, useState } from 'react'
import { PlaygroundProps } from '../../shared/types'

type Files = PlaygroundProps['files']

type FilesContextValue = {
  files: Files
  setFiles: React.Dispatch<React.SetStateAction<Files>>
}

const FilesContext = createContext<FilesContextValue | undefined>(undefined)

function FilesProvider(props: { children: React.ReactNode; initialValue: Files }) {
  const [files, setFiles] = useState(props.initialValue)

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {props.children}
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
