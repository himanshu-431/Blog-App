import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import PostDescription from './components/PostDescription';
import SearchPosts from './pages/SearchPosts'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='posts/:postId' element={<PostDescription />} />
        {/* <Route path='posts/:word' element={<SearchPosts />} /> */}
      </Routes>
    </div>
  )
}

export default App