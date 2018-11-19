export type RequestResult<T> = {
  kind: 'ErrorFetching'
  error: Error
  errorCode?: number
} | { 
  kind: 'Fetched';
  data: T
  fetchedAt: Date 
}

export type RemoteData<T> = | {
  kind: 'NotFetched'
} | {
  kind: 'IsFetching'
  data?: T
} | {
  kind: 'ErrorFetching'
  error: Error
  errorCode?: number
} | { 
  kind: 'Fetched'; 
  data: T; 
  fetchedAt: Date 
}