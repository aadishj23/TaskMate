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
            url : "http://localhost:5500/view",
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
        const response = await axios({
          url : `http://localhost:5500/updatestatus/${id}`,
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        const updatedTodo = response.data.data;
        setData((prevData) => prevData.map((todo) => {
          if(todo._id === updatedTodo._id){
            return updatedTodo
          }
          return todo
        }))
      } catch (error) {
        console.log("Failed to update data")
      }
    }

    const handleEdit = async (id) => {
      try{
        const response = await axios({
          url : `http://localhost:5500/updatedata/${id}`,
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        const updatedTodo = response.data.data;
        setData((prevData) => prevData.map((todo) => {
          if(todo._id === updatedTodo._id){
            return updatedTodo
          }
          return todo
        }))
      } catch (error) {
        console.log("Failed to update data")
      }
    }

    const handleDelete = async (id) => {
      try{
        const response = await axios({
          url : `http://localhost:5500/delete/${id}`,
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        })
        const deletedTodo = response.data.data;
        setData((prevData) => prevData.filter((todo) => todo._id !== deletedTodo._id))
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
        onEdit={() => handleEdit(todosdata._id)}
        onDelete={() => handleDelete(todosdata._id)}
      />
    })

  return {todos,addTodo}
}
export default useTodos