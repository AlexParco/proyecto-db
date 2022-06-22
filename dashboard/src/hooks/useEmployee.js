import { useEffect, useState } from "react"
import { getEmployees } from "../services/employee"

const useEmployee = (token) => {
  const [employees, setEmployees] = useState([])
  useEffect(() => {
    getEmployees(token)
      .then(data => setEmployees(data))
  }, [setEmployees])

  return {
    employees,
    setEmployees,
  }
}



export default useEmployee