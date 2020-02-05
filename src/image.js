const jimp = require('jimp')

const minifyImage = async (file, writePath) => {
  const splittedFilePath = file.split('/')
  const image = await jimp.read(file)
  await image.resize(200, jimp.AUTO).quality(50).writeAsync(`${writePath}/${splittedFilePath[splittedFilePath.length - 1]}`)
}

module.exports = { minifyImage }