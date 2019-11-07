import * as util from "../src"

describe('NodeCompareCache', () => {

  test('check()', () => {
    for (let i = 0; i < 100; i++) {
      const cache = new util.CompareCache<string>()
      const str1 = "a"
      const str2 = "b"
      const val1 = cache.check(str1, str2)
      const val2 = cache.check(str2, str1)
      expect(val1 || val2).toBe(true)
      expect(val1 && val2).toBe(false)
    }
  })

  test('check() with limit', () => {
    const cache = new util.CompareCache<number>(10)

    for (let i = 0; i < 100; i++) {
      const num1 = i
      const num2 = 1000 + i
      const val1 = cache.check(num1, num2)
      const val2 = cache.check(num2, num1)
      expect(val1 || val2).toBe(true)
      expect(val1 && val2).toBe(false)
    }
  })

})