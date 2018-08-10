// message-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const ObjectId = Schema.Types.ObjectId

  const message = new Schema({
    messageBody: { type: String, default: '' },
    timeStamp: { type: Date, default: Date.now },
    userId: { type: ObjectId, ref: 'User' },
    channelId: { type: ObjectId, ref: 'Channel' },
    userName: { type: String, default: '' },
    userAvatar: { type: String, default: '' },
    userAvatarColor: { type: String, default: '' }
  })

  return mongooseClient.model('message', message)
}
