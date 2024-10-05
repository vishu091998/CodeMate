require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const axios = require('axios')
const app = express()
const cors = require('cors');
const server = http.createServer(app)
app.use(cors());
app.use(express.json())
const io = new Server(server)

const userSocketMap = {}

const getAllConnectedClients = roomId => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    socketId => {
      return {
        socketId,
        username: userSocketMap[socketId]
      }
    }
  )
}
//connect to the front-end
io.on('connection', socket => {
  socket.on('JOIN', ({ username, roomId }) => {
    userSocketMap[socket.id] = username
    socket.join(roomId)
    const clients = getAllConnectedClients(roomId)
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit('JOINED', {
        clients,
        username,
        socketId: socket.id
      })
    })
  })

  // sync the code
  socket.on('CODE-CHANGE', ({ roomId, code }) => {
    socket.in(roomId).emit('CODE-CHANGE', { code })
  })
  // when new user join the room all the code which are there are also shows on that persons editor
  socket.on('SYNC-CODE', ({ socketId, code }) => {
    io.to(socketId).emit('CODE-CHANGE', { code })
  })
  //Disconnection of the frontEnd
  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    rooms.forEach(roomId => {
      socket.in(roomId).emit('DISCONNECTED', {
        socketId: socket.id,
        username: userSocketMap[socket.id]
      })
    })
    delete userSocketMap[socket.id]
    socket.leave()
  })
})
const languageConfig = {
  python3: { versionIndex: '3' },
  java: { versionIndex: '3' },
  cpp: { versionIndex: '4' },
  nodejs: { versionIndex: '3' },
  c: { versionIndex: '4' },
  ruby: { versionIndex: '3' },
  go: { versionIndex: '3' },
  scala: { versionIndex: '3' },
  bash: { versionIndex: '3' },
  sql: { versionIndex: '3' },
  pascal: { versionIndex: '2' },
  csharp: { versionIndex: '3' },
  php: { versionIndex: '3' },
  swift: { versionIndex: '3' },
  rust: { versionIndex: '3' },
  r: { versionIndex: '3' }
}

app.post('/compile', async (req, res) => {
  const { code, language } = req.body
  console.log("runnung",code,language)

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      language: language,
      versionIndex: languageConfig[language].versionIndex,
      clientId: process.env.jDoodle_clientId,
      clientSecret: process.env.kDoodle_clientSecret
    })

    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to compile code' })
  }
})

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
