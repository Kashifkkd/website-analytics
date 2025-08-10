import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  // Handle URL-based routing
  useEffect(() => {
    const path = location.pathname
    if (path === '/signup') {
      setIsLogin(false)
    } else if (path === '/login') {
      setIsLogin(true)
    }
  }, [location.pathname])

  const handleSwitchToSignup = () => {
    setIsLogin(false)
    navigate('/signup', { replace: true })
  }

  const handleSwitchToLogin = () => {
    setIsLogin(true)
    navigate('/login', { replace: true })
  }

  return (
    <>
      {isLogin ? (
        <Login onSwitchToSignup={handleSwitchToSignup} />
      ) : (
        <Signup onSwitchToLogin={handleSwitchToLogin} />
      )}
    </>
  )
}

export default AuthContainer 