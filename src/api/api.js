import axios from "axios"

const instance = axios.create({
  baseURL:'https://koshelevsad63.ru/api/'
  // baseURL:'http://localhost:5000/api/'
})

export default instance