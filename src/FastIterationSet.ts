/**
 * Represents a set of objects with an array backend.
 */
export class FastIterationSet<T extends object> implements Set<T> {

  private _items: T[] = []
  private _lookup = new  WeakSet<T>()

  /**
   * Adds a new item to the set.
   * 
   * @param item - an item
   */
  add(item: T): this {
    if (!this._lookup.has(item)) {
      this._items.push(item)
      this._lookup.add(item)
    }
    return this
  }

  /**
   * Removes an item from the set.
   * 
   * @param item - an item
   */
  delete(item: T): boolean {
    let hasItem = false
    if (this._lookup.has(item)) {
      const index = this._items.indexOf(item)
      if (index !== -1) {
        this._items.splice(index, 1)
        hasItem = true
      }
      this._lookup.delete(item)
    }
    return hasItem
  }

  /**
   * Determines if an item is in the set.
   * 
   * @param item - an item
   */
  has(item: T): boolean {
    return this._lookup.has(item)
  }

  /**
   * Removes all items from the set.
   */
  clear(): void {
    for (const item of this._items) {
      this._lookup.delete(item)
    }
    this._items.length = 0
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
   * Iterates through the items in the set.
   */
  keys(): IterableIterator<T> {
    return new FastIterationSetIterator<T>(this._items)
  }

  /**
   * Iterates through the items in the set.
   */
  values(): IterableIterator<T> {
    return new FastIterationSetIterator<T>(this._items)
  }

  /**
   * Iterates through the items in the set.
   */
  entries(): IterableIterator<[T, T]> {
    return new FastIterationSetEntryIterator<T>(this._items)
  }

  /**
   * Iterates through the items in the set.
   */
  [Symbol.iterator](): IterableIterator<T> {
    return new FastIterationSetIterator<T>(this._items)
  }
  
  /**
   * Returns the string tag of the set.
   */
  get [Symbol.toStringTag](): string {
    return "FastIterationSet"
  }

}

class FastIterationSetIterator<T extends object> implements IterableIterator<T> {
  private _index: number
  private _length: number
  private _items: T[]

  constructor(items: T[]) { 
    this._index = 0
    this._length = items.length
    this._items = items
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this
  }

  next(): IteratorResult<T> {
    if (this._index < this._length) {
      return { done: false, value: this._items[this._index++] }
    } else {
      return { done: true, value: null }
    }
  }
}

class FastIterationSetEntryIterator<T extends object> implements IterableIterator<[T, T]> {
  private _index: number
  private _length: number
  private _items: T[]

  constructor(items: T[]) { 
    this._index = 0
    this._length = items.length
    this._items = items
  }

  [Symbol.iterator](): IterableIterator<[T, T]> {
    return this
  }

  next(): IteratorResult<[T, T]> {
    if (this._index < this._length) {
      const item = this._items[this._index++]
      return { done: false, value: [item, item] }
    } else {
      return { done: true, value: null }
    }
  }
}