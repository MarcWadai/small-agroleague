import { types } from "mobx-state-tree"

export const UserModel = types.model("User", {
  name: types.string,
  email: types.maybe(types.string),
  id: types.integer
})
