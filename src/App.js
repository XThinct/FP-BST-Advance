import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddNote from './components/AddNote';

function App() {
  return (
    <Router>
      <div className="bg-gray-800 p-6">
        <nav className="flex justify-between items-center mb-8 p-4 bg-gray-900 rounded-lg shadow-lg">
          <div className="text-3xl font-bold text-white">
            <Link to="/">Notes App</Link>
          </div>
          <div>
            <Link to="/" className="mr-4 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
              Home
            </Link>
            <Link to="/add" className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
              Add Note
            </Link>
          </div>
        </nav>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddNote />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
