const users = require('./users/users.service.js')
const message = require('./message/message.service.js')
const channel = require('./channel/channel.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users)
  app.configure(message)
  app.configure(channel)
}
