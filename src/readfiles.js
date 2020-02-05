const fs = require('fs')
const { minifyImage } = require('./image')

const readFiles = async (dir) => {
  let encodings = []
  const filenames = await fs.readdirSync(dir)

  for (let file of filenames) {
    console.log(`Adding ${dir}/${file}`)
    await minifyImage(`${dir}/${file}`, './minified')

    const data = await fs.readFileSync(`./minified/${file}`)
    const base64 = await data.toString('base64')
    encodings.push({ encoded: base64, filename: `${dir}/${file}` })
  }
  
  return encodings
}

const readJSON = async (file) => {
	const rawFile = await fs.readFileSync(file)
	return await JSON.parse(rawFile)
}

module.exports = {
	readFiles,
	readJSON
}