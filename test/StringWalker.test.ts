import { suite, test } from 'node:test'
import { strictEqual } from 'node:assert'
import * as util from "../lib/index.js"

suite('StringWalker', () => {

  const StringWalker = util.StringWalker

  test('constructor', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.length, 5)
  })

  test('eof', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.eof, false)
    walker.pointer = 10
    strictEqual(walker.eof, true)
  })

  test('length', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.length, 5)
  })

  test('codePoint()', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.codePoint(), 0x69)
    strictEqual(walker.codePoint(), 0x69)
    walker.pointer = 10
    strictEqual(walker.codePoint(), -1)
  })

  test('c()', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.c(), "i")
    strictEqual(walker.c(), "i")
    walker.pointer = 10
    strictEqual(walker.c(), "")
  })

  test('remaining()', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.remaining(), "nput")
    strictEqual(walker.remaining(), "nput")
    walker.pointer = 10
    strictEqual(walker.remaining(), "")
  })

  test('substring()', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.substring(), "input")
    strictEqual(walker.substring(), "input")
    walker.pointer = 10
    strictEqual(walker.substring(), "")
  })

  test('pointer', () => {
    const walker = new StringWalker("input")
    strictEqual(walker.pointer, 0)
    strictEqual(walker.c(), "i")
    walker.pointer = 0
    strictEqual(walker.c(), "i")
    walker.pointer = 1
    strictEqual(walker.c(), "n")
    walker.pointer = 2
    strictEqual(walker.c(), "p")
    walker.pointer = 3
    strictEqual(walker.c(), "u")
    walker.pointer = 4
    strictEqual(walker.c(), "t")
    walker.pointer = 5
    strictEqual(walker.c(), "")
    strictEqual(walker.eof, true)
  })

})
