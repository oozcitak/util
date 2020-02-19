import * as util from "../src"

describe('UniqueArray', () => {
  
  test('add()', () => {
    const cache = new util.UniqueArray<[number]>()
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
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    const four: [number] = [4]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    expect(cache.has(one)).toBe(true)
    expect(cache.has(two)).toBe(true)
    expect(cache.has(three)).toBe(true)
    expect(cache.has(four)).toBe(false)
  })

  test('delete()', () => {
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    const four: [number] = [4]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    expect([...cache.values()]).toEqual([one, two, three])
    cache.delete(two)
    expect([...cache.values()]).toEqual([one, three])
    cache.delete(four)
    expect([...cache.values()]).toEqual([one, three])
  })

  test('clear()', () => {
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    expect([...cache.values()]).toEqual([one, two, three])
    cache.clear()
    expect([...cache.values()]).toEqual([ ])
  })

  test('forEach', () => {
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    const items: number[] = []
    cache.forEach(item => items.push(item[0]))
    expect([...items]).toEqual([1, 2, 3])
  })

  test('iterator', () => {
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    const items: number[] = []
    for (const item of cache) { items.push(item[0]) }
    expect([...items]).toEqual([1, 2, 3])
  })

  test('size', () => {
    const cache = new util.UniqueArray<[number]>()
    const one: [number] = [1]
    const two: [number] = [2]
    const three: [number] = [3]
    cache.push(one)
    cache.push(two)
    cache.push(three)
    expect(cache.size).toBe(3)
  })

})