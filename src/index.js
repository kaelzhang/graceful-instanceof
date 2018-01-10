import symbol from 'symbol-for'

export default key => {
  const s = symbol.for(key + ':hasInstance')
  return {
    is: subject => subject && subject[s] === true,
    attach: host => {
      if (Object(host) === host) {
        host[s] = true
      }
    }
  }
}
