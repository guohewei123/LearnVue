import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.fastmock.site/mock/d9704f45405ede090571be69fba77a2a/v1",
  timeout: 20000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then((response) => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
