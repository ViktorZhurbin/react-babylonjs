import { Language } from '../../shared/constants'
import { State } from '../context/state.types'

export const stringifyFiles = (files: Partial<State['files']>) =>
  Object.entries(files).reduce<Record<string, string>>((acc, [lang, file]) => {
    acc[lang] = JSON.stringify(file)

    return acc
  }, {})
