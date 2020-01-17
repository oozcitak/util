/**
 * Represents a set of objects with a size limit.
 */
export class FixedSizeSet<T> implements Set<T> {

  private _limit: number
  private _items = new Set<T>()

  /**
   * Initializes a new instance of `FixedSizeSet`.
   * 
   * @param limit - maximum number of items to keep in the set. When the limit
   * is exceeded the first item is removed from the set.
   */
  public constructor(limit: number = 1000) { 
    this._limit = limit
  }

  /**
   * Adds a new item to the set.
   * 
   * @param item - an item
   */
  add(item: T): this {
    this._items.add(item)
    if (this._items.size > this._limit) {
      const it = this._items.values().next()
      /* istanbul ignore else */
      if (!it.done) {
        this._items.delete(it.value)
      }
    }
    return this
  }

  /**
   * Removes an item from the set.
   * 
   * @param item - an item
   */
  delete(item: T): boolean {
    return this._items.delete(item)
  }

  /**
   * Determines if an item is in the set.
   * 
   * @param item - an item
   */
  has(item: T): boolean {
    return this._items.has(item)
  }

  /**
   * Removes all items from the set.
   */
  clear(): void {
    this._items.clear()
  }

  /**
   * Gets the number of items in the set.
   */
  get size(): number { return this._items.size }

  /**
   * Applies the given callback function to all elements of the set.
   */
  forEach(callback: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    this._items.forEach(e => callback.call(thisArg, e, e, this))
  }

  /**
   * Iterates through the items in the set.
   */
  *keys(): IterableIterator<T> {
    yield *this._items.keys()
  }

  /**
   * Iterates through the items in the set.
   */
  *values(): IterableIterator<T> {
    yield *this._items.values()
  }

  /**
   * Iterates through the items in the set.
   */
  *entries(): IterableIterator<[T, T]> {
    yield *this._items.entries()
  }

  /**
   * Iterates through the items in the set.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield *this._items
  }
  
  /**
   * Returns the string tag of the set.
   */
  get [Symbol.toStringTag](): string {
    return "FixedSizeSet"
  }

}
