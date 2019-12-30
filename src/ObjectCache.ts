/**
 * Represents a cache of objects with a size limit.
 */
export class ObjectCache<TKey, TValue> {

  private _limit: number
  private _items = new Map<TKey, TValue>()

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
   * Gets an item from the cache.
   * 
   * @param key - object key
   */
  get(key: TKey): TValue | undefined {
    return this._items.get(key)
  }

  /**
   * Adds a new item to the cache.
   * 
   * @param key - object key
   * @param value - object value
   */
  set(key: TKey, value: TValue): void {
    this._items.set(key, value)
    if (this._items.size > this._limit) {
      const it = this._items.keys().next()
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
  delete(key: TKey): boolean {
    return this._items.delete(key)
  }

  /**
   * Determines if an item is in the cache.
   * 
   * @param item - an item
   */
  has(key: TKey): boolean {
    return this._items.has(key)
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
  get size(): number { return this._items.size }

  /**
   * Applies the given callback function to all elements of the cache.
   */
  forEach(callback: (key: TKey, value: TValue) => void, thisArg?: any): void {
    this._items.forEach((v, k) => callback.call(thisArg, k, v))
  }

  /**
   * Iterates through the items in the set.
   */
  *keys(): IterableIterator<TKey> {
    yield *this._items.keys()
  }

  /**
   * Iterates through the items in the set.
   */
  *values(): IterableIterator<TValue> {
    yield *this._items.values()
  }

  /**
   * Iterates through the items in the set.
   */
  *entries(): IterableIterator<[TKey, TValue]> {
    yield *this._items.entries()
  }

  /**
   * Iterates through the items in the set.
   */
  *[Symbol.iterator](): IterableIterator<[TKey, TValue]> {
    yield *this._items
  }
  
  /**
   * Returns the string tag of the cache.
   */
  get [Symbol.toStringTag](): string {
    return "ObjectCache"
  }

}
