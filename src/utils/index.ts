export * from './image'
export * from './cn'

export function assertFulfilled<T>(
  item: PromiseSettledResult<T>
): item is PromiseFulfilledResult<T> {
  return item.status === 'fulfilled'
}
