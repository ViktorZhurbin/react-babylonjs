import { synced } from '@legendapp/state/sync'
import { useObservable } from '@legendapp/state/react'
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'
import { State } from './state.types'
import { StateContext } from './StateContext'

function StateProvider(props: {
  shouldSync?: boolean
  children: React.ReactNode
  initialState: Pick<State, 'files'>
}) {
  const state$ = useObservable(
    props.shouldSync
      ? synced({
          initial: props.initialState,
          persist: {
            name: 'react-babylonjs-playground',
            plugin: ObservablePersistLocalStorage,
          },
        })
      : props.initialState
  )

  return <StateContext.Provider value={state$}>{props.children}</StateContext.Provider>
}

export { StateProvider }
