import { suite, test } from 'node:test'
import { deepEqual, strictEqual } from 'node:assert'
import * as util from "../lib/index.js"

suite('FixedSizeSet', () => {

  test('add()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.values()], [1, 2, 3])
  })

  test('add() with limit', () => {
    const cache = new util.FixedSizeSet<number>(3)
    for (let i = 0; i < 10; i++) {
      cache.add(i)
    }
    deepEqual([...cache.values()], [7, 8, 9])
  })

  test('has()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    strictEqual(cache.has(1), true)
    strictEqual(cache.has(4), false)
  })

  test('delete()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.values()], [1, 2, 3])
    cache.delete(2)
    deepEqual([...cache.values()], [1, 3])
    cache.delete(4)
    deepEqual([...cache.values()], [1, 3])
  })

  test('clear()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.values()], [1, 2, 3])
    cache.clear()
    deepEqual([...cache.values()], [ ])
  })

  test('forEach', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    const items: number[] = []
    cache.forEach(item => items.push(item))
    deepEqual([...items], [1, 2, 3])
  })

  test('keys()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.keys()], [1, 2, 3])
  })

  test('values()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.values()], [1, 2, 3])
  })

  test('entries()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    deepEqual([...cache.entries()], [[1, 1], [2, 2], [3, 3]])
  })

  test('iterator', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    const items: number[] = []
    for (const item of cache) {
      items.push(item)
    }
    deepEqual([...items], [1, 2, 3])
  })

  test('size', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    strictEqual(cache.size, 3)
  })

  test('toString', () => {
    const cache = new util.FixedSizeSet<number>()
    strictEqual(cache.toString(), "[object FixedSizeSet]")
  })

})