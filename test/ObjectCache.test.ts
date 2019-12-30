import * as util from "../src"

describe('ObjectCache', () => {
  
  test('set()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.keys()]).toEqual([1, 2, 3])
  })

  test('set() with limit', () => {
    const cache = new util.ObjectCache<number, string>(3)
    for (let i = 0; i < 10; i++) {
      cache.set(i, "q")
    }
    expect([...cache.keys()]).toEqual([7, 8, 9])
  })

  test('get()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect(cache.get(1)).toBe("a")
    expect(cache.get(4)).toBeUndefined()
  })

  test('has()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect(cache.has(1)).toBe(true)
    expect(cache.has(4)).toBe(false)
  })

  test('delete()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.keys()]).toEqual([1, 2, 3])
    cache.delete(2)
    expect([...cache.keys()]).toEqual([1, 3])
    cache.delete(4)
    expect([...cache.keys()]).toEqual([1, 3])
  })

  test('clear()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.keys()]).toEqual([1, 2, 3])
    cache.clear()
    expect([...cache.keys()]).toEqual([ ])
  })

  test('forEach', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    const keys: number[] = []
    const values: string[] = []
    cache.forEach((key, value) => { keys.push(key); values.push(value) })
    expect([...keys]).toEqual([1, 2, 3])
    expect([...values]).toEqual(["a", "b", "c"])
  })


  test('keys()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.keys()]).toEqual([1, 2, 3])
  })

  test('values()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.values()]).toEqual(["a", "b", "c"])
  })

  test('entries()', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect([...cache.entries()]).toEqual([[1, "a"], [2, "b"], [3, "c"]])
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
    expect([...keys]).toEqual([1, 2, 3])
  })

  test('size', () => {
    const cache = new util.ObjectCache<number, string>()
    cache.set(1, "a")
    cache.set(2, "b")
    cache.set(3, "c")
    expect(cache.size).toBe(3)
  })

  test('toString', () => {
    const cache = new util.ObjectCache<number, string>()
    expect(cache.toString()).toBe("[object ObjectCache]")
  })

})