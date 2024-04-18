import React, { useState } from 'react';
import axios from 'axios';

const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const userId = localStorage.getItem('userId');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('user', userId);
      formData.append('createdAt', formattedDate);
      const response = await axios.post('http://localhost:3000/blogs/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Blog added successfully:', response.data);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-purple-500 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">What is on your mind today ?</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-bold">Title</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} name="title" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-700 font-bold">Content</label>
            <textarea id="content" name="content" value={content} onChange={handleContentChange} rows="6" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:border-indigo-500"></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block text-gray-700 font-bold">Image</label>
            <input type="file" id="image" name="image" onChange={handleImageChange} className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
          </div>
          <button type="submit" className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;
