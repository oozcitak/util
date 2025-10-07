import { suite, test } from 'node:test'
import { deepEqual, strictEqual, throws } from 'node:assert'
import * as util from "../lib/index.js"

suite('util', () => {

  test('applyMixin', () => {
    const ClassA = class {
      val() { return 24 }
      _val() { return undefined }
    }
    const ClassB = class {
      val() { return 42 }
    }
    util.applyMixin(ClassA, ClassB, "val")
    const item = new ClassA()
    strictEqual(item.val(), 42)
    strictEqual(item._val(), 24)
    strictEqual(item.constructor.name, "ClassA")
  })

  test('applyDefaults', () => {
    const a = {
      val1: 24,
      val2: undefined,
      val3: undefined
    }
    const b = {
      val1: 42,
      val2: "not undefined",
      val3: (() => {})
    }
    const a_b = util.applyDefaults(a, b) as { val1: number, val2: string, val3: (() => void) }
    strictEqual(a_b.val1, 24)
    strictEqual(a_b.val2, "not undefined")
    strictEqual(typeof a_b.val3, "function")
  })

  test('applyDefaults with empty object', () => {
    const a = undefined
    const b = {
      val1: 42,
      val2: "not undefined"
    }
    const a_b = util.applyDefaults(a, b) as { val1: number, val2: string }
    strictEqual(a_b.val1, 42)
    strictEqual(a_b.val2, "not undefined")
  })

  test('applyDefaults with nested defaults', () => {
    const a = {
      val1: 24,
      val2: {
        val21: 3,
        val22: undefined
      }
    }
    const b = {
      val1: 42,
      val2: {
        val22: 12
      }
    }
    const a_b = util.applyDefaults(a, b) as { val1: number, val2: { val21: number, val22: number } }
    strictEqual(a_b.val2.val22, 12)
  })

  test('applyDefaults with overwrites', () => {
    const a = {
      val1: 24,
      val2: undefined
    }
    const b = {
      val1: 42,
      val2: "not undefined"
    }
    const a_b = util.applyDefaults(a, b, true) as { val1: number, val2: string }
    strictEqual(a_b.val1, 42)
    strictEqual(a_b.val2, "not undefined")
  })

  test('applyDefaults with nested overwrites', () => {
    const a = {
      val: {
        a: 23,
        b: undefined
      }
    }
    const b = {
      val: {
        a: 42,
        b: "not undefined"
      }
    }
    const a_b = util.applyDefaults(a, b, true) as { val: { a: number, b: string } }
    strictEqual(a_b.val.a, 42)
    strictEqual(a_b.val.b, "not undefined")
  })

  test('forEachArray', () => {
    const arr1 = [1, 2, 3, 4]
    const arr2: number[] = []
    util.forEachArray(arr1, i => arr2.push(i + 10))
    deepEqual(arr2, [11, 12, 13, 14])
  })

  test('forEachArray with set', () => {
    const arr1 = new Set([1, 2, 3, 4])
    const arr2: number[] = []
    util.forEachArray(arr1, i => arr2.push(i + 10))
    deepEqual(arr2, [11, 12, 13, 14])
  })

  test('forEachObject', () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4 }
    const obj2: { [key: string]: number } = { }
    util.forEachObject(obj1, (key, val) => obj2[key + "x"] = val + 10)
    deepEqual(obj2, { ax: 11, bx: 12, cx: 13, dx: 14 })
  })

  test('forEachObject with map', () => {
    const obj1 = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    const obj2: { [key: string]: number } = { }
    util.forEachObject(obj1, (key, val) => obj2[key + "x"] = val + 10)
    deepEqual(obj2, { ax: 11, bx: 12, cx: 13, dx: 14 })
  })

  test('arrayLength', () => {
    const arr = [1, 2, 3, 4]
    strictEqual(util.arrayLength(arr), 4)
  })

  test('arrayLength with set', () => {
    const arr = new Set([1, 2, 3, 4])
    strictEqual(util.arrayLength(arr), 4)
  })

  test('objectLength', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    strictEqual(util.objectLength(obj), 4)
  })

  test('objectLength with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    strictEqual(util.objectLength(obj), 4)
  })

  test('getObjectValue', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    strictEqual(util.getObjectValue(obj, "b"), 2)
  })

  test('getObjectValue with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    strictEqual(util.getObjectValue(obj, "b"), 2)
  })

  test('removeObjectValue', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    util.removeObjectValue(obj, "b")
    deepEqual(obj, { a: 1, c: 3, d: 4 })
  })

  test('removeObjectValue with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    util.removeObjectValue(obj, "b")
    deepEqual(obj, new Map<string, number>([["a", 1], ["c", 3], ["d", 4]]))
  })

  test('clone', () => {
    strictEqual(util.clone(1), 1)
    strictEqual(util.clone(true), true)
    strictEqual(util.clone("x"), "x")
    deepEqual(util.clone(["x"]), ["x"])
    deepEqual(util.clone({ x: "x" }), { x: "x" })

    const obj1 = {
      a: 1,
      b: [1, 2, 3],
      c: "x",
      d: (val: string): string => 'hello ' + val
    }
    const  obj2 = util.clone(obj1)
    strictEqual(obj2.a, 1)
    deepEqual(obj2.b, [1, 2, 3])
    strictEqual(obj2.c, "x")
    strictEqual(obj2.d("world"), "hello world")
  })

  test('isBoolean', () => {
    strictEqual(util.isBoolean(true), true)
    strictEqual(util.isBoolean(true), true)
    strictEqual(util.isBoolean(1), false)
    strictEqual(util.isBoolean(0), false)
    strictEqual(util.isBoolean("x"), false)
    strictEqual(util.isBoolean(["x"]), false)
    strictEqual(util.isBoolean({ x: "x" }), false)
    strictEqual(util.isBoolean(() => { }), false)
  })

  test('isNumber', () => {
    strictEqual(util.isNumber(1), true)
    strictEqual(util.isNumber(0), true)
    strictEqual(util.isNumber(NaN), true)
    strictEqual(util.isNumber(Infinity), true)
    strictEqual(util.isNumber("x"), false)
    strictEqual(util.isNumber(["x"]), false)
    strictEqual(util.isNumber({ x: "x" }), false)
    strictEqual(util.isNumber(() => { }), false)
  })

  test('isString', () => {
    strictEqual(util.isString(""), true)
    strictEqual(util.isString("0"), true)
    strictEqual(util.isString(1), false)
    strictEqual(util.isString(["x"]), false)
    strictEqual(util.isString({ x: "x" }), false)
    strictEqual(util.isString(() => { }), false)
  })

  test('isFunction', () => {
    strictEqual(util.isFunction(() => { }), true)
    strictEqual(util.isFunction("0"), false)
    strictEqual(util.isFunction(1), false)
    strictEqual(util.isFunction(["x"]), false)
    strictEqual(util.isFunction({ x: "x" }), false)
  })

  test('isObject', () => {
    strictEqual(util.isObject(() => { }), true)
    strictEqual(util.isObject(["x"]), true)
    strictEqual(util.isObject({ x: "x" }), true)
    strictEqual(util.isObject("0"), false)
    strictEqual(util.isObject(1), false)
  })

  test('isArray', () => {
    strictEqual(util.isArray(["x"]), true)
    strictEqual(util.isArray(() => { }), false)
    strictEqual(util.isArray({ x: "x" }), false)
    strictEqual(util.isArray("0"), false)
    strictEqual(util.isArray(1), false)
  })

  test('isEmpty', () => {
    strictEqual(util.isEmpty([]), true)
    strictEqual(util.isEmpty({}), true)
    strictEqual(util.isEmpty(new Set()), true)
    strictEqual(util.isEmpty(new Set([1,2,3])), false)
    strictEqual(util.isEmpty(new Map()), true)
    strictEqual(util.isEmpty(new Map([["a", 1]])), false)
    strictEqual(util.isEmpty(["x"]), false)
    strictEqual(util.isEmpty({ x: "x" }), false)

    strictEqual(util.isEmpty(123), false)
    strictEqual(util.isEmpty(0), false)
    strictEqual(util.isEmpty(true), false)
    strictEqual(util.isEmpty(false), false)
    strictEqual(util.isEmpty("nope"), false)
    strictEqual(util.isEmpty(""), false)

    class Obj { }
    const emptyObj = new Obj()
    Reflect.setPrototypeOf(emptyObj, { id: 42 })
    strictEqual(util.isEmpty(emptyObj), true)
  })

  test('isPlainObject', function () {
    strictEqual(util.isPlainObject({ x: "x" }), true)
    strictEqual(util.isPlainObject(new Number(1)), false)
    strictEqual(util.isPlainObject(["x"]), false)
    strictEqual(util.isPlainObject(() => { }), false)
    strictEqual(util.isPlainObject("0"), false)
    strictEqual(util.isPlainObject(1), false)
  })

  test('isIterable', function () {
    strictEqual(util.isIterable(["x"]), true)
    strictEqual(util.isIterable(new Map<string, number>([["a", 1]])), true)
    strictEqual(util.isIterable("0"), true)
    strictEqual(util.isIterable({ x: "x" }), false)
    strictEqual(util.isIterable(() => { }), false)
    strictEqual(util.isIterable(1), false)
  })

  test('isMap', function () {
    strictEqual(util.isMap(new Map<string, number>([["a", 1]])), true)
    strictEqual(util.isMap({ x: "x" }), false)
    strictEqual(util.isMap(["x"]), false)
    strictEqual(util.isMap(() => { }), false)
    strictEqual(util.isMap("0"), false)
    strictEqual(util.isMap(1), false)
  })

  test('getValue', function () {
    strictEqual(util.getValue(new Number(1)), 1)
    strictEqual(util.getValue(new String("x")), "x")
    deepEqual(util.getValue({ x: "x" }), { x: "x" })
    deepEqual(util.getValue(["x"]), ["x"])
    const withValueOf = new Number(1)
    const withoutValueOf = withValueOf as any
    withoutValueOf.valueOf = undefined
    strictEqual(util.getValue(withoutValueOf).toString(), "1")
  })

  test('utf8Encode', () => {
    deepEqual(util.utf8Encode("HELLO"), new Uint8Array([72, 69, 76, 76, 79]))
    deepEqual(util.utf8Encode("Ö"), new Uint8Array([195, 150]))
    deepEqual(util.utf8Encode("\u9733"), new Uint8Array([233, 156, 179]))
    deepEqual(util.utf8Encode("\u{1f600}"), new Uint8Array([240, 159, 152, 128]))
    deepEqual(util.utf8Encode("\u{1f600}"), new Uint8Array([240, 159, 152, 128]))
    // invalid surrogates
    throws(() => util.utf8Encode(String.fromCharCode(0xd83d)))
    throws(() => util.utf8Encode(String.fromCharCode(0xd83d, 0xd000)))
  })

  test('utf8Decode', () => {
    strictEqual(util.utf8Decode(new Uint8Array([72, 69, 76, 76, 79])), "HELLO")
    strictEqual(util.utf8Decode(new Uint8Array([195, 150])), "Ö")
    strictEqual(util.utf8Decode(new Uint8Array([233, 156, 179])), "\u9733")
    strictEqual(util.utf8Decode(new Uint8Array([240, 159, 152, 128])), "\u{1f600}")
    strictEqual(util.utf8Decode(new Uint8Array([240, 159, 152, 128])), "\u{1f600}")
    // invalid byte sequences
    throws(() => util.utf8Decode(new Uint8Array([198])))
    throws(() => util.utf8Decode(new Uint8Array([233, 156])))
    throws(() => util.utf8Decode(new Uint8Array([240, 159, 152])))
    throws(() => util.utf8Decode(new Uint8Array([250])))
    throws(() => util.utf8Decode(new Uint8Array([247, 143, 191, 191])))
  })

})
