import express from 'express'
import APIRouter from './../routers/api.js'
import { configuration } from './configuration.js'

const app = express()

// Add body parser.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set view engine.
app.set('view engine', 'ejs')

// Set static files.
app.use(express.static('public'))

// Set routers.
app.use('/api', APIRouter)

// Set routes.
app.get('/', (req, res) => {
  res.render('pages/index', { query: req.query, config: configuration })
})

// Start server.
app.listen(3000, () => {
  console.log('Server is running on port 3000.')
})
