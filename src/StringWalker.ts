import { isNumber } from "."

/**
 * Walks the code points of a string.
 */
export class StringWalker {
  private _chars: string
  private _index: number
  private _length: number

  private _c?: string
  private _codePoint?: number
  private _isSurrogatePair: boolean = false
  private _first: number = -1
  private _second: number = -1

  private _startMark: number
  private _endMark: number

  /**
   * Initializes a new `StringWalker`.
   * 
   * @param input - input string
   */
  constructor(input: string) {
    this._chars = input
    this._index = 0
    this._length = this._chars.length

    this._first = this._index < this._length ? this._chars.charCodeAt(this._index) : -1
    this._second = this._index < this._length - 1 ? this._chars.charCodeAt(this._index + 1) : -1
    this._isSurrogatePair = (this._first >= 0xD800 && this._first <= 0xDBFF &&
      this._second >= 0xDC00 && this._second <= 0xDFFF)

    this._startMark = 0
    this._endMark = 0  
  }

  /**
   * Determines if the current position is beyond the end of string.
   */
  get eof(): boolean { return this._index >= this._length }

  /**
   * Returns the current code point. Returns `-1` if the current position is
   * beyond the end of string.
   */
  get codePoint(): number {
    if (this._codePoint === undefined) {
      if (this._first === -1) {
        this._codePoint = -1
      } else if (this._isSurrogatePair) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        this._codePoint = (this._first - 0xD800) * 0x400 + this._second - 0xDC00 + 0x10000
      } else {
        this._codePoint = this._first
      }
    }
    return this._codePoint
  }

  /**
   * Returns the current character. Returns an empty string if the current 
   * position is beyond the end of string.
   */
  get c(): string {
    if (this._c === undefined) {
      const cp = this.codePoint
      this._c = (cp === -1 ? "" : String.fromCodePoint(cp))
    }
    return this._c
  }

  /**
   * Returns the substring including the current character without changing
   * the current position.
   * 
   * @param count - the number of code points to return
   */
  peek(count?: number): string {
    if (this.eof) return ""
    if (count === undefined) return this._chars.slice(this._index)

    const originalIndex = this._index
    let charCount = 0
    let n = 0
    while (n < count) {
      charCount += this._isSurrogatePair ? 2 : 1
      n++
      if (!this.next()) break
    }

    this._codePoint = undefined
    this._c = undefined

    this._index = originalIndex

    this._first = this._index < this._length ? this._chars.charCodeAt(this._index) : -1
    this._second = this._index < this._length - 1 ? this._chars.charCodeAt(this._index + 1) : -1
    this._isSurrogatePair = (this._first >= 0xD800 && this._first <= 0xDBFF &&
      this._second >= 0xDC00 && this._second <= 0xDFFF)

    return this._chars.slice(this._index, this._index + charCount)
  }

  /**
   * Determines whether the substring including the current character 
   * starts with the given string.
   * 
   * @param match - the string to match
   */
  startsWith(match: string, ignoreCase: boolean = false): boolean {
    if (this.eof) return false

    const len = match.length
    if (len > this._length - this._index) return false

    if (ignoreCase) {
      const chars = this._chars.slice(this._index, this._index + match.length)
      if (match.toLowerCase() !== chars.toLowerCase()) return false
    } else {
      for (let i = 0; i < len; i++) {
        if (match[i] !== this._chars[this._index + i]) return false
      }
    }

    return true
  }

  /**
   * Moves to the next code point.
   */
  next(): boolean {
    if (this.eof) return false

    this._codePoint = undefined
    this._c = undefined

    this._index += this._isSurrogatePair ? 2 : 1

    this._first = this._index < this._length ? this._chars.charCodeAt(this._index) : -1
    this._second = this._index < this._length - 1 ? this._chars.charCodeAt(this._index + 1) : -1
    this._isSurrogatePair = (this._first >= 0xD800 && this._first <= 0xDBFF &&
      this._second >= 0xDC00 && this._second <= 0xDFFF)

    return true
  }

  /**
   * Moves to the previous code point.
   */
  prev(): boolean {
    if (this._index === 0) return false

    this._codePoint = undefined
    this._c = undefined

    const second = this._index > 0 ? this._chars.charCodeAt(this._index - 1) : -1
    const first = this._index > 1 ? this._chars.charCodeAt(this._index - 2) : -1

    this._isSurrogatePair = (first >= 0xD800 && first <= 0xDBFF &&
      second >= 0xDC00 && second <= 0xDFFF)
    this._index -= this._isSurrogatePair ? 2 : 1

    this._first = this._isSurrogatePair ? first : second
    this._second = this._isSurrogatePair ? second : -1

    return true
  }

  /**
   * Seeks a number of code points relative to the current position.
   * 
   * @param count - number of code points to seek
   * @param reference - reference of the seek operation
   */
  seek(count: number, reference = SeekOrigin.Current): void {
    if (reference === SeekOrigin.Start) {
      this._codePoint = undefined
      this._c = undefined

      this._index = 0
      this._first = this._index < this._length ? this._chars.charCodeAt(this._index) : -1
      this._second = this._index < this._length - 1 ? this._chars.charCodeAt(this._index + 1) : -1
      this._isSurrogatePair = (this._first >= 0xD800 && this._first <= 0xDBFF &&
        this._second >= 0xDC00 && this._second <= 0xDFFF)
    } else if (reference === SeekOrigin.End) {
      this._codePoint = undefined
      this._c = undefined

      this._index = this._length
      this._first = -1
      this._second = -1
      this._isSurrogatePair = false
    }

    if (count === 0) return

    let n = 0
    if (count > 0) {
      while (n < count && this.next()) { n++ }
    } else {
      count = -count
      while (n < count && this.prev()) { n++ }
    }
  }

  /**
   * Consumes a number of code points.
   * 
   * @param count - number of code points to take
   */
  take(countOrFunc: number | ((char: string) => boolean)): string {
    if (isNumber(countOrFunc)) {
      if (countOrFunc === 0) return ""

      let str = ""
      let n = 0
      while (n < countOrFunc) {
        str += this.c
        this.next()
        n++
      }
      return str
    } else {
      if (!countOrFunc(this.c)) return ""

      let str = this.c
      while (this.next() && countOrFunc(this.c)) {
        str += this.c
      }
      return str
    }
  }

  /**
   * Skips a number of code points.
   * 
   * @param count - number of code points to skip
   */
  skip(countOrFunc: number | ((char: string) => boolean)): void {
    if (isNumber(countOrFunc)) {
      if (countOrFunc === 0) return

      let n = 0
      while (n < countOrFunc && this.next()) { n++ }
    } else {
      if (!countOrFunc(this.c)) return

      while (this.next() && countOrFunc(this.c)) { }
    }
  }

  /**
   * Sets the start index to the current position for the `getMarked` function.
   */
  markStart(): void {
    this._startMark = this._index
    this._endMark = this._index
  }

  /**
   * Sets the end index to the current position for the `getMarked` function.
   */
  markEnd(): void {
    this._endMark = this._index
  }

  /**
   * Gets the string between start and marks.
   */
  getMarked(): string {
    return this._chars.slice(this._startMark, this._endMark)
  }

}

/**
 * Defines the origin of a seek operation.
 */
export enum SeekOrigin {
  /**
   * Seek relative to the start of the string.
   */
  Start = -1,
  /**
   * Seek relative to the current position.
   */
  Current = 0,
  /**
   * Seek relative to the end of the string.
   */
  End = 1
}