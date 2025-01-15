import { type InstaQLEntity, i, init } from '@instantdb/react'

// ID for app: react-babylonjs
const APP_ID = '273798ee-5893-4d64-a0bb-a8120ac78862'

const schema = i.schema({
  entities: {
    files: i.entity({
      filesJson: i.json(),
      snippetId: i.string(),
      // ownerId: i.string(),
      // updatedAt: i.number(),
      // createdAt: i.number(),
    }),
  },
})

type File = InstaQLEntity<typeof schema, 'files'>

const db = init({ appId: APP_ID, schema })

export { db, type File }
