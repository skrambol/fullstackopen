import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  }

  return config
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async ({ title, author, url }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = `Bearer ${user.token}`
  const config = {
    headers: {
      Authorization: token,
    }
  }

  const response = await axios.post(baseUrl, { title, author, url }, config)
  return response.data
}

const like = async ({ id, likes }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = `Bearer ${user.token}`
  const config = {
    headers: {
      Authorization: token,
    }
  }

  const response = await axios.put(`${baseUrl}/${id}`, { likes: likes+1 }, config)
  return response.data
}

const remove = async ({ id }) => {
  const config = getAuthHeaders()

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, like, remove }
