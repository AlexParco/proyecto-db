import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth.context"

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth()

  if (!isLogged) {
    return <Navigate to='/login' replace />
  }

  return children
}

export default RequireAuth