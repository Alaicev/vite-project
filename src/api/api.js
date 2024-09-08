import axios from "axios"

const instance = axios.create({
  baseURL:'http://koshelevsad63.ru/api/'
})

export default instance