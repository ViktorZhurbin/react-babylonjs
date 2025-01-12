import { Language } from './constants'

export type PlaygroundProps = {
  standalone?: boolean
  files: Record<Language, Record<string, string>>
  dependencies: Record<string, string>
}
