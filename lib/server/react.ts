import express, { Request } from 'express'
import cors from 'cors'

import { handleEditor } from './api/handle'
import { standaloneServerPort as port } from './config'
import { NextApiRequest, NextApiResponse } from 'next'

const app = express()

app.use(cors({ credentials: true, origin: true }))

app.get('/ping', (_, res) => {
  res.send('pong!')
})

app.all('/api/builder/handle', cors<Request>(), (req, res) => {
  return handleEditor(req as unknown as NextApiRequest, res as unknown as NextApiResponse)
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
