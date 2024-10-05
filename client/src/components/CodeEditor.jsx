import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'

function CodeEditor ({ socketRef, syncCode, roomId}) {

  const languageUsed = useSelector(store=>store.code.language);

  const CodeRef = useRef(null)
  const [codeVal, setCode] = useState('')

  const handleOnChange = event => {
    setCode(event)
    syncCode(event)
    socketRef.current.emit('CODE-CHANGE', { roomId, code: event })
  }
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('CODE-CHANGE', ({ code }) => {
        if (code !== null) {
          setCode(code)
        }
      })
      return () => {
        socketRef.current.off('CODE_CHANGE')
      }
    }
  }, [socketRef.current])

  return (
    <Editor
      height='100vh'
      language={languageUsed}
      value={codeVal}
      theme={'vs-dark'}
      onChange={handleOnChange}
    />
  )
}

export default CodeEditor
