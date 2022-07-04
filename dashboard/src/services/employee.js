const API_URL = 'http://localhost:9997/api/v1/employee'

const fromApiResponse = apiResponse => {
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  let emps = apiResponse.map(emp => {
    emp.hire_date = new Date(emp.hire_date).toLocaleDateString("en-US", options)
    return emp
  })
  return emps
}

export const getEmpService = (token) => {
  return fetch(API_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(fromApiResponse)
}

export const insertEmpService = ({ token, employee }) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
    .then(fromApiResponse)
}

export const updateEmpService = ({ token, employee, id }) => {
  return fetch(API_URL + `/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
    .then(fromApiResponse)
}

export const deleteEmpService = ({ token, id }) => {
  return fetch(API_URL + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(fromApiResponse)
}