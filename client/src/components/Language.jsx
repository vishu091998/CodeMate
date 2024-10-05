import { current } from '@reduxjs/toolkit'
import React, { useState, useRef } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setLanguage } from '../store/codeSlice'
import axios from 'axios'
import CodeOutputPopup from './Popup'

function Language ({ code }) {
  const dispatch = useDispatch()
  const [lang, setLang] = useState('javascript')
  const [outputShow, setOutputShow] = useState(false)
  const outputRef = useRef(null)
  const options = [
    'javascript',
    'python3',
    'java',
    'cpp',
    'nodejs',
    'c',
    'ruby',
    'go',
    'scala',
    'bash',
    'sql',
    'pascal',
    'csharp',
    'php',
    'swift',
    'rust',
    'r'
  ]
  const defaultOption = options[0]

  const callApi = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post('http://localhost:8082/compile', {
          code: code.current,
          language: lang
        })
        console.log(response.data)
        outputRef.current = response.data // Store response data
        setTimeout(() => {
          setOutputShow(true)
        }, 300)
        resolve() // Resolve promise after setting output
      } catch (error) {
        console.error(error)
        reject(error) // Reject with the error
      }
    })
  }

  const executeApi = async () => {
    toast.promise(callApi(), {
      loading: 'Executing the Code...',
      success: <b>Success : Check Console</b>,
      error: <b>Error : Check Console</b>
    })
  }

  const handleShow = async () => {
    try {
      if (lang === 'javascript') {
        const result = eval(code.current) // Evaluate the JavaScript code
        toast.success('Success: Check console')
      } else {
        await executeApi()
      }
    } catch (error) {
      console.log(error)
      toast.error('Error: Check console')
    }
  }

  const onLangChange = event => {
    dispatch(setLanguage(event.value))
    setLang(event.value)
  }

  return (
    <div
      style={{
        height: '52px',
        paddingTop: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Dropdown
        controlClassName='dropdown'
        menuClassName='dropdown_menu'
        options={options}
        onChange={onLangChange}
        value={defaultOption}
        placeholder='Select an option'
      />
      <button
        className='btn btn-success btn-sm dropdown-btn'
        onClick={handleShow}
      >
        Execute
      </button>
      {outputShow && (
        <CodeOutputPopup outputRef={outputRef} setOutputShow={setOutputShow} />
      )}
      <Toaster />
    </div>
  )
}

export default Language
