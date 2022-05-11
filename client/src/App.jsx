import { useState } from 'react'
import { Routes, Route } from "react-router-dom"; 
 import Navbar from "./components/Navbar";
 import HomePage from './pages/HomePage';     
 import SignUp from './pages/SignUp';
 import LogIn from './pages/LogIn';    
 import Create from './pages/Create';    
import './style.css'

function App() {

  return (<>
      <Navbar/>

      <Routes>
         <Route exact path="/App" element={<HomePage />} /> 
        <Route exact path="/LogIn" element={<LogIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/Create" element={<Create />} />  
      </Routes>
      </>
  )
}

export default App
