import { Route, Routes } from 'react-router-dom'
import './App.css'
import RequireAuth from './components/requireauth'
import Sidebar from './components/sidebar'
import { AuthProvider } from './context/auth.context'
import { EmpProvider } from './context/emp.context'
import NotFound from './pages/404'
import Calendar from './pages/calendar'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Profile from './pages/profile'
import Register from './pages/register'

function App() {
  return (
    <AuthProvider>
      {/* <NavBar /> */}
      <Sidebar>
        <EmpProvider>
          <Routes>
            <Route path="/"
              element=
              {
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              } />
            <Route path="calendar" element={<Calendar />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
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
        </EmpProvider>
      </Sidebar>
    </AuthProvider >
  )
}

export default App