const socketio = require('@feathersjs/socketio')

module.exports = app => {
  const typingUsers = {}
  app.configure(
    socketio(io => {
      io.on('connection', socket => {
        console.log('a user connected')
        // Listen for new channel
        socket.on('newChannel', async (name, desc) => {
          const channel = await app.service('channel').create({
            name: name,
            description: desc
          })
          io.emit(
            'channelCreated',
            channel.name,
            channel.description,
            channel._id
          )
          console.log('channel created')
        })

        // Listen for start typing
        socket.on('startType', (userName, channelId) => {
          typingUsers[userName] = channelId
          console.log(userName + ' is typing in ' + channelId)
          io.emit('userTypingUpdate', typingUsers, channelId)
        })

        // Listen for stop typing
        socket.on('stopType', (userName, channelId) => {
          delete typingUsers[userName]
          console.log(userName + ' stopped typing in ' + channelId)
          io.emit('userTypingUpdate', typingUsers)
        })

        // Listen for new message
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
            const msg = await app.service('message').create({
              messageBody: message,
              userId: userId,
              channelId: channelId,
              userName: userName,
              userAvatar: userAvatar,
              userAvatarColor: avatarColor
            })
            console.log(`${userName} sent a message`)
            io.emit(
              'messageCreated',
              msg.messageBody,
              msg.userId,
              msg.channelId,
              msg.userName,
              msg.userAvatar,
              msg.userAvatarColor,
              msg._id,
              msg.timeStamp
            )
          }
        )
      })
    })
  )
}
