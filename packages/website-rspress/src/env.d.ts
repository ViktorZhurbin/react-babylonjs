declare module '_rspress_playground_imports' {
  const getImport: (name: string, getDefault?: boolean) => void
  const imports: Map<string, string>
  export default getImport
}
