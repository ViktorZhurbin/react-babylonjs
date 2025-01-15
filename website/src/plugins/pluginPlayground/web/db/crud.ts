import { id, lookup } from '@instantdb/react'
import type { PlaygroundProps } from '../../shared/types'
import { db } from './db'

export function createSnippet(snippetId: string, files: PlaygroundProps['files']) {
  db.transact(
    db.tx.files[id()].update({
      snippetId,
      filesJson: JSON.stringify(files),
    })
  )
}

export function updateSnippet(snippetId: string, files: PlaygroundProps['files']) {
  db.transact(
    db.tx.files[lookup('snippetId', snippetId)].merge({
      filesJson: JSON.stringify(files),
    })
  )
}
