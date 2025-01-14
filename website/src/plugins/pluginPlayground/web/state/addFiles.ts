import { db } from './db'
import { State } from '../context/state.types'
import { stringifyFiles } from './helpers'

export function addFiles(pgId: string, files: Partial<State['files']>) {
  const preparedFiles = stringifyFiles(files)

  db.transact(
    db.tx.files[pgId].update({
      ...preparedFiles,
      // ownerId: '1',
      // createdAt: Date.now(),
    })
  )
}
