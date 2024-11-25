import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; ``
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  const url = "http://localhost:4000";

  useEffect(()=>{
    localStorage.setItem('token',token)
    },[token])

  return (
    <>
    <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <ToastContainer />
          <div className="bg-primary text-[#404040]">
            <Header/>
            <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-8 sm:mt-4">
              <Sidebar  token={token} setToken={setToken}/>
              <Routes>
                <Route path="/" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
