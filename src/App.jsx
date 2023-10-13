import {  } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserRoute from "./Routes/User";
import AdminRoute from "./Routes/Admin";
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProviderRoute from './Routes/Provider';

function App() {


  return (
    <BrowserRouter>

      <Routes>

        <Route path='/provider/*' element={<ProviderRoute/>}/>
        <Route path='/admin/*' element={<AdminRoute/>}/>
        <Route path='/*' element={<UserRoute />}/>

      </Routes>
      <ToastContainer
        // position="top-left"
        autoClose={1000}
        limit={1}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
    
  )
}

export default App
