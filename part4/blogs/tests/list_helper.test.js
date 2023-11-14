const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const BLOGS = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

describe('totalLikes', () => {
  test("if blogs is empty, should return 0", () => {
    const result = listHelper.totalLikes([])

    expect(result).toBe(0)
  })

  test("if blog has only one element, should return the likes of that blog", () => {
    const result = listHelper.totalLikes([BLOGS[0]])

    expect(result).toBe(BLOGS[0].likes)
  })

  test("if blog has only more than one element, should return the sum of likes", () => {
    const result = listHelper.totalLikes(BLOGS)
    const sum = BLOGS[0].likes + BLOGS[1].likes + BLOGS[2].likes + BLOGS[3].likes + BLOGS[4].likes + BLOGS[5].likes

    expect(result).toBe(sum)
  })
})

describe('favoriteBlog', () => {
  test("if blogs is empty, should return {}", () => {
    const result = listHelper.favoriteBlog([])

    expect(result).toEqual({})
  })

  test("if blog has only one element, should return the blog", () => {
    const result = listHelper.favoriteBlog([BLOGS[0]])
    const {title, author, likes} = BLOGS[0]

    expect(result).toEqual({title, author, likes})
  })

  test("if blog has only more than one element, should return the sum of likes", () => {
    const result = listHelper.favoriteBlog(BLOGS)
    const {title, author, likes} = BLOGS[2]

    expect(result).toEqual({title, author, likes})
  })

  test("if more than one blog has most likes, should return the the latest one in the array", () => {
    const latestBlog = {
      "title": "My title",
      "author": "Author Johnson",
      "likes": 12,
    }
    const result = listHelper.favoriteBlog([ ...BLOGS, latestBlog ])

    expect(result).toEqual(latestBlog)
  })
})


describe('mostBlogs', () => {
  test("if blogs is empty, should return {}", () => {
    const result = listHelper.mostBlogs([])

    expect(result).toEqual({})
  })

  test("if blog has only one element, should return the blog", () => {
    const result = listHelper.mostBlogs([BLOGS[0]])
    const {author} = BLOGS[0]

    expect(result).toEqual({author, blogs: 1})
  })

  test("if blog has only more than one element, should return the author with most blogs", () => {
    const result = listHelper.mostBlogs(BLOGS)

    expect(result).toEqual({author: "Robert C. Martin", blogs: 3})
  })
})
