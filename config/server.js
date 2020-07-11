let port = process.env.PORT || 3000

const server = {}

server.start = (app) => {
  app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('------------------------------------------------------------')
      console.log('Express server listening on port ' + port)
      console.log('------------------------------------------------------------')
    }
  })
}

module.exports = server
