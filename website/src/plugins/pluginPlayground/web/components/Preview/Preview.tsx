import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useFilesContext } from '../../context/Files'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import { CodeRunner } from '../CodeRunner/CodeRunner'
import styles from './Preview.module.css'

export const Preview = () => {
  const { files } = useFilesContext()
  const [language] = useLocalStorageLanguage()
  const [error, setError] = useState<Error | undefined>()

  const selectedFiles = files[language]

  const errorOverlay = error ? <pre className={styles.error}>{error?.message}</pre> : null

  return (
    <div className={styles.wrapper}>
      <ErrorBoundary onError={setError} resetKeys={[selectedFiles]} fallback={errorOverlay}>
        <CodeRunner files={selectedFiles} setError={setError} />
      </ErrorBoundary>
      {errorOverlay}
    </div>
  )
}
