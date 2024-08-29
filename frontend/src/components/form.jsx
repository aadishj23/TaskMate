import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loggedin } from '../store/atoms/loggedin';
import { formdata } from '../store/atoms/formdata';
import { useNavigate } from 'react-router-dom';
import { logoutpopup } from '../store/atoms/logoutpopup';
import useTodos from '../hooks/useTodos';
import axios from 'axios';
import LogoutPopUp from './logoutpopup';

function Form() {
  const [formData, setFormData] = useRecoilState(formdata);
  const setLogPopUp = useSetRecoilState(logoutpopup);
  const [loading, setLoading] = useState(false);
  const isLoggedin = useRecoilValue(loggedin);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const {todos,addTodo} = useTodos();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if(isLoggedin){
      setLoading(true);
      setError(null);
      setSuccess("");
      try {
        const response = await axios({
          url : "https://todoapp-cc2k.onrender.com/create",
          method: "POST",
          data: JSON.stringify({
            title: formData.title,
            description: formData.description,
          }),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
          },
        });

        const newTodo = response.data.data;
        addTodo(newTodo);

        setSuccess("To-Do added successfully!");
        setFormData({
          title: "", 
          description: "" ,
        });
      } catch (error) {
        setError("Failed to add To-Do. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please Login First to add the Task");
    }
  }

  return (
    <div className=' bg-gray-100'>
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg ">
      {isLoggedin === false ? (
        <div className="absolute top-4 right-4 flex space-x-4">
          <button 
            onClick={() => navigate('/signin')} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            title="Sign in to your account"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            title="Create a new account"
          >
            Sign Up
          </button>
        </div>        
      ) : (
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center p-2">
          <p className="text-lg font-semibold text-gray-800">
            Welcome, <span className="font-bold">{JSON.parse(localStorage.getItem('name') ?? '')}</span>
          </p>
          <button 
            onClick={() => setLogPopUp(true)}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
            title="Log out of your account"
          > 
            Log Out
          </button>
        </div>       
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Add To-Do</h2>
        <div className="mb-4">
          <label htmlFor='title' className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type='text'
            id="title"
            placeholder='Enter Title'
            onChange={handleChange}
            name="title"
            value={formData.title}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor='description' className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder='Enter description'
            onChange={handleChange}
            name="description"
            value={formData.description}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button 
          type="submit" 
          className={`mt-6 w-full px-4 py-2 text-white rounded-md flex items-center justify-center ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 transition duration-200'}`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Adding...
            </>
          ) : 'Add To-Do'}
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
      </form>
    </div>
      {isLoggedin && (
        <div className="mt-12 lg:grid grid-cols-3">
          {todos}
        </div>
      )}
      <LogoutPopUp />
    </div>
  );
}

export default Form;