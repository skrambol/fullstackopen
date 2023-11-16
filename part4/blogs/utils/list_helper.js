const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;

  return blogs.reduce((sum, current) => sum + current.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  return blogs.reduce(
    (favorite, current) => {
      if (current.likes >= favorite.likes) {
        const { title, author, likes } = current;

        return { title, author, likes };
      }

      return favorite;
    },
    { likes: 0 },
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  const result = _.chain(blogs)
    .groupBy("author")
    .map((e) => {
      return { author: e[0].author, blogs: e.length };
    })
    .orderBy("blogs", "desc")
    .first()
    .value();

  return result;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  const result = _.chain(blogs)
    .groupBy("author")
    .map((e) => {
      return {
        author: e[0].author,
        likes: _.reduce(e, (acc, current) => acc + current.likes, 0),
      };
    })
    .orderBy("likes", "desc")
    .first()
    .value();

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
