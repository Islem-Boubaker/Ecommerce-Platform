import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductCart from '../../Components/ProductCart';


function Dashboard() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductCart />} />
            </Routes>
        </Router>   
       
    )
}
export default Dashboard