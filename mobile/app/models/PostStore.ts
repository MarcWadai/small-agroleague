import { Instance, SnapshotOut, getParent, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Post, PostModel } from "./Post"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { storeAnnotation } from "mobx/dist/internal";
import { RootStore } from "./RootStore";
import { getRootStore } from "./helpers/getRootStore";

export const PostStoreModel = types
  .model("PostStore")
  .props({
    posts: types.array(PostModel),
    myPosts: types.array(PostModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchPosts() {
      const response = await api.getPosts()
      if (response.kind === "ok") {
        store.setProp("posts", response.posts)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    async fetchMyPosts() {
      const response = await api.getMyPosts(getRootStore(store).authenticationStore.user.id)
      if (response.kind === "ok") {
        store.setProp("myPosts", response.posts)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
  }));

export interface PostStore extends Instance<typeof PostStoreModel> {}
export interface PostStoreSnapshot extends SnapshotOut<typeof PostStoreModel> {}

