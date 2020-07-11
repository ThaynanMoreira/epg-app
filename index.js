// Load environment vars and DB
require('dotenv').config()

// Import packages
const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const busboyBodyParser = require('./helpers/body-parser')
const logger = require('morgan')
const cors = require('cors')
const validator = require('express-validator')
const app = express()
const server = require('./config/server')
const versions = ['v1']

global._base = path.join(__dirname, '/')

// Middlewares
const logPath = path.join(__dirname, '/tmp/logs/', 'access.log')
require('fs-extra').ensureFileSync(logPath)
const accessLogStream = fs.createWriteStream(logPath, {flags: 'a'})
app.use(logger('common', {stream: accessLogStream}))
app.use(logger('dev'))
app.get('/template', (req, res) => {
  res.render(`${req.query.path}`)
})

app.use(busboyBodyParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  exposedHeaders: ['Content-Disposition']
}))
app.use(validator())
app.use(express.static('public'))

// Set global response headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

// Apply the routes for each version setted
versions.forEach((version) => {
  const versionRoutes = require('./modules/' + version + '/routes')
  app.use('/api/' + version, versionRoutes)
})

app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Start server
server.start(app)

module.exports = app
