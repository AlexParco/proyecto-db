import React, { useContext, useState } from "react";
import { loginService, registerService } from "../services/auth";
// import { profileService } from "../services/user";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(window.sessionStorage.getItem('token'))
  const [state, setState] = useState({ loading: false, error: false })

  const loginUser = ({ email, password }) => {
    setState({ loading: true, error: false })
    loginService({ email, password })
      .then(data => {
        window.sessionStorage.setItem('token', data.token)
        setUser(data.user)
        setToken(data.token)
        setState({ loading: false, error: false })
      })
      .catch(err => {
        setState({ loading: false, error: true })

      })
  }

  const logoutUser = () => {
    window.sessionStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={
        {
          token,
          user,
          loginUser,
          logoutUser,
          state,
          isLogged: Boolean(token)
        }} >
      {children}
    </AuthContext.Provider >
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
