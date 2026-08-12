import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Register'
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
