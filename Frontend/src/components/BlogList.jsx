import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import '../App.css';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get('http://localhost:4000/posts');
            setPosts(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPosts();
      }, []);

  return (
    <div>
        <h1>Posts</h1>

        <div className='blog_list'>
            <input
                type="text"
                placeholder="Enter keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Link to={`/posts/${searchQuery}`}><button>Search</button></Link>
        </div>

        <div className='blog_list'>
            {posts.map((post) => (
                <Link style={{ textDecoration: 'none' }} key={post._id} to={/posts/ + post._id}><BlogCard blogData={post} /></Link>
            ))}
        </div>

    </div>
  )
}

export default BlogList