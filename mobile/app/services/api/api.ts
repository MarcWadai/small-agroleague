/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import Config from '../../config'
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem'
import type { ApiConfig, Post, AuthUser, UserPosts } from './api.types'
import type { PostSnapshotIn } from '../../models/Post'
import { AuthenticationStoreSnapshotIn } from 'app/models/AuthenticationStore'

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
  }

  async postLogin(
    email: string,
    password: string,
  ): Promise<{ kind: 'ok'; authUser: AuthenticationStoreSnapshotIn } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<AuthUser> = await this.apisauce.post('/auth/login', {
      email,
      password,
    })

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      // This is where we transform the data into the shape we expect for our MST model.
      const authUser: AuthenticationStoreSnapshotIn = {
        authEmail: rawData.user.email,
        authToken: rawData.tokens.access.token,
        name: rawData.user.name,
        user: rawData.user,
      }
      console.log('authUser', authUser)
      return { kind: 'ok', authUser }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: 'bad-data' }
    }
  }

  async getPosts(): Promise<{ kind: 'ok'; posts: PostSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<Post[]> = await this.apisauce.get('/posts')

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      console.log('rawData', rawData)
      // This is where we transform the data into the shape we expect for our MST model.
      const posts: PostSnapshotIn[] = rawData.map((raw) => ({
        id: raw.id,
        question: raw.question,
        categories: raw.Categories,
        createdAt: raw.createdAt,
        createdBy: raw.createdBy,
        reco: raw.reco || undefined,
      }))

      return { kind: 'ok', posts }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: 'bad-data' }
    }
  }

  async getMyPosts(
    userId: number,
  ): Promise<{ kind: 'ok'; posts: PostSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<UserPosts> = await this.apisauce.get(`/users/${userId}/posts`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data
      // This is where we transform the data into the shape we expect for our MST model.
      const posts: PostSnapshotIn[] = rawData.Post.map((raw) => ({
        ...raw,
      }))
      return { kind: 'ok', posts }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: 'bad-data' }
    }
  }
}
// Singleton instance of the API for convenience
export const api = new Api()
