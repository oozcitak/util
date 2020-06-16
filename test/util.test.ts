import * as util from "../src"

describe('util', () => {

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
    expect(item.val()).toBe(42)
    expect(item._val()).toBe(24)
    expect(item.constructor.name).toBe("ClassA")
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
    expect(a_b.val1).toBe(24)
    expect(a_b.val2).toBe("not undefined")
    expect(typeof a_b.val3).toBe("function")
  })

  test('applyDefaults with empty object', () => {
    const a = undefined
    const b = {
      val1: 42,
      val2: "not undefined"
    }
    const a_b = util.applyDefaults(a, b) as { val1: number, val2: string }
    expect(a_b.val1).toBe(42)
    expect(a_b.val2).toBe("not undefined")
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
    expect(a_b.val2.val22).toBe(12)
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
    expect(a_b.val1).toBe(42)
    expect(a_b.val2).toBe("not undefined")
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
    expect(a_b.val.a).toBe(42)
    expect(a_b.val.b).toBe("not undefined")
  })

  test('forEachArray', () => {
    const arr1 = [1, 2, 3, 4]
    const arr2: number[] = []
    util.forEachArray(arr1, i => arr2.push(i + 10))
    expect(arr2).toEqual([11, 12, 13, 14])
  })

  test('forEachArray with set', () => {
    const arr1 = new Set([1, 2, 3, 4])
    const arr2: number[] = []
    util.forEachArray(arr1, i => arr2.push(i + 10))
    expect(arr2).toEqual([11, 12, 13, 14])
  })

  test('forEachObject', () => {
    const obj1 = { a: 1, b: 2, c: 3, d: 4 }
    const obj2: { [key: string]: number } = { }
    util.forEachObject(obj1, (key, val) => obj2[key + "x"] = val + 10)
    expect(obj2).toEqual({ ax: 11, bx: 12, cx: 13, dx: 14 })
  })

  test('forEachObject with map', () => {
    const obj1 = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    const obj2: { [key: string]: number } = { }
    util.forEachObject(obj1, (key, val) => obj2[key + "x"] = val + 10)
    expect(obj2).toEqual({ ax: 11, bx: 12, cx: 13, dx: 14 })
  })

  test('arrayLength', () => {
    const arr = [1, 2, 3, 4]
    expect(util.arrayLength(arr)).toBe(4)
  })

  test('arrayLength with set', () => {
    const arr = new Set([1, 2, 3, 4])
    expect(util.arrayLength(arr)).toBe(4)
  })

  test('objectLength', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    expect(util.objectLength(obj)).toBe(4)
  })

  test('objectLength with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    expect(util.objectLength(obj)).toBe(4)
  })

  test('getObjectValue', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    expect(util.getObjectValue(obj, "b")).toBe(2)
  })

  test('getObjectValue with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    expect(util.getObjectValue(obj, "b")).toBe(2)
  })

  test('removeObjectValue', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    util.removeObjectValue(obj, "b")
    expect(obj).toEqual({ a: 1, c: 3, d: 4 })
  })

  test('removeObjectValue with map', () => {
    const obj = new Map<string, number>([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
    util.removeObjectValue(obj, "b")
    expect(obj).toEqual(new Map<string, number>([["a", 1], ["c", 3], ["d", 4]]))
  })

  test('clone', () => {
    expect(util.clone(1)).toBe(1)
    expect(util.clone(true)).toBe(true)
    expect(util.clone("x")).toBe("x")
    expect(util.clone(["x"])).toEqual(["x"])
    expect(util.clone({ x: "x" })).toEqual({ x: "x" })

    const obj1 = {
      a: 1,
      b: [1, 2, 3],
      c: "x",
      d: (val: string): string => 'hello ' + val
    }
    const  obj2 = util.clone(obj1)
    expect(obj2.a).toBe(1)
    expect(obj2.b).toEqual([1, 2, 3])
    expect(obj2.c).toBe("x")
    expect(obj2.d("world")).toBe("hello world")
  })

  test('isBoolean', () => {
    expect(util.isBoolean(true)).toBe(true)
    expect(util.isBoolean(true)).toBe(true)
    expect(util.isBoolean(1)).toBe(false)
    expect(util.isBoolean(0)).toBe(false)
    expect(util.isBoolean("x")).toBe(false)
    expect(util.isBoolean(["x"])).toBe(false)
    expect(util.isBoolean({ x: "x" })).toBe(false)
    expect(util.isBoolean(() => { })).toBe(false)
  })

  test('isNumber', () => {
    expect(util.isNumber(1)).toBe(true)
    expect(util.isNumber(0)).toBe(true)
    expect(util.isNumber(NaN)).toBe(true)
    expect(util.isNumber(Infinity)).toBe(true)
    expect(util.isNumber("x")).toBe(false)
    expect(util.isNumber(["x"])).toBe(false)
    expect(util.isNumber({ x: "x" })).toBe(false)
    expect(util.isNumber(() => { })).toBe(false)
  })

  test('isString', () => {
    expect(util.isString("")).toBe(true)
    expect(util.isString("0")).toBe(true)
    expect(util.isString(1)).toBe(false)
    expect(util.isString(["x"])).toBe(false)
    expect(util.isString({ x: "x" })).toBe(false)
    expect(util.isString(() => { })).toBe(false)
  })

  test('isFunction', () => {
    expect(util.isFunction(() => { })).toBe(true)
    expect(util.isFunction("0")).toBe(false)
    expect(util.isFunction(1)).toBe(false)
    expect(util.isFunction(["x"])).toBe(false)
    expect(util.isFunction({ x: "x" })).toBe(false)
  })

  test('isObject', () => {
    expect(util.isObject(() => { })).toBe(true)
    expect(util.isObject(["x"])).toBe(true)
    expect(util.isObject({ x: "x" })).toBe(true)
    expect(util.isObject("0")).toBe(false)
    expect(util.isObject(1)).toBe(false)
  })

  test('isArray', () => {
    expect(util.isArray(["x"])).toBe(true)
    expect(util.isArray(() => { })).toBe(false)
    expect(util.isArray({ x: "x" })).toBe(false)
    expect(util.isArray("0")).toBe(false)
    expect(util.isArray(1)).toBe(false)
  })

  test('isEmpty', () => {
    expect(util.isEmpty([])).toBe(true)
    expect(util.isEmpty({})).toBe(true)
    expect(util.isEmpty(new Set())).toBe(true)
    expect(util.isEmpty(new Set([1,2,3]))).toBe(false)
    expect(util.isEmpty(new Map())).toBe(true)
    expect(util.isEmpty(new Map([["a", 1]]))).toBe(false)
    expect(util.isEmpty(["x"])).toBe(false)
    expect(util.isEmpty({ x: "x" })).toBe(false)

    expect(util.isEmpty(123)).toBe(false)
    expect(util.isEmpty(0)).toBe(false)
    expect(util.isEmpty(true)).toBe(false)
    expect(util.isEmpty(false)).toBe(false)
    expect(util.isEmpty("nope")).toBe(false)
    expect(util.isEmpty("")).toBe(false)

    class Obj { }
    const emptyObj = new Obj()
    Reflect.setPrototypeOf(emptyObj, { id: 42 })
    expect(util.isEmpty(emptyObj)).toBe(true)
  })

  test('isPlainObject', function () {
    expect(util.isPlainObject({ x: "x" })).toBeTruthy()
    expect(util.isPlainObject(new Number(1))).toBeFalsy()
    expect(util.isPlainObject(["x"])).toBeFalsy()
    expect(util.isPlainObject(() => { })).toBeFalsy()
    expect(util.isPlainObject("0")).toBeFalsy()
    expect(util.isPlainObject(1)).toBeFalsy()
  })

  test('isIterable', function () {
    expect(util.isIterable(["x"])).toBeTruthy()
    expect(util.isIterable(new Map<string, number>([["a", 1]]))).toBeTruthy()
    expect(util.isIterable("0")).toBeTruthy()
    expect(util.isIterable({ x: "x" })).toBeFalsy()
    expect(util.isIterable(() => { })).toBeFalsy()
    expect(util.isIterable(1)).toBeFalsy()
  })

  test('isMap', function () {
    expect(util.isMap(new Map<string, number>([["a", 1]]))).toBeTruthy()
    expect(util.isMap({ x: "x" })).toBeFalsy()
    expect(util.isMap(["x"])).toBeFalsy()
    expect(util.isMap(() => { })).toBeFalsy()
    expect(util.isMap("0")).toBeFalsy()
    expect(util.isMap(1)).toBeFalsy()
  })

  test('getValue', function () {
    expect(util.getValue(new Number(1))).toBe(1)
    expect(util.getValue(new String("x"))).toBe("x")
    expect(util.getValue({ x: "x" })).toEqual({ x: "x" })
    expect(util.getValue(["x"])).toEqual(["x"])
    const withValueOf = new Number(1)
    const withoutValueOf = withValueOf as any
    withoutValueOf.valueOf = undefined
    expect(util.getValue(withoutValueOf).toString()).toBe("1")
  })

  test('utf8Encode', () => {
    expect(util.utf8Encode("HELLO")).toEqual(new Uint8Array([72, 69, 76, 76, 79]))
    expect(util.utf8Encode("Ö")).toEqual(new Uint8Array([195, 150]))
    expect(util.utf8Encode("\u9733")).toEqual(new Uint8Array([233, 156, 179]))
    expect(util.utf8Encode("\u{1f600}")).toEqual(new Uint8Array([240, 159, 152, 128]))
    expect(util.utf8Encode("\u{1f600}")).toEqual(new Uint8Array([240, 159, 152, 128]))
    // invalid surrogates
    expect(() => util.utf8Encode(String.fromCharCode(0xd83d))).toThrow()
    expect(() => util.utf8Encode(String.fromCharCode(0xd83d, 0xd000))).toThrow()
  })

  test('utf8Decode', () => {
    expect(util.utf8Decode(new Uint8Array([72, 69, 76, 76, 79]))).toBe("HELLO")
    expect(util.utf8Decode(new Uint8Array([195, 150]))).toBe("Ö")
    expect(util.utf8Decode(new Uint8Array([233, 156, 179]))).toBe("\u9733")
    expect(util.utf8Decode(new Uint8Array([240, 159, 152, 128]))).toBe("\u{1f600}")
    expect(util.utf8Decode(new Uint8Array([240, 159, 152, 128]))).toBe("\u{1f600}")
    // invalid byte sequences
    expect(() => util.utf8Decode(new Uint8Array([198]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([233, 156]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([240, 159, 152]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([250]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([247, 143, 191, 191]))).toThrow()
  })

})
