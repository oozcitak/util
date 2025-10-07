import { suite, test } from 'node:test'
import { deepEqual, strictEqual } from 'node:assert'
import { Lazy } from "../lib/index.js"

suite('Lazy', () => {

  test('value()', () => {
    const obj = { test: "val" }
    const lazy = new Lazy<{ [key:string]: string }>(() => { return obj })

    strictEqual((lazy as any)._value, undefined)
    strictEqual((lazy as any)._initialized, false)
    deepEqual(lazy.value, obj)
    deepEqual((lazy as any)._value, obj)
    strictEqual((lazy as any)._initialized, true)
    deepEqual(lazy.value, obj)
  })

})