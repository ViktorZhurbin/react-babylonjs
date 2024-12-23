// Matches imports and captures both full path and filename
const relativeImportRegex =
  /(?:import\s+(?:(?:\*\s+as\s+\w+|[\w\s{},]+)\s+from\s+)?|import\s*\()\s*['"](\.[^'"]+)['"](?:\s*[);])?/g

// Helper function to extract file info from imports
export function extractImportInfo(codeString: string) {
  const imports = []
  const regex = new RegExp(relativeImportRegex)
  let match

  while ((match = regex.exec(codeString)) !== null) {
    const importPath = match[1] // Captured group with the relative path
    const fileName = importPath.split(/[/\\]/).pop() // Get last segment

    imports.push({
      fileName,
      importPath,
      importStatement: match[0],
    })
  }

  return imports
}
