import React from 'react'
import Tododata from '../components/tododata'
import { dataAtom } from '../store/atoms/data'
import { useRecoilState } from 'recoil'

function useTodos() {
    const [data,setData]=useRecoilState(dataAtom)
    React.useEffect(() => {
        fetch("http://localhost:5500/view")
            .then(async function(res){
                const json=await res.json()
                setData(json.data)
            })
    },[])
    const todos= data.map(todosdata => {
      return <Tododata key={todosdata._id} title={todosdata.title} description={todosdata.description} />
      }
    )
  return todos
}
export default useTodos