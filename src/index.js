const symbolFor = typeof Symbol === 'function'
  ? key => Symbol.for(`instanceof-symbol:${key}`)
  /* istanbul ignore next */
  : key => `@@instanceof-symbol:${key}`

export default key => {
  const symbol = symbolFor(key)
  return {
    is: subject => subject && subject[symbol] === true,
    attach: host => {
      if (Object(host) === host) {
        host[symbol] = true
      }
    }
  }
}
