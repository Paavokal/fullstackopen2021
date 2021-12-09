const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })
  
test('the first blog is testi', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('Testiotsikko')
  })

//ID

test('Blog identifier must be id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id.toBeDefined)
})


// POST TEST

test('blog can be added', async () => {
    const initialBlogs = await api.get('/api/blogs')

    const newBlog = {
        title: 'async/await simplifies making async calls4',
        author: 'Paavo',
        url: 'www.paavo.fi',
        likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const titles = response.body.map(x => x.title)
  
    expect(response.body).toHaveLength(initialBlogs.body.length + 1)
    expect(titles).toContain(
      'async/await simplifies making async calls'
    )
  })

  // likes undefined -> 0

  test('likes field null', async () => {
    const newBlog = {
        title: 'likes field is zero',
        author: 'Paavo',
        url: 'www.paavo.fi'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const likesAdded = response.body[response.body.length - 1].likes
  
    expect(likesAdded).toBe(0)

  })

// if url and title undefined -> bad request 400

    test('url and title undefined', async () => {

    const initialBlogs = await api.get('/api/blogs')

    const newBlog = {
        author: 'Paavo',
        likes : 3
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

      const blogsAtEnd = await api.get('/api/blogs')
      expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})
  
afterAll(() => {
  mongoose.connection.close()
})