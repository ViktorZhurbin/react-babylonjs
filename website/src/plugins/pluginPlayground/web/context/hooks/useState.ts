import { useContext } from 'react'
import { use$ } from '@legendapp/state/react'
import { StateContext } from '../StateContext'

export const useObservableState = () => useContext(StateContext)

export const useFiles = () => {
  const state$ = useObservableState()

  return use$(state$.files)
}
