/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

export interface Post {
  id: number
  Categories: [{
    id: number
    name: string
    displayName: string
  }]
  reco: {
    id: number
    content: string
    createdBy: {
      name: string
      id: number,
    }
  }
  question: string
  createdBy: {
    name: string
    id: number,
  }
  createdAt: Date
}

export interface AuthUser {
    user: {
      id: number
      email: string
      name: string
    }
    tokens: {
      access: {
        token: string
        expires: Date
      },
      refresh: {
        token: string
        expires: Date
      }
    }
	}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
