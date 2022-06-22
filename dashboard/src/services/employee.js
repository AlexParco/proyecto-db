const API_URL = 'http://localhost:9997/api/v1/employee'

export const fromApiResponse = apiResponse => {
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let emps = apiResponse.map(emp => {
    emp.hire_date = new Date(emp.hire_date).toLocaleDateString("en-US", options)
    return emp
  })

  return emps
}

export const getEmployees = (token) => {
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(res => res.json())
    .then(fromApiResponse)
}