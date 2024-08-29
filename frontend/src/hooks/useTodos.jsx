import React from 'react'
import Tododata from '../components/tododata'
import { dataAtom } from '../store/atoms/data'
import { useRecoilState} from 'recoil'
import axios from 'axios'

function useTodos() {
    const [data,setData]=useRecoilState(dataAtom)
    
    const fetchData = async () => {
        try{
          const response= await axios({
            url : "https://todoapp-cc2k.onrender.com/view",
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
            },
          })
          setData(response.data.data)
        } catch (error) {
          console.log("Failed to fetch data")
        }
    }
    
    React.useEffect(() => {
      fetchData()
    },[])

    const handleComplete = async (id) => {
      try{
        await axios({
          url : `https://todoapp-cc2k.onrender.com/updatestatus/${id}`,
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        await fetchData()
      } catch (error) {
        console.log("Failed to update data")
      }
    }

    const handleEdit = async (id,newTitle,newDescription) => {
      try{
        await axios({
          url : `https://todoapp-cc2k.onrender.com/updatedata/${id}`,
          method: "PUT",
          data: JSON.stringify({
            title: newTitle,
            description: newDescription
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        await fetchData()
        console.log("Data updated")
      } catch (error) {
        console.log("Failed to update data")
      }
    }

    const handleDelete = async (id) => {
      try{
        await axios({
          url : `https://todoapp-cc2k.onrender.com/delete/${id}`,
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        await fetchData()
      } catch (error) {
        console.log("Failed to delete data")
      }
    }

    const addTodo = (newTodo) => {
      setData((prevData) => [...prevData, newTodo]);
    };

    const todos= data.map(todosdata => {
      return <Tododata 
        key={todosdata._id} 
        title={todosdata.title} 
        description={todosdata.description} 
        timestamp={todosdata.created_at}
        status={todosdata.status}
        onComplete={() => handleComplete(todosdata._id)}
        onEdit={(newTitle,newDescription) => handleEdit(todosdata._id,newTitle,newDescription)}
        onDelete={() => handleDelete(todosdata._id)}
      />
    })

  return {todos,addTodo}
}
export default useTodos