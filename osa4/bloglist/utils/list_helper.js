const _ = require('lodash')

const dummy = (blogs) => {
        return 1
}

const totalLikes = (blogs) => { 
    return blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, cur) => {
        return prev.likes > cur.likes ? prev : cur
    }, 0)
}
const mostBlogs = (blogs) => {
    if (blogs.length===0) {
        return null
    }
    const result = _.countBy(blogs, 'author')
    const mostIndex = _.indexOf(Object.values(result), _.maxBy(Object.values(result)))
    const returnObject = {
        author : Object.keys(result)[mostIndex],
        blogs : Object.values(result)[mostIndex]
    }

    return returnObject
   
}

const mostLikes = (blogs) => {
    if (blogs.length===0) {
        return null
    }

    const groupedResult = Array.from(_(blogs)
    .groupBy('author'))
    .map(x => ({
      author: x[0].author,
      likes: _.sumBy(x, x => x.likes)
    }))
    
    const mostLikesIndex = _.indexOf(
        groupedResult.map( x => x.likes), _.max(groupedResult.map( x => x.likes))
    )

    const returnObject = {
        author : groupedResult[mostLikesIndex].author,
        likes : groupedResult[mostLikesIndex].likes
    }

    return returnObject
}


  module.exports = {
      dummy, totalLikes,favoriteBlog, mostBlogs, mostLikes
     }