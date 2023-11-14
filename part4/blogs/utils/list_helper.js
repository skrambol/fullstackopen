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

module.exports = {
  dummy,
  totalLikes
}
