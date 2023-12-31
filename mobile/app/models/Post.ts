import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { UserModel } from './User'

const Category = types.model('Category', {
  name: types.string,
  displayName: types.string,
  id: types.integer,
})

const Reco = types.model('Reco', {
  id: types.integer,
  content: types.string,
  createdBy: types.maybe(UserModel),
})

/**
 * This represents an Post of React Native Radio.
 */
export const PostModel = types.model('Post').props({
  id: types.identifierNumber,
  question: '',
  categories: types.array(Category),
  createdAt: types.string,
  createdBy: UserModel,
  reco: types.maybe(Reco),
})

export type Post = Instance<typeof PostModel>
export type PostSnapshotOut = SnapshotOut<typeof PostModel>
export type PostSnapshotIn = SnapshotIn<typeof PostModel>
