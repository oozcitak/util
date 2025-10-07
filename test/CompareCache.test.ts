import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import * as util from "../lib/index.js"

suite('NodeCompareCache', () => {

  test('check()', () => {
    const cache = new util.CompareCache<string>()
    let allTrue = true
    let allFalse = false

    for (let i = 0; i < 100; i++) {
      const str1 = "a"
      const str2 = "b"
      const val1 = cache.check(str1, str2)
      const val2 = cache.check(str2, str1)

      const thisTrue = val1 || val2
      const thisFalse = val1 && val2
      if (thisTrue !== true) { allTrue = false }
      if (thisFalse !== false) { allFalse = true }
    }

    deepEqual(allTrue, true)
    deepEqual(allFalse, false)
  })

  suite('check() with limit', () => {
    const cache = new util.CompareCache<number>(10)
    let allTrue = true
    let allFalse = false

    for (let i = 0; i < 100; i++) {
      const num1 = i
      const num2 = 1000 + i
      const val1 = cache.check(num1, num2)
      const val2 = cache.check(num2, num1)

      const thisTrue = val1 || val2
      const thisFalse = val1 && val2
      if (thisTrue !== true) { allTrue = false }
      if (thisFalse !== false) { allFalse = true }
    }

    deepEqual(allTrue, true)
    deepEqual(allFalse, false)
  })

})