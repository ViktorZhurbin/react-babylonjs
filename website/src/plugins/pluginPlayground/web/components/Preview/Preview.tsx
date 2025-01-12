import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorOverlay } from '@codesandbox/sandpack-react'
import { CodeRunner } from '../CodeRunner/CodeRunner'
import { useFiles } from '../../context/hooks/useState'
import { useLocalStorageLanguage } from '../../hooks/localStorage'
import styles from './Preview.module.css'

export const Preview = () => {
  const files = useFiles()
  const [language] = useLocalStorageLanguage()
  const [error, setError] = useState<Error | undefined>()

  const errorOverlay = error ? <ErrorOverlay>{error?.message}</ErrorOverlay> : null

  return (
    <div className={styles.wrapper}>
      <ErrorBoundary onError={setError} resetKeys={[files]} fallback={errorOverlay}>
        <CodeRunner files={files[language]} setError={setError} />
      </ErrorBoundary>
      {errorOverlay}
    </div>
  )
}
