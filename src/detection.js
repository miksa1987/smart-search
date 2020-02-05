const Clarifai = require('clarifai')

let apiKey = ''

const setApiKey = (key) => {
  apiKey = key
}

const tryDetection = async (filesdata, MAX_NUMBER_OF_ITEMS) => {
  const app = new Clarifai.App({
    apiKey
  })

  let splittedDatas = []

  if (filesdata.length > MAX_NUMBER_OF_ITEMS) {
    const arraysToBeMade = Math.max(filesdata.length / MAX_NUMBER_OF_ITEMS)

    for (let i = 0; i < arraysToBeMade; i++) {
      const slice = filesdata.slice(i * MAX_NUMBER_OF_ITEMS, (i + 1) * MAX_NUMBER_OF_ITEMS)
      splittedDatas.push(slice)
    }
  }
  else {
    splittedDatas = [ filesdata ]
  }

  const arrayOfPromises = splittedDatas.map(entry => app.models.predict(Clarifai.GENERAL_MODEL, entry))
  const resolvedPromises = await Promise.all(arrayOfPromises)

  let results = []
  resolvedPromises.forEach(entry => results.push(...entry.rawData.outputs))

  // I'll just ASSUME that this returned array is in the same order as the original....
  return { results }
}

module.exports = { tryDetection, setApiKey }