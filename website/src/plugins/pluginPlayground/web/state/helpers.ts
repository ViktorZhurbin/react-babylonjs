import { Language } from '../../shared/constants'
import { State } from '../context/state.types'

export const stringifyFiles = (files: State['files']) =>
  Object.entries(files).reduce<Record<Language, string>>(
    (acc, [lang, file]) => {
      acc[lang as Language] = JSON.stringify(file)

      return acc
    },
    {
      [Language.tsx]: '',
      [Language.jsx]: '',
    }
  )
