import React, { useEffect, useReducer, useRef, useState } from 'react'
import SideBar from './SideBar'
import CodeEditor from './CodeEditor'
import { useParams, useNavigate, useMatch } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { initSocket } from '../Socket'
import MyChatBot from './ChatBot'
import Language from './Language'

function Editor () {
  const navigate = useNavigate()
  const roomID = useParams()
  const userName = useSelector(store => store.user.userId)
  const socketRef = useRef(null)
  const [members, setMembers] = useState([])
  const syncCodeRef = useRef(null)
  useEffect(() => {
    if (!userName) {
      navigate('/home')
      return
    }
  }, [])
  useEffect(() => {
    if (!userName) {
      navigate('/home')
      return
    }
    const init = async () => {
      const handleErrors = err => {
        console.log('Error', err)
        toast.error(`Socket connection failed, Try again later ${err}`)
        navigate('/home')
      }
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', err => handleErrors(err))
      socketRef.current.on('connect_failed', err => handleErrors(err))
      socketRef.current.emit('JOIN', {
        roomId: roomID.roomID,
        username: userName
      })

      socketRef.current.on('JOINED', ({ clients, username, socketId }) => {
        if (username !== userName) {
          toast.success(`${username} joined the room.`)
        }
        setMembers(clients)
        socketRef.current.emit('SYNC-CODE', {
          code: syncCodeRef.current,
          socketId
        })
      })

      socketRef.current.on('DISCONNECTED', ({ socketId, username }) => {
        toast.success(`${username} left the room`)
        setMembers(prev => {
          return prev.filter(client => client.socketId !== socketId)
        })
      })

      return () => {
        socketRef.current && socketRef.current.disconnect()
        socketRef.current.off('JOINED')
        socketRef.current.off('DISCONNECTED')
      }
    }
    init()
  }, [])

  return (
    <div
      style={{ padding: '0', margin: '0', height: '100vh', display: 'flex' }}
    >
      <Toaster />
      <div
        style={{
          padding: '0',
          margin: '0',
          width: '20vw',
          backgroundColor: 'rgb(33, 33, 33)'
        }}
      >
        <SideBar
          socketRef={socketRef}
          roomID={roomID.roomID}
          userId={userName}
          members={members}
        />
      </div>
      <div
        style={{
          padding: '0',
          margin: '0',
          width: '80vw',
          backgroundColor: 'rgb(33, 33, 33)'
        }}
      >
        <Language code={syncCodeRef} />
        <CodeEditor
          socketRef={socketRef}
          syncCode={code => (syncCodeRef.current = code)}
          roomId={roomID.roomID}
        />
        <MyChatBot />
      </div>
    </div>
  )
}

export default Editor
