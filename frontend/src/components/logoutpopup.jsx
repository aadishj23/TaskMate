import { useRecoilState,useSetRecoilState } from "recoil";
import { logoutpopup } from "../store/atoms/logoutpopup";
import { loggedin } from '../store/atoms/loggedin';

function LogoutPopUp() {
  const [logPopUp, setLogPopUp] = useRecoilState(logoutpopup);
  const setLoggedIn = useSetRecoilState(loggedin);

  if (!logPopUp) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md mx-6 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 border border-white/20">
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Logout Confirmation</h3>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Are you sure you want to log out of your TaskMate account?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-100 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 font-semibold"
              onClick={() => {
                setLoggedIn(false);
                localStorage.removeItem('token')
                localStorage.removeItem('name')
                setLogPopUp(false);
              }}
            >
              Yes, Logout
            </button>
            <button
              className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105 font-semibold"
              onClick={() => setLogPopUp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPopUp;
