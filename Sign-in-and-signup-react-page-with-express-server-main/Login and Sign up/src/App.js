import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { createContext } from 'react';
import { useState } from 'react';
import Home from './pages/Home';

export const AuthContext = createContext();
function App() {
  const [jwt, setJWt] = useState(null)
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{
              auth: [jwt, setJWt],
            }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
