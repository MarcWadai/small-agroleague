import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { UserModel } from './User'
import { api } from 'app/services/api'
import { withSetPropAction } from './helpers/withSetPropAction'

export const AuthenticationStoreModel = types
  .model('AuthenticationStore')
  .props({
    authToken: types.maybe(types.string),
    authEmail: '',
    name: '',
    user: types.maybe(UserModel),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return 'must be at least 6 characters'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return 'must be a valid email address'
      return ''
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, '')
    },
    setAuthName(value: string) {
      store.authEmail = value
    },
    async sendLogin(email: string, password: string) {
      const response = await api.postLogin(email, password)
      if (response.kind === 'ok') {
        store.setProp('authToken', response.authUser.authToken)
        store.setProp('authEmail', response.authUser.authEmail)
        store.setProp('name', response.authUser.name)
        store.setProp('user', response.authUser.user)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ''
      store.name = ''
      store.user = undefined
    },
  }))

export type AuthenticationStore = Instance<typeof AuthenticationStoreModel>
export type AuthenticationStoreSnapshot = SnapshotOut<typeof AuthenticationStoreModel>
export type AuthenticationStoreSnapshotIn = SnapshotIn<typeof AuthenticationStoreModel>
