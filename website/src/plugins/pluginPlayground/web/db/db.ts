import { type InstaQLEntity, i, init } from '@instantdb/react'

// ID for app: react-babylonjs
const APP_ID = '273798ee-5893-4d64-a0bb-a8120ac78862'

const schema = i.schema({
  entities: {
    // rename files > snippets?
    files: i.entity({
      snippetId: i.string().unique().indexed(),
      filesJson: i.json(),
      forkedFromId: i.string(),

      createdAt: i.date(),
      updatedAt: i.date(),
    }),
  },
})

type File = InstaQLEntity<typeof schema, 'files'>

const db = init({ appId: APP_ID, schema })

export { db, type File }
