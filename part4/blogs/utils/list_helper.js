const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  return blogs.reduce(
    (sum, current) => sum + current.likes,
    0
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  return blogs.reduce(
    (favorite, current) => {
      if (current.likes >= favorite.likes) {
        const {title, author, likes} = current

        return { title, author, likes }
      }

      return favorite
    },
    {likes: 0}
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
