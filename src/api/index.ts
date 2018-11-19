import * as Model from '../models'
import * as Util from '../utils'
import { Endpoint, Mockups } from './endpoints'

let requestId: number = 0

export async function request(
  endpoint: Endpoint<any>,
  timeout: number = 30000
): Promise<Model.RequestResult<any>> {
  requestId++
  const currentRequest = requestId

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  if (endpoint.token) headers.append('Authorization', endpoint.token)
  const requestData = {
    method: endpoint.method,
    headers,
    body: endpoint.data ? JSON.stringify(endpoint.data) : undefined
  }
  console.log(`\n --> API Request ${currentRequest}`, {
    endpoint: endpoint.url,
    method: endpoint.method,
    request: requestData || 'Empty request'
  })
  try {
    const response = await Util.promiseTimeout(appFetch(endpoint.url, requestData), timeout, 'Error: Request timeout')
    const responseJSON = await response.json()
    if (!response.ok)
      return {
        kind: 'ErrorFetching',
        error: responseJSON.error,
        errorCode: response.status
      }

    if (response.status === 403 || response.status === 401)
      return {
        kind: 'ErrorFetching',
        error: new Error('Unauthorized'),
        errorCode: response.status
      }

    if (response.status === 204)
      return {
        kind: 'Fetched',
        data: null,
        fetchedAt: new Date()
      }

    if (responseJSON)
      console.log(`\n <-- API Response ${currentRequest}`, {
        endpoint: endpoint.url,
        method: endpoint.method,
        response: responseJSON
      })

    return {
      kind: 'Fetched',
      data: responseJSON,
      fetchedAt: new Date()
    }
  } catch (error) {
    console.log(`\n <-- ERROR API Response ${currentRequest}`, {
      endpoint: endpoint.url,
      method: endpoint.method,
      error
    })
    return {
      kind: 'ErrorFetching',
      error
    }
  }
}

function appFetch(url: RequestInfo, params?: RequestInit): Promise<Response> {
  if (typeof url === 'string' && Mockups[url]) {
    return Mockups[url](params)
  }
  return fetch(url, params)
}
