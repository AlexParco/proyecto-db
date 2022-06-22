const API_URL = 'http://localhost:9997/api/v1/auth'

export const loginService = (credentials) => {
  return fetch(API_URL + '/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}

export const registerService = (credentials) => {
  return fetch(API_URL + '/register', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}