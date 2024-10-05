import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { userActions } from '../store/userSlice'
import { TiCodeOutline } from 'react-icons/ti'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'bootstrap'

function Home () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')
  const [username, setUser] = useState('')
  const handleClick = () => {
    const newRoomId = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    setRoomId(newRoomId)
  }
  const errorChecker = () => {
    if (!roomId && !username) {
      toast.error('Please Enter RoomID and Username ')
      return false
    }

    if (!roomId) {
      toast.error('Please Enter RoomId')
      return false
    }

    if (!username) {
      toast.error('Please Enter Username')
      return false
    }

    return true;
  }
  const handleUserDispatch = () => {
    if (!errorChecker()) return;
    dispatch(userActions.setUser(username))
    navigate(`/editor/${roomId}`)
  }
  return (
    <>
      <div className='main-container'>
        <div className='card custom-body'>
          <h1 className='main-heading fw-normal text-secondary shadow p-3 mb-5 bg-body-tertiary rounded'>
            Welcome to CodeMate!
            <TiCodeOutline />
          </h1>
          <div className='card-body'>
            <label className='text-secondary'>Room ID</label>
            <div className='input-group mb-3'>
              <input
                type='text'
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className='form-control'
                aria-label='Sizing example input'
                aria-describedby='inputGroup-sizing-default'
              />
            </div>
            <label className='text-secondary'>Username</label>

            <div className='input-group mb-3'>
              <input
                value={username}
                onChange={e => setUser(e.target.value)}
                type='text'
                className='form-control'
                aria-label='Sizing example input'
                aria-describedby='inputGroup-sizing-default'
              />
            </div>
            <div className='d-grid gap-2 col-6 mx-auto'>
              <button className='btn btn-success' onClick={handleUserDispatch}>
                Join
              </button>
              <Toaster/>
            </div>
            <p className='text-center mt-2 fw-light'>
              Create a
              <span
                className='text-primary'
                style={{ cursor: 'pointer', marginLeft: '4px' }}
                onClick={handleClick}
              >
                Room ID
              </span>
            </p>
          </div>
        </div>
      </div>
      <p className='text-secondary fw-normal text-center no-pad-marg'>
        Powered by Vishal Yadav
      </p>
    </>
  )
}

export default Home
