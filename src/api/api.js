import axios from "axios"

const instance = axios.create({
  baseURL:'https://koshelevsad63.ru/api/'
})

export default instance