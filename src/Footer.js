import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import axios from 'axios'

import './Footer.css'

function Footer() {
  const [ prePage, setPrePage ] = useState(1)
  const [ nextPage, setNextPage ] = useState(1)
  const [ lastPage, setLastPage ] = useState(1)
  const [ pageList, setPageList ] = useState([])

  const [ searchParams ] = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? 1)

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.book.deuruwa.xyz`
    })
    .then(({ data }) => {
      const cnt = data.cnt

      const lastPageNo = Math.ceil(cnt / 5) 

      const startPageNo = Math.floor((currentPage - 0.5) / 5) * 5 + 1

      if ((currentPage - 1) < 1) {
        setPrePage(1)
      } else {        
        setPrePage(currentPage - 1)
      }

      const endPageNo = Math.min(startPageNo + 4, lastPageNo)  

      if ((currentPage + 1) > lastPageNo) {
        setNextPage(lastPageNo)
      } else {
        setNextPage(currentPage + 1)
      }

      setLastPage(lastPageNo)     
      
      let newPageList = []

      for (let i = startPageNo; i <= endPageNo; i++) {
        newPageList.push(i)
      }
      
      setPageList([...newPageList])
    })
  }, [ currentPage ])

  return (
    <div className='Footer'>
      <Link to={`/?page=1`} className="first-page">⩽</Link>  
      <Link to={`/?page=${prePage}`} className="pre-page">〈</Link>
      {pageList.map((o) => {
        return (<Link to={`/?page=${o}`} key={o}>{o}</Link>)
      })}   
      <Link to={`/?page=${nextPage}`} className="next-page">〉</Link>
      <Link to={`/?page=${lastPage}`} className="last-page">⩾</Link>
    </div>
  )
}

export default Footer
