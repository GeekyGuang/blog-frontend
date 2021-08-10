import React, { useState } from 'react'

const CreateForm = ({ blogService, blogs, setBlogs, showMessage }) => {
  const [blog, setBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  })

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      console.log(error)
    }

    setBlog({
      'title': '',
      'author': '',
      'url': ''
    })
  }

  return (<>
    <h2>create new</h2>
    <form onSubmit={createBlog}>
      <p>
        title:
        <input
          type='text'
          value={blog.title}
          name='title'
          onChange={({ target }) => { setBlog({ ...blog, 'title': target.value }) }} />
      </p>
      <p>
        author:
        <input
          type='text'
          value={blog.author}
          name='author'
          onChange={({ target }) => { setBlog({ ...blog, 'author': target.value }) }} />
      </p>
      <p>
        url:
        <input
          type='text'
          value={blog.url}
          name='url'
          onChange={({ target }) => { setBlog({ ...blog, 'url': target.value }) }} />
      </p>
      <button type='submit'>create</button>
    </form>
  </>)
}

export default CreateForm