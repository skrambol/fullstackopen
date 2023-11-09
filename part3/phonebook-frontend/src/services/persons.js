import axios from "axios"

const baseUrl = "https://fullstackopen-part3-backend-6fsc.onrender.com/api/persons"

const getAll = () => {
  const request = axios.get(`${baseUrl}`)

  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(`${baseUrl}`, newPerson)

  return request.then(response => response.data)
}

const remove = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`)

  return request.then(response => response.data)
}

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person)

  return request.then(response => response.data)
}


export default {
  getAll,
  create,
  remove,
  update
}
