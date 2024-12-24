import { useActiveCode } from '@codesandbox/sandpack-react'
import { Runner } from '@rspress/plugin-playground/web'
import getImport from '_rspress_playground_imports'

export const MyRunner = () => {
  const { code } = useActiveCode()

  return <Runner language="tsx" code={code} getImport={getImport} />
}
