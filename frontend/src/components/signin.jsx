import { useRecoilState, useSetRecoilState } from 'recoil'
import { signin } from '../store/atoms/signin'
import { loggedin } from '../store/atoms/loggedin'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

function Signin() {
    const [signInData, setSignInData] = useRecoilState(signin)
    const setLoggedIn = useSetRecoilState(loggedin)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function handleChangeSignIn(event) {
        const { name, value } = event.target
        setSignInData(prevSignInData => ({
            ...prevSignInData,
            [name]: value
        }))
    }

    async function handleSubmitSignIn(event) {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios({
                url: `${import.meta.env.VITE_BACKEND_URL}/signin`,
                method: "POST",
                data: JSON.stringify({
                    email: signInData.Name,
                    password: signInData.Password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            localStorage.setItem('token', JSON.stringify(response.data.token))
            localStorage.setItem('name', JSON.stringify(response.data.name))
            setLoggedIn(true)
            navigate('/')
        } catch (error) {
            console.error(error)
            setError('Invalid Credentials')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your TaskMate account</p>
                </div>

                {/* Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                    <form onSubmit={handleSubmitSignIn} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email-phone"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Email or Phone
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="email-phone"
                                    placeholder="Enter your email or phone"
                                    name="Name"
                                    value={signInData.Name}
                                    onChange={handleChangeSignIn}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="pswd"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="pswd"
                                    placeholder="Enter your password"
                                    name="Password"
                                    value={signInData.Password}
                                    onChange={handleChangeSignIn}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                <p className="text-red-700 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                            }`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-6 w-6 mr-3 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 16a4 4 0 010-8V4a8 8 0 100 16v-4z"
                                        ></path>
                                    </svg>
                                    Signing In...
                                </div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">Don't have an account?</p>
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                        >
                            Create one here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
