import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import Button from '../components/ui/button'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-8xl font-bold font-display text-primary/20"
            >
              404
            </motion.div>
            
            {/* Floating icons */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4"
            >
              <AlertTriangle className="w-8 h-8 text-primary/40" />
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-4 -left-4"
            >
              <Search className="w-6 h-6 text-primary/30" />
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold font-display mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-sm text-muted-foreground">
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleGoHome}
            className="flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-border"
        >
          <p className="text-xs text-muted-foreground mb-4">
            Available routes:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs text-primary hover:underline px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            >
              /dashboard
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-xs text-primary hover:underline px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            >
              /login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="text-xs text-primary hover:underline px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            >
              /signup
            </button>
            <button
              onClick={() => navigate('/home')}
              className="text-xs text-primary hover:underline px-2 py-1 rounded hover:bg-primary/10 transition-colors"
            >
              /home
            </button>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage 