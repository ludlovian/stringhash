import { suite, test } from 'node:test'
import assert from 'node:assert/strict'

import StringHash from '../src/index.mjs'

suite('StringHash', () => {
  test('simple store & retrieve', () => {
    const h = new StringHash()
    const exp = 'foobar'
    const tok = h.store(exp)
    const act = h.retrieve(tok)
    assert.strictEqual(act, exp)
  })

  test('multiple store gives same token', () => {
    const h = new StringHash()
    const str = 'foobar'
    const tok1 = h.store(str)
    const tok2 = h.store(str)
    assert.strictEqual(tok1, tok2)
  })

  test('clear', () => {
    const h = new StringHash()
    const str = 'foobar'
    const tok = h.store(str)
    assert.strictEqual(h.retrieve(tok), str)

    h.clear()
    assert.strictEqual(h.retrieve(tok), null)
  })

  test('fill hash', () => {
    const h = new StringHash({ size: 4 })
    const tokens = new Set()
    for (let i = 0; i < 16; i++) {
      tokens.add(h.store(`foo${i}`))
    }
    assert.strictEqual(tokens.size, 16)
  })

  suite('errors', () => {
    test('bad sizes', () => {
      assert.throws(
        () => new StringHash({ size: 'not a number' }),
        /size must be an integer between 4 and 31/
      )
      assert.throws(
        () => new StringHash({ size: 12.34 }),
        /size must be an integer between 4 and 31/
      )
      assert.throws(
        () => new StringHash({ size: 3 }),
        /size must be an integer between 4 and 31/
      )
      assert.throws(
        () => new StringHash({ size: 32 }),
        /size must be an integer between 4 and 31/
      )
    })

    test('not a string', () => {
      const h = new StringHash()
      assert.throws(() => h.store({ not_a: 'string' }), /Not a string/)
    })

    test('out of space', () => {
      const h = new StringHash({ size: 4 })
      for (let i = 0; i < 16; i++) {
        h.store(`foo${i}`)
      }

      assert.throws(() => h.store('bar'), /No space/)
    })
  })
})
