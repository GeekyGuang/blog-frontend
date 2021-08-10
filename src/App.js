import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification, style } from './components/Notification'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      )
    }
  }, [])

  const showMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      const blogs = await blogService.getAll()
      style.color = 'green'
      showMessage(`${user.username} has just logged in`)
      setBlogs(blogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      style.color = 'red'
      showMessage('Wrong username or password')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <p>
        username:
        <input
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)} />
      </p>
      <p>
        password:
        <input
          type='password'
          value={password}
          name='password'
          onChange={(event) => setPassword(event.target.value)} />
      </p>
      <button type='submit'>login</button>
    </form>
  )

  const createForm = () => (
    <Toggable buttonValue={'create blog'}>
      <BlogForm blogService={blogService} blogs={blogs} setBlogs={setBlogs} showMessage={showMessage} />
    </Toggable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedappUser')
    setUser(null)
    setBlogs([])
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm('do your wanna delete this blog?')) {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(item => item.id !== blog.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {message !== '' && <Notification message={message} />}
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          {createForm()}
        </div>
      }
      <hr />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App