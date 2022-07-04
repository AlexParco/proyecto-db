const API_URL = 'http://localhost:9997/api/v1/user/profile'

export const profileService = async (token) => {
  return await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}

export const updateService = (token, credentials) => {
  return fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(credentials)
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}
