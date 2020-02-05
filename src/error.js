const showHelp = () => {
  console.log('SMART SEARCH 0.0.1 - Search pictures by keyword \nUsage:\n\nsmartsearch [searchpath] [destinationpath] [keyword]\n')
  console.log('searchpath: path where to search for pictures')
  console.log('destinationpath: path where to copy found pictures')
  console.log('keyword: keyword what should the search try to identify in the pictures')
}

const handleError = (error) => {
  switch(error.message) {
    case 'insufficient':
      console.log('Not enough parameters!\n')
      showHelp()
      process.exit()
    default:
      console.error('Something went wrong!', error.message)
      process.exit()
  }
}

module.exports = { handleError }