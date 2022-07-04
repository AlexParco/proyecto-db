import React, { useCallback, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginService, registerService } from "../services/auth"
import { profileService, updateService } from "../services/user";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: '', name: '', email: '' })
  const [token, setToken] = useState(() => window.sessionStorage.getItem('token'))
  const [state, setState] = useState({ loading: false, error: false })

  useEffect(() => {
    if (!token) return setUser({ id: '', name: '', email: '' })
    profileService(token)
      .then(data => setUser(data))
  }, [token, setUser])

  const loginUser = useCallback(({ email, password }) => {
    setState({ loading: true, error: false })
    loginService({ email, password })
      .then(data => {
        window.sessionStorage.setItem('token', data.token)
        setToken(data.token)
        setState({ loading: false, error: false })
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        setState({ loading: false, error: true })
      })
  }, [setToken])

  const registerUser = ({ name, email, password }) => {
    registerService({ name, email, password })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateUser = ({ name, email }) => {
    updateService(token, { name, email })
      .then(data => {
        setUser(data)
      })
      .catch(err => {
        console.log("Error updating user", err)
      })
  }

  const logoutUser = () => {
    window.sessionStorage.removeItem('token')
    setToken('')
    setUser('')
  }


  return (
    <AuthContext.Provider
      value=
      {{
        loginUser,
        logoutUser,
        registerUser,
        updateUser,
        token,
        user,
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
