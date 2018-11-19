export type Endpoint<T> = {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  token?: string
  data: T
}

export const GET_ROOMS: () => Endpoint<undefined> = () => ({
  url: 'assets/mockups/rooms.json',
  method: 'GET',
  data: undefined
})

type Mockups = {
  [key: string]: (params?: RequestInit) => Promise<any>
}

export const Mockups: Mockups = {
  'assets/mockups/rooms.json': params => new Promise((resolve) => {
    setTimeout(
      () => resolve(new Response(JSON.stringify(require('../assets/mockups/rooms.json')))
    ), 1000)
  }),
}

