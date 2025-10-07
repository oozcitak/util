import { suite, test } from 'node:test'
import { deepEqual, strictEqual } from 'node:assert'
import * as util from "../lib/index.js"

suite('ObjectCache', () => {

  test('set()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.keys()], [1, 2, 3])
  })

  test('set() with limit', () => {
    const cache = new util.ObjectCache<number, string>(3)
    for (let i = 0; i < 10; i++) {
      cache.set(i, "q")
    }
    deepEqual([...cache.keys()], [7, 8, 9])
  })

  test('get()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    strictEqual(cache.get(1), "a")
    strictEqual(cache.get(4), undefined)
  })

  test('has()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    strictEqual(cache.has(1), true)
    strictEqual(cache.has(4), false)
  })

  test('delete()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.keys()], [1, 2, 3])
    cache.delete(2)
    deepEqual([...cache.keys()], [1, 3])
    cache.delete(4)
    deepEqual([...cache.keys()], [1, 3])
  })

  test('clear()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.keys()], [1, 2, 3])
    cache.clear()
    deepEqual([...cache.keys()], [ ])
  })

  test('forEach', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    const keys: number[] = []
    const values: string[] = []
    cache.forEach((key, value) => { keys.push(key); values.push(value) })
    deepEqual([...keys], [1, 2, 3])
    deepEqual([...values], ["a", "b", "c"])
  })


  test('keys()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.keys()], [1, 2, 3])
  })

  test('values()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.values()], ["a", "b", "c"])
  })

  test('entries()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    deepEqual([...cache.entries()], [[1, "a"], [2, "b"], [3, "c"]])
  })

  test('iterator', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    const keys: number[] = []
    for (const [key, value] of cache) {
      keys.push(key)
    }
    deepEqual([...keys], [1, 2, 3])
  })

  test('size', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    strictEqual(cache.size, 3)
  })

  test('toString', () => {
    const cache = new util.ObjectCache<number, string>()
    strictEqual(cache.toString(), "[object ObjectCache]")
  })

})