import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { PostStoreModel } from "./PostStore" // @demo remove-current-line


/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
  postStore: types.optional(PostStoreModel, {}), // @demo remove-current-line
}).views(self => ({
  get authenticatedUser() {
    return self.authenticationStore?.user
  },
  get authenticateToken() {
    return self.authenticationStore?.authToken
  }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
