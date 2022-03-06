import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import './Write.css'

function Write({ setLastTextNumber }) {
  const [ name, setName ] = useState("")
  const [ password, setPassword ] = useState("")
  const navigate = useNavigate()
  const textareaRef = useRef(null)

  //이름과 비번 입력시 상태를 변화시키게 해주는 함수
  function handleName(event) {
    setName(event.target.value)
  }

  function handlePassword(event) {
    setPassword(event.target.value)
  }

  //click하면 api 쏘는 함수
  function sendWrite() {
    const text = textareaRef.current.value
    
    axios({
      method: "POST",
      url: "https://api.book.deuruwa.xyz",
      data: {
        name,
        password,
        text
      }
    })
    .then(({ data }) => {
      if (data.success) {
        setName("")
        setPassword("")
        textareaRef.current.value = ""
        navigate('/')
        setLastTextNumber(data.insertId)        
      }      
    })
  }

  return (
    <div className='Write'>
      <div className='input'>
        <input className='name' type="text" value={name} onChange={handleName} placeholder="name"></input>
        <input className='password' type="password" value={password} onChange={handlePassword} placeholder="password"></input>
      </div>
      <textarea className='write' ref={textareaRef} placeholder="text here"></textarea>
      <div className='button'>
        <button className='writeButton' onClick={sendWrite}>Click!</button>
      </div>
    </div>
  )
}

export default Write