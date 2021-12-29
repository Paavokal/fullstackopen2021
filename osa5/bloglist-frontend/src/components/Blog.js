import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(
  <div>
     <div style={Object.assign(hideWhenVisible, blogStyle)}>
    <strong>{blog.title}</strong> | {blog.author} <button onClick={toggleVisibility}>show</button>
    </div>

    <div style={Object.assign(showWhenVisible, blogStyle)}>
    <strong>{blog.title}</strong> | {blog.author} <button onClick={toggleVisibility}>hide</button>
    <p>
    {blog.url}<br/>
    {blog.likes} <button>like</button><br/>
    {blog.user.name}<br/>
    </p>
    </div>
  </div>
  )}

export default Blog