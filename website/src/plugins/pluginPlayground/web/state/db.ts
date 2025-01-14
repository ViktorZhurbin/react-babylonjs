import { id, i, init, InstaQLEntity } from '@instantdb/react'
import { Language } from '../../shared/constants'

// ID for app: react-babylonjs
const APP_ID = '273798ee-5893-4d64-a0bb-a8120ac78862'

// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    files: i.entity({
      [Language.tsx]: i.json(),
      [Language.jsx]: i.json(),
      // ownerId: i.string(),
      // updatedAt: i.number(),
      // createdAt: i.number(),
    }),
  },
})

type File = InstaQLEntity<typeof schema, 'files'>

const db = init({ appId: APP_ID, schema })

export { db, type File }
