import React, { useState } from 'react';

// Simple Book Icon for the header
const BookIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="48" 
    height="48" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default function App() {
  // 1. Manage State with React Hooks
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'S. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // 2. Implement Search Functionality
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Add Form Functionality
  const handleAddBook = () => {
    if (!newBook.title.trim() || !newBook.author.trim()) return;

    const bookEntry = {
      id: Date.now(), // Simple unique ID
      title: newBook.title,
      author: newBook.author
    };

    setBooks([...books, bookEntry]);
    setNewBook({ title: '', author: '' }); // Reset form
  };

  // 4. Enable Book Removal
  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10 flex flex-col items-center justify-center gap-3">
          {/* Optional Icon for visual flair */}
          {/* <div className="text-slate-800"><BookIcon /></div> */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Library Management<br />System
          </h1>
        </header>

        {/* Input & Search Section (Card 1) */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          
          {/* Search Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 transition-all"
            />
          </div>

          {/* Add Book Inputs */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              className="flex-1 px-4 py-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 transition-all"
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              className="flex-1 px-4 py-3 text-lg border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-slate-500 transition-all"
            />
            <button
              onClick={handleAddBook}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-6 py-3 rounded-md transition-colors duration-200 whitespace-nowrap"
            >
              Add Book
            </button>
          </div>
        </div>

        {/* Book List Section */}
        <div className="space-y-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div 
                key={book.id} 
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-md"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1 truncate">
                    {book.title}
                  </h3>
                  <p className="text-slate-600 text-lg truncate">
                    by {book.author}
                  </p>
                </div>
                
                <button
                  onClick={() => handleRemoveBook(book.id)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium text-lg px-6 py-2 rounded-md transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-500">
              <p className="text-xl">No books found.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}