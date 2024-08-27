import React from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { loggedin } from '../store/atoms/loggedin';
import { formdata } from '../store/atoms/formdata';
import { useNavigate } from 'react-router-dom';
import { logoutpopup } from '../store/atoms/logoutpopup';
import LogoutPopUp from './logoutpopup';

function Form() {
  const [formData, setFormData] = useRecoilState(formdata);
  const setLogPopUp = useSetRecoilState(logoutpopup);
  const [loading, setLoading] = useState(false);
  const isLoggedin = useRecoilValue(loggedin);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess("");
    
    try {
      const response = await fetch("http://localhost:5500/create", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let data = await response.json();
      setSuccess("To-Do added successfully!");
      setFormData({
        title: "", 
        description: "" 
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      {isLoggedin === false ? (
        <div className="absolute top-4 right-4 flex space-x-4">
          <button 
            onClick={() => navigate('/signin')} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </div>        
      ):(
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center p-2">
          <p className="text-lg font-semibold text-gray-800">
            Welcome, <span className="font-bold">{JSON.parse(localStorage.getItem('name') ?? '')}</span>
          </p>
          <button 
            onClick={() => setLogPopUp(true)}
            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
          > 
            Log Out
          </button>
        </div>       
      )}
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Add To-Do</h2>
        <label htmlFor='title' className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          type='text'
          id="title"
          placeholder='Enter Title'
          onChange={handleChange}
          name="title"
          value={formData.title}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        
        <label htmlFor='description' className="block text-sm font-medium text-gray-700 mt-4">Description</label>
        <textarea
          id="description"
          placeholder='Enter description'
          onChange={handleChange}
          name="description"
          value={formData.description}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        
        <button 
          type="submit" 
          className={`mt-6 px-4 py-2 text-white rounded-md ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add To-Do'}
        </button>
        
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </form>
      <LogoutPopUp />
    </div>
  );
}

export default Form;
