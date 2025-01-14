import { State } from '../context/state.types'
import { db } from './db'
import { stringifyFiles } from './helpers'

export function updateFiles(pgId: string, files: Partial<State['files']>) {
  const preparedFiles = stringifyFiles(files)

  db.transact(
    db.tx.files[pgId].update({
      ...preparedFiles,
      // updatedAt: Date.now(),
    })
  )
}
