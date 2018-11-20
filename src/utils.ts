import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { ScaledSize } from 'react-native';

export function promiseTimeout<T>(
  promise: Promise<T>,
  ms: number = 30000,
  errorText: string = 'Promise timeout'
): Promise<T> {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error(errorText))
    }, ms)
    promise.then(resolve, reject)
  })
}

export function decode<T>(
  value: any,
  type: t.Type<T>,
  errorMsg: string = 'Decode error',
  trowError: boolean = true
): Promise<T> {
  const validation = type.decode(value)

  return validation.fold(
    () => {
      if (trowError) {
        const errors = PathReporter.report(validation)
        console.warn(errors)
        throw new Error(errorMsg)
      }
      return Promise.reject(errorMsg)
    },
    result => {
      return Promise.resolve(result)
    }
  )
}

export function getWidthHeight({width, height}: ScaledSize): {width: number, height: number} {
  return height > width ? {width, height} : {width: height, height: width}
}