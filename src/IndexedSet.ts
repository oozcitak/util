import { isNumber } from "."
import { isString } from "util"

/**
 * Represents a set of objects with indexed access. Uses double the memory of an
 * ordinary set, in favor of fast indexed look-ups.
 */
export class IndexedSet<T> implements Set<T> {

  private _items: T[] = []
  private _index = new Map<T, number>()

  private _proxyHandler = {
    /**
     * Implements a proxy get trap to provide array-like access.
     */
    get: (target: IndexedSet<T>, key: PropertyKey, receiver: any): T | undefined => {
      let index: number | undefined
      if (isNumber(key)) {
        index = key
      } else if (isString(key)) {
        const num = Number(key)
        if (!isNaN(num)) index = num
      }

      if (index !== undefined) {
        return target._items[index] || undefined
      } else {
        return Reflect.get(target, key, receiver)
      }
    },

    /**
     * Implements a proxy set trap to provide array-like access.
     */
    set: (target: IndexedSet<T>, key: PropertyKey, value: any, receiver: any): boolean => {
      let index: number | undefined
      if (isNumber(key)) {
        index = key
      } else if (isString(key)) {
        const num = Number(key)
        if (!isNaN(num)) index = num
      }

      if (index !== undefined && index >= 0 && index < target._items.length - 1) {
        const oldItem = target._items[index]
        target._items[index] = value
        target._index.delete(oldItem)
        target._index.set(value, index)
        return true
      } else {
        return Reflect.set(target, key, value, receiver)
      }
    }
  }

  /**
   * Initializes a new instance of `IndexedSet`.
   */
  public constructor() {
    return new Proxy<IndexedSet<T>>(this, this._proxyHandler)
  }

  /**
   * Adds a new item to the set.
   * 
   * @param item - an item
   */
  add(item: T): this {
    if (!this._index.has(item)) {
      this._index.set(item, this._items.length)
      this._items.push(item)
    }
    return this
  }

  /**
   * Removes an item from the set.
   * 
   * @param item - an item
   */
  delete(item: T): boolean {
    const index = this._index.get(item)
    if (index !== undefined) {
      this._items.splice(index, 1)
      this._index.delete(item)

      // correct indices
      for (let i = index; i < this._items.length; i++) {
        const nextItem = this._items[i]
        const nextIndex = this._index.get(nextItem)
        if (nextIndex !== undefined) {
          this._index.set(nextItem, i)
        }
      }
      return true
    }
    return false
  }

  /**
   * Determines if an item is in the set.
   * 
   * @param item - an item
   */
  has(item: T): boolean {
    return this._index.has(item)
  }

  /**
   * Removes all items from the set.
   */
  clear(): void {
    this._items = []
    this._index.clear()
  }

  /**
   * Gets the number of items in the set.
   */
  get size(): number { return this._items.length }

  /**
   * Applies the given callback function to all elements of the set.
   */
  forEach(callback: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    this._items.forEach(e => callback.call(thisArg, e, e, this))
  }

  /**
   * Provides indexed access to the set.
   */
  [key: number]: T | undefined

  /**
   * Iterates through the items in the set.
   */
  *keys(): IterableIterator<T> {
    yield* this._items
  }

  /**
   * Iterates through the items in the set.
   */
  *values(): IterableIterator<T> {
    yield* this._items
  }

  /**
   * Iterates through the items in the set.
   */
  *entries(): IterableIterator<[T, T]> {
    for (const item of this._items) {
      yield [item, item]
    }
  }

  /**
   * Iterates through the items in the set.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this._items
  }

  /**
   * Returns the string tag of the set.
   */
  get [Symbol.toStringTag](): string {
    return "IndexedSet"
  }

}
