// const socketio = require('@feathersjs/socketio')

// module.exports = function(app) {
//   if (typeof app.channel !== 'function') {
//     // If no real-time functionality has been configured just return
//   }

//   // app.configure(
//   socketio(io => {
//     io.on('connection', socket => {
//       console.log('Connected to socketio')
//       socket.on('newChannel', (name, desc) => {
//         console.log(name + desc)
//       })
//     })
//   })
//   // )
// }
