import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col justify-center items-center text-center px-6">
            <div className="max-w-2xl mx-auto">
                {/* Error Icon */}
                <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>
                
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    Oops!
                </h1>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Something went wrong
                    </h2>
                    <p className="text-lg mb-4 text-gray-600 leading-relaxed">
                        The page you're looking for doesn't exist, or something unexpected happened.
                    </p>
                    <p className="text-lg mb-6 text-gray-600">
                        You'll be redirected to the home page in a few seconds.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                        >
                            Go to Home
                        </button>
                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                
                {/* Countdown */}
                <div className="text-gray-500 text-sm">
                    Redirecting in <span className="font-bold text-blue-600">5</span> seconds...
                </div>
            </div>
        </div>
    );
};

export default ErrorPage