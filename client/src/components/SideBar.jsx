import React, { useState } from 'react'
import { FaCodeBranch } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import Avatar from 'react-avatar'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function SideBar ({ roomID, socketRef, members }) {
  const navigate = useNavigate()
  const handleCopyID = () => {
    navigator.clipboard
      .writeText(roomID)
      .then(() => {
        toast.success('Successfully Copied!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }
  const handleExit = () => {
    toast.promise(new Promise(resolve => setTimeout(resolve, 500)), {
      loading: 'Leaving the Room...',
      success: <b>Redirecting Now!</b>,
      error: <b>Could not save.</b>
    })
    setTimeout(() => {
      socketRef.current.disconnect()
      navigate('/home')
    }, 1200)
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px'
        }}
      >
        <FaCodeBranch color='yellow' />
        <h3 style={{ color: 'white', marginLeft: '3px' }}>CodeMate</h3>
      </div>
      <hr style={{ color: 'grey', margin: '2px' }} />
      <button
        type='button'
        className='btn'
        style={{ marginLeft: '10px', marginTop: '10px', padding: '0' }}
      >
        <span className='fw-light text-light'>Members Online</span>{' '}
        <span className='badge text-bg-success'>{members.length}</span>
      </button>

      <div
        style={{
          marginTop: '20px',
          overflowY: 'auto',
          height: '60vh'
        }}
        className='hide-scrollbar'
      >
        {members.map(item => (
          <div
            style={{
              margin: '20px',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center'
            }}
            key={item.socketId}
          >
            <Avatar name={item.username} size='40' round={true} />
            <span
              className='text-light'
              style={{
                marginLeft: '10px',
                maxWidth: '90px', // Adjust this based on your design
                whiteSpace: 'nowrap',
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {item.username}
            </span>
            <GoDotFill color='green' />
          </div>
        ))}
      </div>
      <button
        type='button'
        className='btn btn-warning btn-margin'
        onClick={handleCopyID}
      >
        Copy Room ID
      </button>
      <Toaster />
      <br />
      <button
        type='button'
        className='btn btn-danger btn-margin'
        onClick={handleExit}
      >
        Exit
      </button>
      <Toaster />
    </>
  )
}

export default SideBar
