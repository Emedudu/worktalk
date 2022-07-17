import React, { useContext } from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { NotificationContext } from '../../App';
import { createOrganization } from '../../_requests';

export default () => {
  const [notification,setNotification]=useContext(NotificationContext)
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [passCode,setPassCode]=useState('')
  const [file,setFile]=useState('')
  const create=(e)=>{
    e.preventDefault()
    createOrganization(localStorage.getItem('token'),name,description,passCode,file)
      .then((res)=>{
        console.log(res.data)
        setNotification([...notification,'Organization created successfully'])
      })
      .catch((err)=>{
        setNotification([...notification,'Unable to create organization'])
      })
    setName('')
    setDescription('')
    setPassCode('')
    setFile('')
  }
  const setFileFromInput=(e)=>{
    const fileForUpload=e.target.files[0]
    const reader  = new FileReader();
    reader.onload=(e)=>{
        const readFile=e.target.result
        readFile&&setFile(readFile)
    }
    reader.readAsDataURL(fileForUpload)   
  }
  return(
    <Popup trigger={
            <button type='button' 
              className='btn btn-primary mt-5' 
              > + New Organization
              </button>
            } 
            position="right center" 
            className='' >
      <div>
          <input
              onChange={(e)=>setName(e.target.value)}
              placeholder="What's the name"
              className='form-control'
              value={name}
              type='text'
          />
          <textarea
              onChange={(e)=>setDescription(e.target.value)}
              rows='3'
              value={description}
              placeholder='Describe this Organization'
              className='form-control'
          />
          <input
              onChange={(e)=>setPassCode(e.target.value)}
              placeholder='Enter a passcode'
              className='form-control'
              value={passCode}
              type='password'
          />
          <input 
            onChange={setFileFromInput}
            type='file'
            placeholder='Choose Image'
            className="form-control"
            accept="image/*"
          />
          <button 
          type='button' 
          className='btn btn-primary' 
          onClick={create}
          >
              CREATE
          </button>
      </div>
    </Popup>
  )
}
