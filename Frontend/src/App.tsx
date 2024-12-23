import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage.tsx';
import TvPage from './pages/TvPage/TvPage.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPage />} />
                <Route path="/tv" element={<TvPage />} />
            </Routes>
        </Router>
    );
};

export default App;
