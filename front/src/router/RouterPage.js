import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import {BrowserRouter as Router, Routes, Route, Await} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Index from '../pages/Index/Index'
import Login from '../pages/Login/Login'

export default function RouterPage() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}
