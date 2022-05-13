import { Routes, Route } from "react-router-dom"; 
 import Navbar from "./components/Navbar";
 import HomePage from './pages/HomePage';     
 import SignUp from './pages/SignUp';
 import LogIn from './pages/LogIn';    
 import CreatePost from './pages/CreatePost';   
 import React, { useState, useContext } from 'react'
 import { AuthContext } from './context/auth.context' 
import './style.css'

function App() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext)
  return (<>
      <Navbar/>
      {isLoggedIn ? (<> <div className="logout-btn">
    <button  onClick={logoutUser}>Log out</button>
    </div> </>):(<></>)}
      <Routes>
        <Route exact path="/" element={<HomePage />} /> 
        <Route exact path="/LogIn" element={<LogIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/CreatePost" element={<CreatePost />} />  
      </Routes>
      </>
  )
}

export default App
