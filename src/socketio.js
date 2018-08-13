const socketio = require('@feathersjs/socketio')

module.exports = app => {
  app.configure(
    socketio(io => {
      io.on('connection', socket => {
        // console.log('Connected to socketio')
        socket.on('newChannel', async (name, desc) => {
          const channel = await app.service('channel').create({
            name: name,
            description: desc
          })
          socket.emit(
            'channelCreated',
            channel.name,
            channel.description,
            channel._id
          )
          // console.log(
          //   'new channel created! Name: ' + name + ' Description: ' + desc
          // )
        })
        socket.on(
          'newMessage',
          async (
            message,
            userId,
            channelId,
            userName,
            userAvatar,
            avatarColor
          ) => {
            await app.service('message').create({
              messageBody: message,
              userId: userId,
              channelId: channelId,
              userName: userName,
              userAvatar: userAvatar,
              userAvatarColor: avatarColor
            })
          }
        )
      })
    })
  )
}
