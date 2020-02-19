/**
 * Represents a set of objects with an array backend.
 */
export class UniqueArray<T extends object> extends Array<T> {

  private _lookup = new WeakSet<T>()

  /**
   * Adds a new item to the set.
   * 
   * @param item - an item
   */
  push(...items: T[]): number {
    for (const item of items) {
      if (!this._lookup.has(item)) {
        super.push(item)
        this._lookup.add(item)
      }
    }
    return this.length
  }

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   */
  splice(start: number, deleteCount?: number, ...items: T[]): T[] {
    const removed = (deleteCount === undefined ?
      super.splice(start) :
      (items === undefined ?
        super.splice(start, deleteCount) :
        super.splice(start, deleteCount, ...items)
      )
    )
    for (const item of removed) {
      this._lookup.delete(item)
    }
    for (const item of items) {
      this._lookup.add(item)
    }
    return removed
  }

  /**
   * Adds a new item to the set.
   * 
   * @param item - an item
   */
  add(item: T): this {
    if (!this._lookup.has(item)) {
      this.push(item)
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
      const index = this.indexOf(item)
      if (index !== -1) {
        this.splice(index, 1)
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
    for (const item of this) {
      this._lookup.delete(item)
    }
    this.length = 0
  }

  /**
   * Gets the number of items in the set.
   */
  get size(): number { return this.length }

}
