import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import {BrowserRouter as Router, Routes, Route, Await} from 'react-router-dom'

import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Index from '../pages/Index/Index'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'

export default function RouterPage() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/:nickname" element={<Profile />} />
                </Routes>   
            </Router>
        </div>
    )
}
