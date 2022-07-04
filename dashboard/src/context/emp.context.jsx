import React, { useContext, useEffect, useState } from "react"
import { deleteEmpService, getEmpService, insertEmpService, updateEmpService } from "../services/employee"
import { useAuth } from "./auth.context"

export const EmpContext = React.createContext(null)

export const EmpProvider = ({ children }) => {
  const { token } = useAuth()
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    if (!token) return setEmployees([])
    getEmpService(token)
      .then(data => setEmployees(data))
      .catch(err => console.log(err))
  }, [token, setEmployees])

  const addEmployee = (employee) => {
    insertEmpService({ token, employee })
      .then(data => {
        setEmployees(data)
      })
      .catch(err => {
        console.log("error creating employee", err)
      })
  }

  const updateEmployee = (employee, id) => {
    updateEmpService({ token, employee, id })
      .then(data => {
        setEmployees(data)
      })
      .catch(err => {
        console.log("error creating employee", err)
      })
  }

  const delEmployee = (id) => {
    deleteEmpService({ token, id })
      .then(data => {
        setEmployees(data)
      })
      .catch(err => {
        throw new Error("error deleting employee")
      })
  }

  return (
    <EmpContext.Provider
      value=
      {{
        employees,
        addEmployee,
        delEmployee,
        updateEmployee
      }}>
      {children}
    </EmpContext.Provider>
  )
}

export const useEmployee = () => {
  return useContext(EmpContext)
}