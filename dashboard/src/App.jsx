import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar'
import RequireAuth from './components/requireauth'
import { AuthProvider } from './context/auth.context'
import NotFound from './pages/404'
import Calendar from './pages/calendar'
import Dashboard from './pages/dashboard'
import Employees from './pages/employees'
import Login from './pages/login'
import Profile from './pages/profile'

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="employees"
            element=
            {
              <RequireAuth>
                <Employees />
              </RequireAuth>
            }
          />
          <Route path="calendar" element={<Calendar />} />
          <Route path="login" element={<Login />} />
          <Route path="profile"
            element=
            {
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </AuthProvider>
    </>
  )
}

export default App
