import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

let config = {}

const setToken = newToken => {
  token = `bearer ${newToken}`

  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }