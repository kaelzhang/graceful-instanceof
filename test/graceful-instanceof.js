import test from 'ava'
import instanceOf from '../src'

function factory () {
  const type = instanceOf('A')
  return class A {
    constructor (options) {
      if (type.is(options)) {
        return options
      }
      type.attach(this)
    }
  }
}

function factory2 () {
  const type = instanceOf('A')
  return class A {
    constructor (options) {
      if (type.is(options)) {
        return options
      }
      type.attach(this)
    }
  }
}

test('basic', t => {
  const A = factory()
  const A2 = factory2()

  const a = new A({})
  t.is(a, new A2(a))
})
