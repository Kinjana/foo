import express from 'express'
import fs from 'fs'
import readline from 'readline'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import helmet from 'helmet'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('combined')) // Logs all requests
app.use(helmet())


app.use(express.static(path.join(__dirname)))  


app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/append', async (req, res) => {
  const listId = req.body.listId
  const line = req.body.line

  const textToAppend = `${line}\n`

  fs.appendFile(`./data/${listId}`, textToAppend, (err) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Error appending to file')
    }

    res.send('Data appended successfully')
  })
})

app.get('/canList', async (req, res) => {
  const data = await readLines('./data/canList')
  res.json(data)

})

app.get('/cantList', async (req, res) => {
  readLines('./data/cantList')
    .then(data => {
      const jsonString = JSON.stringify(data)
      res.json(jsonString)
    })
    .catch(err => {
      console.error('Error reading file:', err)
    })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

async function readLines(filePath) {
  const fileStream = fs.createReadStream(filePath)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })

  const lines = []

  for await (const line of rl) {
    lines.push(line)
  }
  console.log(`lines[3]=${lines[3]}`)
  fileStream.close()
  rl.close()
  return lines
}
