// Initializes the `channel` service on path `/channel`
const createService = require('feathers-mongoose')
const createModel = require('../../models/channel.model')
const hooks = require('./channel.hooks')

module.exports = function(app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/channel', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('channel')

  service.hooks(hooks)
}
