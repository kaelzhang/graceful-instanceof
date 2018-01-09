[![Build Status](https://travis-ci.org/kaelzhang/graceful-instanceof.svg?branch=master)](https://travis-ci.org/kaelzhang/graceful-instanceof)
[![Coverage](https://codecov.io/gh/kaelzhang/graceful-instanceof/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/graceful-instanceof)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/graceful-instanceof?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/graceful-instanceof)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/graceful-instanceof.svg)](http://badge.fury.io/js/graceful-instanceof)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/graceful-instanceof.svg)](https://www.npmjs.org/package/graceful-instanceof)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/graceful-instanceof.svg)](https://david-dm.org/kaelzhang/graceful-instanceof)
-->

# graceful-instanceof

The instanceof mechanism cross package versions.

## Why?

```js
export default class MyClass {
  constructor (options) {
    if (this instanceof MyClass) {
      return options
    }

    // do something with options
  }
}
```

We intend to do something like this:

```js
const instance = new MyClass(options)

instance === new MyClass(instance)  // true
```

But what happens if the `instance` is came from another version of the module?

```
abc.js
node_modules
  |-- foo # version 1.0.0
        |-- index.js # which export default MyClass
  |-- bar
        |-- node_modules # version 1.1.0
        |     |-- foo
        |           |-- index.js # also exports MyClass
        |-- index.js # which exports default the instance of MyClass
```

And in abc.js

```js
import bar from 'bar'
import MyClass from 'foo'

bar === new MyClass(bar)  // FALSE!!

// Something BOOOOOOOOOOM !!!
```

## Install

```sh
$ npm install graceful-instanceof
```

## Usage

```js
import instanceOf from 'graceful-instanceof'

const type = instanceOf('foo:MyClass')

class MyClass {
  constructor (options) {
    if (type.is(options)) {
      return options
    }

    type.attach(this)
  }
}

const instace = new MyClass(options)

instance === new MyClass(instance)  // true
```

And it also works cross versions.

## License

MIT
