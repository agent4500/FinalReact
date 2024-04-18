import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { update } from "react-spring";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [editBlog, setEditBlog] = useState(null); // State to manage which blog is being edited
  const userId = localStorage.getItem("userId");
  const [searchInput, setSearchInput] = useState('');
  const location = useLocation(); // Access the location object


  useEffect(() => {
    fetchBlogs();
    fetchUser();
  }, []);



  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    if (query) {
      if (query === "favorite") {
        try {
          const response = axios.get(`http://localhost:3000/users/${userId}`);
          setUser(response.data);
          setBlogs(response.data.favorite);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        try {
          const response = axios.get(`http://localhost:3000/blogs/search/${query}`);
          setBlogs(response.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }
    } else {
      try {
        const response = axios.get("http://localhost:3000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  }, [location.search]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/blogs");
      setBlogs(response.data);
      console.log(response);
      console.log(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUser(response.data);
      console.log(userId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const openEditPopup = (blog) => {
    setEditBlog(blog);
  };

  const closeEditPopup = () => {
    setEditBlog(null);
  };

  const handleEditBlog = async (updatedBlogData) => {
    try {
  
console.log(updatedBlogData);
      const response = await axios.patch(`http://localhost:3000/blogs/${updatedBlogData._id}`, {title :updatedBlogData.title,content:updatedBlogData.content}, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
   
      closeEditPopup();
      fetchBlogs();
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };


  const Pdelete =async (e) => {
    await axios.delete(`http://localhost:3000/blogs/${e}`);
    fetchBlogs(); // Refresh the blogs after deletion
  
  }


  return (
  <div className="bg-gradient-to-br from-indigo-400 to-purple-500 min-h-screen p-4">
    <div className="max-w-100 mx-auto pb-32">
      <h1 className="text-3xl font-bold mb-4 text-white">Latest</h1>
      {Array.isArray(blogs) &&
        blogs.map((blog, index) => (
          <div
            key={blog._id}
            className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl mb-8"
          >
            <img
              src={`${blog.image}`}
              className="w-full h-64 object-cover object-center rounded-t-lg"
              alt={blog.title}
            />
            <div className="p-4">
              <h2 className="text-2xl text-gray-800 font-bold mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 text-base mb-4">{blog.content}</p>
              <p className="text-gray-500 text-sm">
                Published by {blog?.user?.name}
              </p>
              {userId === blog?.user?._id && ( // Show edit and delete buttons only if user._id matches blog.user
                <div className="pt-4 flex justify-between">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => openEditPopup(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => Pdelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            {/* Edit Popup */}
            {editBlog && editBlog._id === blog._id && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditBlog(editBlog);
                    }}
                  >
                    <label className="block mb-2">Title:</label>
                    <input
                      className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 mb-3"
                      type="text"
                      name="title"
                      value={editBlog.title}
                      onChange={(e) =>
                        setEditBlog({ ...editBlog, title: e.target.value })
                      }
                    />
                    <label className="block mb-2">Content:</label>
                    <textarea
                      className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3 mb-3"
                      name="content"
                      value={editBlog.content}
                      onChange={(e) =>
                        setEditBlog({ ...editBlog, content: e.target.value })
                      }
                    ></textarea>
                    <div className="flex justify-between">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        onClick={closeEditPopup}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  </div>
);
};

export default HomePage;
