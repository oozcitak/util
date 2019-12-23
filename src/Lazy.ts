/**
 * Represents an object with lazy initialization.
 */
export class Lazy<T> {

  private _initialized: boolean = false
  private _initFunc: () => T
  private _value: T

  /**
   * Initializes a new instance of `Lazy`.
   * 
   * @param initFunc - initializer function
   */
  public constructor(initFunc: () => T) {
    this._value = undefined as any
    this._initFunc = initFunc
  }

  /** 
   * Gets the value of the object.
   */
  get value(): T {
    if (!this._initialized) {
      this._value = this._initFunc()
      this._initialized = true
    }
    return this._value
  }

}
