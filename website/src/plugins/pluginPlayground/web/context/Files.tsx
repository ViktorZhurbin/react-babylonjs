import { createContext, useCallback, useContext, useState } from 'react'
import { PlaygroundProps } from '../../shared/types'
import { Language } from '../../shared/constants'
import { LocalStorage } from '../constants'

type Files = PlaygroundProps['files']

type FilesContextValue = {
  files: Files
  setFiles: React.Dispatch<React.SetStateAction<Files>>
  language: Language
  setLanguage: (language: Language) => void
}

const FilesContext = createContext<FilesContextValue | undefined>(undefined)

function FilesProvider(props: { children: React.ReactNode; initialValue: Files }) {
  const [files, setFiles] = useState(props.initialValue)

  const storedLanguage = localStorage.getItem(LocalStorage.Language) as Language | null
  const [language, setLanguage] = useState<Language>(
    storedLanguage ? JSON.parse(storedLanguage) : Language.tsx
  )

  const handleSetLanguage = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage)
    localStorage.setItem(LocalStorage.Language, JSON.stringify(nextLanguage))
  }, [])

  return (
    <FilesContext.Provider
      value={{
        files,
        setFiles,
        language,
        setLanguage: handleSetLanguage,
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
