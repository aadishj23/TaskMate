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
          url : `${import.meta.env.VITE_BACKEND_URL}/create`,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Navigation */}
      {isLoggedin === false ? (
        <div className="absolute top-6 right-6 flex space-x-4 z-10">
          <button 
            onClick={() => navigate('/signin')} 
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            title="Sign in to your account"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            title="Create a new account"
          >
            Sign Up
          </button>
        </div>        
      ) : (
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {JSON.parse(localStorage.getItem('name') ?? '')[0]?.toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="text-lg font-bold text-gray-800">
                {JSON.parse(localStorage.getItem('name') ?? '')}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setLogPopUp(true)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 font-medium"
            title="Log out of your account"
          > 
            Log Out
          </button>
        </div>       
      )}

      {/* Main Content */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
              TaskMate
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Organize your life, one task at a time. Simple, elegant, and powerful task management.
            </p>
          </div>

          {/* Add Task Form */}
          {isLoggedin && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-12 border border-white/20">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Task</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor='title' className="block text-sm font-semibold text-gray-700 mb-2">
                    Task Title
                  </label>
                  <input 
                    type='text'
                    id="title"
                    placeholder='What needs to be done?'
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor='description' className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder='Add more details about this task...'
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                    rows="3"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg resize-none"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={`w-full py-4 text-white rounded-xl flex items-center justify-center text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                      </svg>
                      Adding Task...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add Task
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <p className="text-green-700 font-medium">{success}</p>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Login Prompt for Non-Authenticated Users */}
          {!isLoggedin && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Started with TaskMate</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Sign in to your account or create a new one to start managing your tasks efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/signin')} 
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}

          {/* Tasks Grid */}
          {isLoggedin && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Your Tasks</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {todos}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <LogoutPopUp />
    </div>
  );
}

export default Form;