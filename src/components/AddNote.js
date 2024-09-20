import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  const saveNote = () => {
    if (title && content) {
      const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
      const newNote = { title, content };
      localStorage.setItem('notes', JSON.stringify([...existingNotes, newNote]));
      setTitle('');
      setContent('');
      navigate('/');
    } else {
      alert('Please add a title and content.');
    }
  };  

  return (
    <div className="mx-auto bg-gray-300 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Note</h2>
      <input
        type="text"
        placeholder="Title"
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg h-40 resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        onClick={saveNote}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full"
      >
        Save Note
      </button>
    </div>
  );
}

export default AddNote;
