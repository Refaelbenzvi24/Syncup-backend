const Server = require('./server/server')
const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))

const runningServer = new Server()

/**
 * Start the server at port 8000.
 */
runningServer.initializeServer(3000)

module.exports = runningServer