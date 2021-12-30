import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    console.log(`${user.name} logged out`)
  }

  const handleNewBlog = (blogObject) => {
    try{
      blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setErrorMessage(`${blogObject.title} by ${blogObject.author} added `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
  } catch(exception) {
    setErrorMessage('Adding blog failed')
    setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
  }

}

const loginForm = () => (
  <Togglable buttonLabel="log in">
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleLogin={handleLogin}
    />
  </Togglable>
)

const blogForm = () => (
  <Togglable buttonLabel="New blog">
    <BlogForm createBlog={handleNewBlog} />
  </Togglable>
)

const blogUpdate =  (id) => {
  const blog = blogs.find(b => b.id === id)
  const likedBlog = {...blog, likes:blog.likes + 1}

  blogService
    .update(id, likedBlog)
    .then(returnedBlog => {
      console.log(returnedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? {...blog, likes:returnedBlog.likes} : blog ))
    })

}
    return(
      <div>
      <h2>Blog-app</h2>
      <Notification message={errorMessage}/>

      {user === null ?
        loginForm():
        <div>
          <p>{user.name} logged in! <button onClick={handleLogout}>Logout</button></p>
          {blogForm()}
        </div>
      }
      <br/>
      {blogs
        .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <Blog 
            key={blog.id}
            blog={blog} 
            handleLike={() => blogUpdate(blog.id)}
            />
      )}
      </div>
    )
}
export default App