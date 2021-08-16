import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
  const [_blog, setBlog] = useState(blog)
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')
  const showStyle = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
      setButtonLabel('view')
    } else {
      setButtonLabel('hide')
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLikes = async () => {
    const newBlog = { ..._blog, likes: _blog.likes + 1 }
    try {
      await blogService.update(newBlog, blog.id)
      setBlog(newBlog)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
        {_blog.title} {_blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showStyle}>
        <div>{_blog.url}</div>
        <div>
          likes {_blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <div>{_blog.author}</div>
        <button onClick={() => removeBlog(_blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog
