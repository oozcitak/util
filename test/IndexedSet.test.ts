import * as util from "../src"

describe('IndexedSet', () => {
  
  test('add()', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
  })

  test('has()', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect(cache.has(1)).toBe(true)
    expect(cache.has(4)).toBe(false)
  })

  test('delete()', () => {
    const cache = new util.IndexedSet<number>()
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
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
    cache.clear()
    expect([...cache.values()]).toEqual([ ])
  })

  test('forEach', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    const items: number[] = []
    cache.forEach(item => items.push(item))
    expect([...items]).toEqual([1, 2, 3])
  })

  test('keys()', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.keys()]).toEqual([1, 2, 3])
  })

  test('values()', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.values()]).toEqual([1, 2, 3])
  })

  test('entries()', () => {
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect([...cache.entries()]).toEqual([[1, 1], [2, 2], [3, 3]])
  })

  test('iterator', () => {
    const cache = new util.IndexedSet<number>()
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
    const cache = new util.IndexedSet<number>()
    cache.add(1)
    cache.add(2)
    cache.add(3)
    expect(cache.size).toBe(3)
  })

  test('indexed getter', () => {
    const cache = new util.IndexedSet<string>()
    cache.add("a")
    cache.add("b")
    cache.add("c")
    expect(cache[0]).toBe("a")
    expect(cache[1]).toBe("b")
    expect(cache[2]).toBe("c")
    expect(cache[-1]).toBeUndefined()
    expect(cache[100]).toBeUndefined()
  })

  test('indexed setter', () => {
    const cache = new util.IndexedSet<string>()
    cache.add("a")
    cache.add("b")
    cache.add("c")
    cache[-1] = "x"
    cache[1] = "x"
    cache[100] = "x"
    expect([...cache.values()]).toEqual(["a", "x", "c"])
  })

  test('toString', () => {
    const cache = new util.IndexedSet<number>()
    expect(cache.toString()).toBe("[object IndexedSet]")
  })

})