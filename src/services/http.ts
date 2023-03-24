import express from 'express'
import session from 'express-session'
import { getAllSubmitions } from '../libs/getAllSubmitions.js'
import APIRouter from './../routers/api.js'
import { configuration } from './configuration.js'

const app = express()

// Add parsers.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Add session.
app.use(
  session({
    secret: configuration.secret
  })
)

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

app.get('/success', (req, res) => {
  res.render('pages/success', { config: configuration })
})

// View all submitions.
app.get('/view', (req, res) => {
  if (req.session.admin !== true) {
    return res.redirect('/signin')
  }

  const data = getAllSubmitions()
  res.render('pages/view', { data, config: configuration })
})

// Sign in.
app.get('/signin', (req, res) => {
  res.render('pages/signin', { query: req.query })
})

app.post('/signin', (req, res) => {
  if (req.body.password === configuration.password) {
    req.session.admin = true
    return res.redirect('/view')
  }

  res.redirect('/signin?error=1')
})

// Start server.
app.listen(3000, () => {
  console.log('Server is running on port 3000.')
})
