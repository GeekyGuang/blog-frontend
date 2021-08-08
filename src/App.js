import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blog, setBlog] = useState({
    'title': '',
    'author': '',
    'url': ''
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      username:
      <input
        type='text'
        value={username}
        name='username'
        onChange={({ target }) => setUsername(target.value)} />
      password:
      <input
        type='password'
        value={password}
        name='password'
        onChange={(event) => setPassword(event.target.value)} />
      <button type='submit'>login</button>
    </form>
  )

  const createForm = () => (
    <>
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
    </>
  )

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
    } catch (error) {
      console.log(error)
    }

    setBlog({
      'title': '',
      'author': '',
      'url': ''
    })
  }

  return (
    <div>
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {createForm()}
        </div>
      }
      <hr />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App