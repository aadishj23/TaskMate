import React from 'react'
import Form from './components/form'
import { RecoilRoot } from 'recoil'
import Signin from './components/signin'
import Signup from './components/signup'
import ErrorPage from './components/ErrorPage'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

function App() {
  
  const router=createBrowserRouter([
    {
      path:"/",
      element:
        <RecoilRoot>
          <Form/>
        </RecoilRoot>
    },{
      path: "/signin",
      element:
        <RecoilRoot>
          <Signin/>
        </RecoilRoot>
    },
    {
      path: "/signup",
      element:
        <RecoilRoot>
          <Signup/>
        </RecoilRoot>
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
