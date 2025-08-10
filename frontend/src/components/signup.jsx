import { useRecoilState } from "recoil"
import { signup } from "../store/atoms/signup"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function Signup() {
    const [signUpData, setSignUpData] = useRecoilState(signup)
    const [isLoading, setIsLoading] = useState(false)
    const [err,setErr] = useState("")

    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setSignUpData(prevSignUpData => ({
            ...prevSignUpData,
            [name]: value
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if(signUpData.Password === signUpData.ConfirmPassword){
            setIsLoading(true)
            try {
                await axios({
                    url: `${import.meta.env.VITE_BACKEND_URL}/signup`,
                    method: "POST",
                    data: JSON.stringify({
                        name: signUpData.Name,
                        email: signUpData.Email,
                        phone: signUpData.Phone,
                        password: signUpData.Password,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                navigate('/signin')
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        } else {
            console.log("Password and Confirm Password doesn't match")
            setErr("Password and Confirm Password doesn't match")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Join TaskMate</h1>
                    <p className="text-gray-600">Create your account to get started</p>
                </div>

                {/* Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    name="Name"
                                    value={signUpData.Name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    name="Email"
                                    value={signUpData.Email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    placeholder="Enter your phone number"
                                    name="Phone"
                                    value={signUpData.Phone || ""}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
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
                                    id="password"
                                    placeholder="Create a strong password"
                                    name="Password"
                                    value={signUpData.Password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="cnfpswd"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    id="cnfpswd"
                                    placeholder="Confirm your password"
                                    name="ConfirmPassword"
                                    value={signUpData.ConfirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        {err && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                <p className="text-red-700 font-medium">{err}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                                isLoading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl'
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
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">Already have an account?</p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200"
                        >
                            Sign in here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
