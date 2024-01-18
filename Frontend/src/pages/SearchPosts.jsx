import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { useParams } from 'react-router-dom';

// (Endpoint) this Component search results based on keywords in title and description
const SearchPosts = () => {
  const [searchResults, setSearchResults] = useState([]);

  const { word } = useParams();
  console.log(word);

  useEffect(() => {
    const fetchPosts = async () => {
        try {
        const response = await axios.get(`http://localhost:4000/posts/search?keyword=${word}`); 
        setSearchResults(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    fetchPosts();
  }, [])

  return (
    <div className='blog_list'>   
        {searchResults.map((post) => (  
            <BlogCard key={post?._id} blogData={post} />
        ))}           
    </div>
  );
};

export default SearchPosts;
