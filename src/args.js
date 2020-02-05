const checkLength = () => {
  if (process.argv[2] !== 'help' && process.argv.length < 5) {
    throw new Error('insufficient')
  }
}

const get = () => {
  const origin = process.argv[2]
  const destination = process.argv[3]
  const keywords = process.argv[4]

  return [ origin, destination, keywords ]
}

module.exports = { checkLength, get }