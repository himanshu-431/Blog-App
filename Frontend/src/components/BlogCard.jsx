import React from 'react'
// import TagsList from './TagsList'

const BlogCard = ({blogData}) => {

    const {image, title, tags} = blogData

  return (
    <div className='blog_card'>
        <img className='blog_image' src={image} alt="image" />
        <h4>{title}</h4>
        <p>Tags: {tags}</p>
        <div className='view_button'>
          <button className='view_style'>view</button>
        </div>
        
    </div>
  )
}

export default BlogCard