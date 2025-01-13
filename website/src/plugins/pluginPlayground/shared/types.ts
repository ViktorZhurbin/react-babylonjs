import { Language } from './constants'

export type FilesEntry = Record<string, string>

export type PlaygroundProps = {
  standalone?: boolean
  files: Record<Language, FilesEntry>
  dependencies: Record<string, string>
}
