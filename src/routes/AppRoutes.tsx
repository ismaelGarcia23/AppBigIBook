import React from "react"
import { Routes, Route } from "react-router-dom"
import Dashboard from "../home/Dashboard"
import Catalogo from "../home/pages/Catalogo"
import { ToastContainer } from 'react-toastify';


const AppRoutes : React.FC = () => {
    return(
        <>
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route index element={<Catalogo />} />
                 
            </Route>
        </Routes>

        <ToastContainer />
      
        </>
    )
}
export default AppRoutes