const API_URL = 'http://localhost:9997/api/v1/user'

export const profileService = ({ token }) => {
  return fetch(API_URL + '/profile', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      return data
    })
}