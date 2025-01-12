import { Observable } from '@legendapp/state'
import { createContext } from 'react'
import { State } from './state.types'

const StateContext = createContext<Observable<State>>(undefined as any)

export { StateContext }
