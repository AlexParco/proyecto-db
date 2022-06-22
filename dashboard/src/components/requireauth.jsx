import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth.context"

const RequireAuth = ({ children }) => {
  const { isLogged } = useAuth()
  if (!isLogged) {
    return <Navigate to='/login' />
  }

  return children
}

export default RequireAuth