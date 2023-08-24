import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { api } from '../services/api'
import { PostModel } from './Post'
import { withSetPropAction } from './helpers/withSetPropAction'
import { getRootStore } from './helpers/getRootStore'

export const PostStoreModel = types
  .model('PostStore')
  .props({
    posts: types.array(PostModel),
    myPosts: types.array(PostModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchPosts() {
      const response = await api.getPosts()
      if (response.kind === 'ok') {
        store.setProp('posts', response.posts)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchMyPosts() {
      const response = await api.getMyPosts(getRootStore(store).authenticationStore.user.id)
      if (response.kind === 'ok') {
        store.setProp('myPosts', response.posts)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
  }))

export type PostStore = Instance<typeof PostStoreModel>
export type PostStoreSnapshot = SnapshotOut<typeof PostStoreModel>
