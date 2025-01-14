import { db } from './db'
import { stringifyFiles } from './helpers'
import { PlaygroundProps } from '../../shared/types'

export function addFiles(pgId: string, files: Partial<PlaygroundProps['files']>) {
  const preparedFiles = stringifyFiles(files)

  db.transact(
    db.tx.files[pgId].update({
      ...preparedFiles,
      // ownerId: '1',
      // createdAt: Date.now(),
    })
  )
}
