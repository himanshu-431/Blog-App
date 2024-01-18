import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const PostDescription = () => {
  const [post, setPost] = useState({});

  const {postId} = useParams();

  useEffect(() => {
      const fetchPostById = async () => {
  
        try {
          const response = await axios.get(`http://localhost:4000/posts/${postId}`);
          setPost(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchPostById();
  }, []);

  return (
    <div className='post_details'>
      <img className='description_image' src={post.image} alt="image" />
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <p>Tags: {post.tags}</p>
    </div>
  )
}

export default PostDescription