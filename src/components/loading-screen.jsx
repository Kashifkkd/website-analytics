import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const LoadingScreen = ({ 
  message = "Loading...", 
  size = "default", 
  fullScreen = true,
  className,
  showMessage = true,
  variant = "spinner"
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  }

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    : "flex items-center justify-center p-8"

  const SpinnerLoader = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn(
        "border-2 border-primary border-t-transparent rounded-full",
        sizeClasses[size]
      )}
    />
  )

  const DotsLoader = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [-8, 8, -8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className={cn(
            "bg-primary rounded-full",
            size === "sm" ? "w-1.5 h-1.5" :
            size === "lg" ? "w-3 h-3" :
            size === "xl" ? "w-4 h-4" : "w-2 h-2"
          )}
        />
      ))}
    </div>
  )

  const PulseLoader = () => (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn(
        "bg-primary/20 border-2 border-primary rounded-full",
        sizeClasses[size]
      )}
    />
  )

  const WaveLoader = () => (
    <div className="flex space-x-1 items-end">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          animate={{
            scaleY: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className={cn(
            "bg-primary origin-bottom",
            size === "sm" ? "w-0.5 h-4" :
            size === "lg" ? "w-1.5 h-8" :
            size === "xl" ? "w-2 h-12" : "w-1 h-6"
          )}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader />
      case "pulse":
        return <PulseLoader />
      case "wave":
        return <WaveLoader />
      default:
        return <SpinnerLoader />
    }
  }

  return (
    <div className={cn(containerClasses, className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        {/* Loader Animation */}
        <div className="relative">
          {renderLoader()}
          
          {/* Subtle glow effect */}
          <div className={cn(
            "absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse",
            sizeClasses[size]
          )} />
        </div>

        {/* Loading Message */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <p className="text-sm font-medium text-foreground font-display">
              {message}
            </p>
            
            {/* Animated dots */}
            <motion.div
              className="flex justify-center space-x-1 mt-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-1 h-1 bg-muted-foreground rounded-full"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Pre-configured loading screen variants
export const FullScreenLoader = (props) => (
  <LoadingScreen fullScreen={true} size="lg" {...props} />
)

export const InlineLoader = (props) => (
  <LoadingScreen fullScreen={false} size="default" showMessage={false} {...props} />
)

export const PageLoader = (props) => (
  <LoadingScreen 
    fullScreen={true} 
    size="xl" 
    message="Loading page..." 
    variant="wave"
    {...props} 
  />
)

export const ComponentLoader = (props) => (
  <LoadingScreen 
    fullScreen={false} 
    size="sm" 
    variant="dots" 
    showMessage={false}
    {...props} 
  />
)

export default LoadingScreen 