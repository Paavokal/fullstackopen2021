const notesRouter = require('express').Router()
const Blog = require('../models/blog')


notesRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
notesRouter.post('/', async(request, response) => {

    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes | 0
    })

    if (!body.title | !body.url){
        return response.status(400)
    }
    
    const savedBlog = await blog.save()
    response.json(savedBlog.toJSON())
  })


  notesRouter.delete('/:id', async (request, response, next) => {
      try{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch(exception){
        next(exception)
      }
  })

  notesRouter.put('/:id', async (request, response) => {

    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    if (updatedBlog){
        response.json(updatedBlog)
    } else {
        return response.status(404).end()
    }

  })

module.exports = notesRouter