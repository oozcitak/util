import * as util from "../src"

describe('FixedSizeSet', () => {
  
  test('add()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
  })

  test('add() with limit', () => {
    const cache = new util.FixedSizeSet<number>(3)
    for (let i = 0; i < 10; i++) {
      cache.add(i)
    }
    expect([...cache.values()]).toEqual([7, 8, 9])
  })

  test('has()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect(cache.has(1)).toBe(true)
    expect(cache.has(4)).toBe(false)
  })

  test('delete()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
    cache.delete(2)
    expect([...cache.values()]).toEqual([1, 3])
    cache.delete(4)
    expect([...cache.values()]).toEqual([1, 3])
  })

  test('clear()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
    cache.clear()
    expect([...cache.values()]).toEqual([ ])
  })

  test('forEach', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    const items: number[] = []
    cache.forEach(item => items.push(item))
    expect([...items]).toEqual([1, 2, 3])
  })

  test('keys()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.keys()]).toEqual([1, 2, 3])
  })

  test('values()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
  })

  test('entries()', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.entries()]).toEqual([[1, 1], [2, 2], [3, 3]])
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
    expect([...items]).toEqual([1, 2, 3])
  })

  test('size', () => {
    const cache = new util.FixedSizeSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect(cache.size).toBe(3)
  })

  test('toString', () => {
    const cache = new util.FixedSizeSet<number>()
    expect(cache.toString()).toBe("[object Set]")
  })

})