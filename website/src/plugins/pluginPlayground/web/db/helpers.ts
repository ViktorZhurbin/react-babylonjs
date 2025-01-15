import { PlaygroundProps } from '../../shared/types'

export const stringifyFiles = (files: Partial<PlaygroundProps['files']>) =>
  Object.entries(files).reduce<Record<string, string>>((acc, [lang, file]) => {
    acc[lang] = JSON.stringify(file)

    return acc
  }, {})
