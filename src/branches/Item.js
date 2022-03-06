import axios from 'axios'

import './Item.css'

function Item({ item, setList, list }) {
  function clickLove() {
    axios({
      method: "GET",
      url: `https://api.book.deuruwa.xyz/${item.no}/love`
    })
    .then(({ data }) => {
      if (data.success) {
        //과거의 나에게 도움받은 곳
        let newList = list
        newList.find(o => o.no === item.no).love = data.love
        setList([...newList])
      }
    })

  }

  return (
    <div className='Item'>
      <div className='no'>{item.no}</div>
      <div className='name'>{item.name}</div>
      <div className='text'>{item.text}</div>
      <div className='date'>{item.date}</div>
      <div className='love-button'>
        <button className='love-button' onClick={clickLove}>♥</button>
      </div>
      <div className='love'>{item.love}</div>
    </div>
  )
}

export default Item
