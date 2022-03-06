import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import axios from 'axios'
import Item from './Item'

import './List.css'

function List({ lastTextNumber, setLastTextNumber }) {
  const [ searchParams ] = useSearchParams()
  const [ list, setList ] = useState([])

  const page = Number(searchParams.get('page') ?? 1)  

  useEffect(() => {
    axios({
    method: "GET",
    url: `https://api.book.deuruwa.xyz?page=${page}`,
    })
    .then(({ data }) => {      
      if (data.success) {
        setList(data.list)        
        setLastTextNumber(data.list[0]?.no)        
      }
    })
  }, [ page, lastTextNumber, setLastTextNumber ])

  return (
    <div className='List'>
      {list.map((o) => {
        return (<Item item={o} list={list} setList={setList} key={o.no}/>)
      })}
    </div>
  )
}

export default List
