import { Lazy }from "../src"

describe('Lazy', () => {

  test('value()', () => {
    const obj = { test: "val" }
    const lazy = new Lazy<{ [key:string]: string }>(() => { return obj })
    expect((lazy as any)._value).toBeUndefined()
    expect((lazy as any)._initialized).toBe(false)
    expect(lazy.value).toBe(obj)
    expect((lazy as any)._value).toBe(obj)
    expect((lazy as any)._initialized).toBe(true)
    expect(lazy.value).toBe(obj)
  })

})