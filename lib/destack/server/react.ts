import express from 'express'
import cors from 'cors'

import { handleData } from './api/handle'

const app = express()
const port = 3000

app.use(cors({ credentials: true, origin: true }))

app.get('/ping', (_, res) => {
  res.send('pong!')
})

app.all('/api/builder/handle', cors(), (req, res) => {
  return handleData(req, res)
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
