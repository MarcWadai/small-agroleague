import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { AuthenticationStoreModel } from './AuthenticationStore'
import { PostStoreModel } from './PostStore'

/**
 * A RootStore model.
 */
export const RootStoreModel = types
  .model('RootStore')
  .props({
    authenticationStore: types.optional(AuthenticationStoreModel, {}),
    postStore: types.optional(PostStoreModel, {}),
  })
  .views((self) => ({
    get authenticatedUser() {
      return self.authenticationStore?.user
    },
    get authenticateToken() {
      return self.authenticationStore?.authToken
    },
  }))

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
