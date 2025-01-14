import { Observable } from '@legendapp/state'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { use$, useObservable } from '@legendapp/state/react'
import { synced } from '@legendapp/state/sync'
import { createContext, useContext } from 'react'
import { PlaygroundProps } from '../../shared/types'
import { useIsPlaygroundPage } from '../hooks/location'

const FilesContext = createContext<Observable<{ files: PlaygroundProps['files'] }>>(
  undefined as any
)

function FilesProvider(props: {
  children: React.ReactNode
  initialState: Pick<PlaygroundProps, 'files'>
}) {
  const isPlaygroundPage = useIsPlaygroundPage()

  const state$ = useObservable(
    isPlaygroundPage
      ? synced({
          initial: props.initialState,
          persist: {
            name: 'react-babylonjs-playground',
            plugin: ObservablePersistLocalStorage,
          },
        })
      : props.initialState
  )

  return <FilesContext.Provider value={state$}>{props.children}</FilesContext.Provider>
}

const useFilesContext = () => useContext(FilesContext)

const useFiles = () => {
  const state$ = useFilesContext()

  return use$(state$.files)
}

export { FilesProvider, useFiles, useFilesContext }
