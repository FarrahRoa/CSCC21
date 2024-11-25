import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from "axios"
import { toast } from 'react-toastify'
import loginImg from "../assets/Login.png"

const Login = ({setToken}) => {
    const [email, setEmail] = useState('')    
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault()
            const response = await axios.post(backendUrl + '/api/user/admin',{email,password})
            // console.log(response)
            if(response.data.success){
               setToken(response.data.token)
            }else{
               toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
    {/* Container */}
    <div className="flex h-full w-full">
  
      {/* Form Side */}
      <div className="flex w-full sm:w-1/2 items-center justify-center">
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800">
          <div className="w-full mb-4">
            <h3 className="bold-36">Admin Panel</h3>
          </div>          
          <div className="w-full">
            <label htmlFor="email" className="medium-15">Email</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              placeholder="Email"
              required
            />
          </div>
  
          <div className="w-full">
            <label htmlFor="password" className="medium-15">Password</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="w-full px-3 py-1.5 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="btn-dark w-full mt-5 !py-[9px]">Login</button>
          
        </form>
      </div>
  
      {/* Image Side */}
      <div className="w-1/2 hidden sm:block">
        <img src={loginImg} alt="Login Illustration" className="object-cover h-full w-full" />
      </div>
    </div>
  </section>
  )
}

export default Login