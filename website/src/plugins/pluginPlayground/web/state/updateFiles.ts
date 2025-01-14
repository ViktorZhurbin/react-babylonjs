import { PlaygroundProps } from '../../shared/types'
import { db } from './db'
import { stringifyFiles } from './helpers'

export function updateFiles(pgId: string, files: Partial<PlaygroundProps['files']>) {
  const preparedFiles = stringifyFiles(files)

  db.transact(
    db.tx.files[pgId].update({
      ...preparedFiles,
      // updatedAt: Date.now(),
    })
  )
}
