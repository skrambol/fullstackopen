import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ({title, author, url}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = `Bearer ${user.token}`
  const config = {
    headers: {
      Authorization: token,
    }
  }

  const response = await axios.post(baseUrl, {title, author, url}, config)
  return response.data
}

const like = async ({id, likes}) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = `Bearer ${user.token}`
  const config = {
    headers: {
      Authorization: token,
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, {likes: likes+1}, config)
  return response.data
}

export default { setToken, getAll, create, like }
