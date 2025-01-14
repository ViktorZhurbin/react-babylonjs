import { SandpackCodeEditor } from '@codesandbox/sandpack-react'
import { useSyncFiles } from './useSyncFiles'

export const CodeMirrorEditor = ({ className }: { className?: string }) => {
  useSyncFiles()

  return <SandpackCodeEditor className={className} />
}
