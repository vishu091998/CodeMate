import React, { useState } from 'react'

const CodeOutputPopup = ({ setOutputShow, outputRef }) => {
  const closePopup = () => {
    setOutputShow(false)
  }

  return (
    <div>
      <div className='popup-overlay'>
        <div className='popup'>
         <div className='fs-close'>
          <span className='close-button' onClick={closePopup}>
            X
          </span>
          </div>
          <p className='text-center fw-light fs-3 ' style={{margin:'0'}}>Code Output</p>

          <div class='output-container'>
            <p>{outputRef.current.output}</p>
          </div>
          <div
            className='text-center fs-popup'
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <span style={{ color: 'green' }}>CPU Time:</span>
            <span style={{ color: 'red' }}>{outputRef.current.cpuTime}</span>
            <span style={{ color: 'green' }}>MEMORY:</span>
            <span style={{ color: 'red' }}>{outputRef.current.memory}</span>
            <span style={{ color: 'green' }}>STATUS:</span>
            <span style={{ color: 'red' }}>{outputRef.current.statusCode}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeOutputPopup

{
  /* <button className='popup-btn' onClick={closePopup}>Close</button> */
}
