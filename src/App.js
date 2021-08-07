import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = () => {
    const user = loginService.login({ username, password })
    console.log(user)
    setUser(user)
  }

  const logForm = () => (
    <form onSubmit={handleLogin}>
      username: <input type='text' name='username' onChange={({ target }) => setUsername(target.value)} />
      password: <input type='password' name='password' onChange={(event) => setPassword(event.target.value)} />
      <button type='submit'>submit</button>
    </form>
  )

  return (
    <div>
      {user === null && logForm()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App