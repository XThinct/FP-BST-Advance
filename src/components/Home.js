import React, { useState, useEffect } from 'react';

function Home() {
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes.reverse());
  }, []);

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, noteIndex) => noteIndex !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const startEditing = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
  };

  const saveEdit = () => {
    const updatedNotes = notes.map((note, index) =>
      index === editIndex ? { title: editTitle, content: editContent } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setIsEditing(false);
    setEditIndex(null);
    setEditTitle('');
    setEditContent('');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setEditTitle('');
    setEditContent('');
  };

  return (
    <div className='bg-white'>
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Your Notes</h1>
      {notes.length === 0 ? (
        <p className="text-center text-gray-600 p-4">No notes available. Start by adding one!</p>
      ) : (
        <ul className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <li 
              key={index} 
              className="bg-gray-300 p-6 rounded-lg shadow-lg relative w-full h-[250px] md:h-[300px] flex flex-col justify-between overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="overflow-auto mb-4">
                <h3 className="text-xl font-semibold text-black mb-2">{note.title}</h3>
                <p className="text-black">{note.content}</p>
              </div>
              <div className="absolute top-4 right-4 space-x-2">
                {/* Edit Button First */}
                <button
                  onClick={() => startEditing(index)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteNote(index)} 
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal/Section */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Note</h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit title"
            />
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit content"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={saveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
