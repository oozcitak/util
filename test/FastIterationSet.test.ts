import * as util from "../src"

describe('FastIterationSet', () => {
  
  test('add()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.values()]).toEqual([one, two, three])
    // can't have duplicates
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.values()]).toEqual([one, two, three])
  })

  test('has()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    const four: [number] = [4]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect(cache.has(one)).toBe(true)
    expect(cache.has(two)).toBe(true)
    expect(cache.has(three)).toBe(true)
    expect(cache.has(four)).toBe(false)
  })

  test('delete()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    const four: [number] = [4]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.values()]).toEqual([one, two, three])
    cache.delete(two)
    expect([...cache.values()]).toEqual([one, three])
    cache.delete(four)
    expect([...cache.values()]).toEqual([one, three])
  })

  test('clear()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.values()]).toEqual([one, two, three])
    cache.clear()
    expect([...cache.values()]).toEqual([ ])
  })

  test('forEach', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    const items: number[] = []
    cache.forEach(item => items.push(item[0]))
    expect([...items]).toEqual([1, 2, 3])
  })

  test('keys()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.keys()]).toEqual([one, two, three])
  })

  test('values()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.values()]).toEqual([one, two, three])
  })

  test('entries()', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect([...cache.entries()]).toEqual([[one, one], [two, two], [three, three]])
  })

  test('iterator', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    const items: number[] = []
    for (const item of cache) { items.push(item[0]) }
    expect([...items]).toEqual([1, 2, 3])
  })

  test('size', () => {
    const cache = new util.FastIterationSet<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.add(one)
    cache.add(two)
    cache.add(three)
    expect(cache.size).toBe(3)
  })

  test('toString', () => {
    const cache = new util.FastIterationSet<[number]>()
    expect(cache.toString()).toBe("[object FastIterationSet]")
  })

})