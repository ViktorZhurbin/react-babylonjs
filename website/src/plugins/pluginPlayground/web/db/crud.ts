import { db } from './db'
import { PlaygroundProps } from '../../shared/types'

export function addFiles(pgId: string, files: PlaygroundProps['files']) {
  db.transact(
    db.tx.files[pgId].update({
      filesJson: JSON.stringify(files),
      // ownerId: '1',
      // createdAt: Date.now(),
    })
  )
}

export function updateFiles(pgId: string, files: PlaygroundProps['files']) {
  db.transact(
    db.tx.files[pgId].merge({
      filesJson: JSON.stringify(files),
      // updatedAt: Date.now(),
    })
  )
}
