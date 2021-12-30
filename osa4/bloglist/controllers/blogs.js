const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware")



blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {name:1, username:1} )

    response.json(blogs.map(blog => blog.toJSON()))
  })
  
blogsRouter.post('/', middleware.userExtractor, async(request, response) => {
    const body = request.body
    const user = request.user
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0,
        user: user._id
    })

    if (!body.title | !body.url){
        return response.status(400)
    }
    
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)

    // ei toiminut ilman {validateModifiedOnly: true }
    await user.save({validateModifiedOnly: true })

    const populatedBlog = await savedBlog.populate('user',{ username: 1, name:1 })


    response.status(200).json(populatedBlog.toJSON())
  })


  blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = request.user
    
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    if ( blog.user.toString() === user.id.toString() ){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

      
  })

  blogsRouter.put('/:id', async (request, response) => {

    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    if (updatedBlog){
        response.json(updatedBlog.toJSON())
        console.log(updatedBlog)
    } else {
        return response.status(404).end()
    }

  })

module.exports = blogsRouter