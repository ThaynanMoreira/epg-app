const extend = require('extend')
const request = require('request')

const controllerActions = {}

// Controller custom actions
const customMethods = {
  getProgrammes: (req, res) => {
    try {
      var options = {
        method: 'GET',
        url: `${process.env.EPG_URL}${process.env.EPG_ID}`,
        qs: {date: req.query.date}
      }
      request(options, function (error, response, body) {
        if (error) throw new Error(error)

        let jsonBody = null
        try {
          jsonBody = JSON.parse(body)
        } catch (error) {
          console.log(error)
        }
        if (response.statusCode !== 200 || !jsonBody) {
          return res.status(500).json('EPG API is Down')
        }
        return res.status(200).json(jsonBody)
      })
    } catch (error) {
      res.status(500).json(JSON.stringify(error))
    }
  }
}

extend(controllerActions, customMethods)
module.exports = controllerActions
