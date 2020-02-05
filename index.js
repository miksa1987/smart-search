#!/usr/bin/env node

const args = require('./src/args')
const { showThisMightTakeAWhile } = require('./src/misc')
const { readFiles, readJSON } = require('./src/readfiles')
const { tryDetection, setApiKey } = require('./src/detection')
const { mergeFileNamesAndResults, returnMatchingFiles, copyFiles } = require('./src/files')
const { handleError } = require('./src/error')

// Clarifai can only handle 128 pictures on one request
const MAX_NUMBER_OF_ITEMS = 128

const searchForPictures = async () => {

  try {
    args.checkLength()
    const [ origin, destination, keywords ] = args.get()

    showThisMightTakeAWhile()

    const config = await readJSON(`${process.env.HOME}/.config/smartsearch.json`)
    setApiKey(config.apiKey)

    const encodedFiles = await readFiles(origin)
    const detectionResults = await tryDetection(encodedFiles.map(encFile => encFile.encoded), MAX_NUMBER_OF_ITEMS)
    const filenames = encodedFiles.map(encodedfile => encodedfile.filename)
    const mergedResults = mergeFileNamesAndResults(filenames, detectionResults)
    
    const matchingFiles = returnMatchingFiles(keywords, mergedResults)

    console.log(`Copying found files to ${destination} ... `)
    await copyFiles(matchingFiles.map(file => file.filename), destination)
  } 
  catch (error) {
    handleError(error)
  }
}
  
searchForPictures()