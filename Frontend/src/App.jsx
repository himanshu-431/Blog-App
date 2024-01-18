import React from 'react'
import { Routes, Route } from 'react-router-dom';
import BlogList from './components/BlogList';
import SearchPosts from './pages/SearchPosts'
import About from './components/About';
import PostDescription from './components/PostDescription';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/about' element={<About />} />
        {/* <Route path='posts/:word' element={<SearchPosts />} /> */}
        <Route path='posts/:postId' element={<PostDescription />} />
      </Routes>
    </div>
  )
}

export default App