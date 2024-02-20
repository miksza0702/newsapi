import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginPage from './components/LoginPage/LoginPage';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './helpers/firebaseConfig'
import UserPage from './components/UserPage/UserPage';
import SearchPage from './components/SearchPage/SearchPage';
import { authContext } from "./helpers/authContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if(user){
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <authContext.Provider value={loggedIn}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/register" element={<RegisterForm />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/user" element={<UserPage />}/>
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
