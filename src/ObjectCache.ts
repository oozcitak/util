/**
 * Represents an object cache with a size limit.
 */
export class ObjectCache<T> {

  private _limit: number
  private _items = new Set<T>()

  /**
   * Initializes a new instance of `ObjectCache`.
   * 
   * @param limit - maximum number of items to keep in the cache. When the limit
   * is exceeded the first item is removed from the cache.
   */
  public constructor(limit: number = 1000) { 
    this._limit = limit
  }

  /**
   * Adds a new item to the cache.
   * 
   * @param item - an item
   */
  add(item: T): void {
    this._items.add(item)
    if (this._items.size > this._limit) {
      const it = this._items.values().next()
      /* istanbul ignore else */
      if (!it.done) {
        this._items.delete(it.value)
      }
    }
  }

  /**
   * Removes an item from the cache.
   * 
   * @param item - an item
   */
  remove(item: T): void {
    this._items.delete(item)
  }

  /**
   * Removes all items from the cache.
   */
  clear(): void {
    this._items.clear()
  }

  /**
   * Gets the number of items in the cache.
   */
  get length(): number { return this._items.size }

  /**
   * Applies the given callback function to all elements of the cache.
   */
  forEach(callback: (item: T) => void): void {
    this._items.forEach(callback)
  }

  /**
   * Iterates through the items in the cache.
   */
  *entries(): IterableIterator<T> {
    yield *this
  }

  /**
   * Iterates through the items in the cache.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield *this._items
  }
  
}
