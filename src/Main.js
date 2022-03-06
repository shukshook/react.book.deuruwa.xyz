import { useState } from 'react'

import Write from './branches/Write'
import List from './branches/List'

import './Main.css'

function Main() {
  const [ lastTextNumber, setLastTextNumber ] = useState(0)

  return (
    <div className='Main'>
      <Write setLastTextNumber={setLastTextNumber}/>
      <List lastTextNumber={lastTextNumber} setLastTextNumber={setLastTextNumber}/>
    </div>
  )
}

export default Main