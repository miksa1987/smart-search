const fs = require('fs')

const mergeFileNamesAndResults = (filenames, results) => {
  return results.results.map((result, i) => ({ ...result, filename: filenames[i] }))
}

const returnMatchingFiles = (keyword, foundresults) => {
  let returnedResults = []
  console.log('Thinking...')

  foundresults.forEach((result) => {
    const returnedResultsCheck = returnedResults.map(returnedResult => returnedResult.filename)
    result.data.concepts.forEach((thisResult) => {
      if (thisResult.name.toLowerCase().includes(keyword.toLowerCase()) && !returnedResultsCheck.includes(result.filename)) {
        returnedResults.push(result)
        console.log(`Found "${keyword}" in ${result.filename}`)
      }
    })
  })

  return returnedResults
}

const copyFiles = async (filenames, destinationFolder) => {
  for (let file of filenames) {
    console.log('Copying', file)
    const splittedFilePath = file.split('/')
    const destination = `${destinationFolder}/${splittedFilePath[splittedFilePath.length-1]}`
    await fs.copyFileSync(file, destination)
  }
}

module.exports = { mergeFileNamesAndResults, returnMatchingFiles, copyFiles }