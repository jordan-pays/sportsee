import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import Error from '../screens/Error';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='home/:id' element={<Home />} />
                <Route path='/error/:code_error' element={<Error />} />
                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}
