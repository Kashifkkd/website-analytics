import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronRight, BarChart3, Menu, PanelRight, LogOut, RefreshCw, AlertCircle, Home } from 'lucide-react'
import {
  fetchWebsites,
  setSelectedWebsite,
  selectWebsites,
  selectWebsitesLoading,
  selectWebsitesError,
  selectSelectedWebsite,
  clearWebsitesError
} from '../../store/slices/apiSlice'
import { logout, selectUser } from '../../store/slices/authSlice'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import ScrollArea from '../../components/ui/scroll-area'
import Button from '../../components/ui/button'
import { cn } from '../../lib/utils'

// Skeleton loader component
const SidebarItemSkeleton = () => (
  <div className="p-3 rounded-lg border border-border/50">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-muted animate-pulse rounded-md"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
        <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
      </div>
      <div className="w-4 h-4 bg-muted animate-pulse rounded"></div>
    </div>
  </div>
)

const SidebarItem = ({ website, isSelected, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative group cursor-pointer rounded-lg p-3 transition-all duration-200 w-full",
        isSelected
          ? "bg-primary text-primary-foreground shadow-md border border-primary/30"
          : "hover:bg-accent/50 hover:border-accent border border-transparent"
      )}
      onClick={() => onClick(website)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200",
              isSelected ? "bg-primary-foreground/20" : "bg-muted"
            )}
          >
            <Globe className={cn(
              "w-4 h-4 transition-colors duration-200",
              isSelected ? "text-primary-foreground" : "text-muted-foreground"
            )} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-sm font-medium truncate font-display transition-colors duration-200",
              isSelected ? "text-primary-foreground" : "text-foreground"
            )}>
              {website.name}
            </p>
            <p className={cn(
              "text-xs transition-colors duration-200",
              isSelected ? "text-primary-foreground/70" : "text-muted-foreground"
            )}>
              {website.paths.length} paths tracked
            </p>
          </div>
        </div>
        <motion.div
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </div>

      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isSelected ? 1 : 0,
          scale: isSelected ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

// Navigation Menu Component
const NavigationMenu = ({ isCollapsed }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()

  const navItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      description: 'Website analytics & insights'
    }
  ]

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      // Only active on exact dashboard route, not on website-specific routes
      return location.pathname === '/dashboard'
    }
    return location.pathname === path
  }

  const handleNavigationClick = (item) => {
    if (item.path === '/dashboard') {
      // Reset website selection when clicking Dashboard
      dispatch(setSelectedWebsite(null))
      navigate('/dashboard')
    } else {
      navigate(item.path)
    }
  }

  return (
    <div className="px-4 py-2 border-b border-border">
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-1"
          >
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider font-display mb-3">
              Navigation
            </h3>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.path)

              return (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigationClick(item)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-left",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md border border-primary/30"
                      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground border border-transparent"
                  )}
                >
                  <Icon className={cn(
                    "w-4 h-4 transition-colors duration-200",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isActive ? "text-primary-foreground" : "text-foreground"
                    )}>
                      {item.name}
                    </p>
                    <p className={cn(
                      "text-xs truncate transition-colors duration-200",
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}

        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.path)

              return (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavigationClick(item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-full flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
                  )}
                  title={item.name}
                >
                  <Icon className="w-4 h-4" />
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-1 w-1 h-1 bg-primary rounded-full"
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const websites = useSelector(selectWebsites)
  const isLoading = useSelector(selectWebsitesLoading)
  const error = useSelector(selectWebsitesError)
  const selectedWebsite = useSelector(selectSelectedWebsite)
  const user = useSelector(selectUser)

  // Fetch websites on component mount
  useEffect(() => {
    dispatch(fetchWebsites())
  }, [dispatch])

  // Handle URL-based website selection
  useEffect(() => {
    const { websiteId } = params

    // Don't do anything if websites haven't loaded yet
    if (websites.length === 0) return

    if (websiteId) {
      const websiteFromId = websites.find(w => w._id === websiteId)
      if (websiteFromId && websiteFromId._id !== selectedWebsite?._id) {
        dispatch(setSelectedWebsite(websiteFromId))
      } else if (!websiteFromId) {
        // Invalid website ID, redirect to dashboard
        navigate('/dashboard', { replace: true })
      }
    } else if (!websiteId && selectedWebsite) {
      // No website ID in URL but website is selected, clear selection
      dispatch(setSelectedWebsite(null))
    }
  }, [params.websiteId, websites, selectedWebsite, dispatch, navigate])

  const handleWebsiteSelect = (website) => {
    dispatch(setSelectedWebsite(website))
    navigate(`/dashboard/${website._id}`)
  }

  const handleRefresh = () => {
    dispatch(clearWebsitesError())
    dispatch(fetchWebsites())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card/95 backdrop-blur-sm border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-80"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg"
                >
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <div>
                  <h1 className="text-lg font-bold font-display">Analytics</h1>
                  <p className="text-xs text-muted-foreground">Dashboard</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-auto"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <PanelRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu isCollapsed={isCollapsed} />

        {/* Website List */}
        <div className="flex-1 flex flex-col p-4 min-h-0">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-display">
                    Websites
                  </h2>
                  <div className="flex items-center space-x-2">
                    {!isLoading && !error && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {websites.length}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRefresh}
                      disabled={isLoading}
                      className="w-6 h-6"
                    >
                      <RefreshCw className={cn("w-3 h-3", isLoading && "animate-spin")} />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-2 pb-4">
                    {/* Loading State */}
                    {isLoading && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        className="space-y-2"
                      >
                        {[...Array(5)].map((_, index) => (
                          <motion.div
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                          >
                            <SidebarItemSkeleton />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center"
                      >
                        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                        <p className="text-sm text-destructive mb-2">{error}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRefresh}
                          className="text-destructive border-destructive/20 hover:bg-destructive/10"
                        >
                          Try Again
                        </Button>
                      </motion.div>
                    )}

                    {/* Empty State */}
                    {!isLoading && !error && websites.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-muted/50 border border-border rounded-lg p-8 text-center"
                      >
                        <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground mb-2">No websites found</p>
                        <p className="text-xs text-muted-foreground">Add your first website to get started</p>
                      </motion.div>
                    )}

                    {/* Websites List */}
                    {!isLoading && !error && websites.length > 0 && (
                      <motion.div
                        className="space-y-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                      >
                        {websites.map((website, index) => (
                          <motion.div
                            key={website._id}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <SidebarItem
                              website={website}
                              isSelected={selectedWebsite?._id === website._id}
                              onClick={handleWebsiteSelect}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with User Info and Logout */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="border-t border-border"
            >
              {/* System Status */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>

              {/* User Info with Logout */}
              {user && (
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center space-x-2 bg-white cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-black" />
                      <span className="text-xs text-black">Logout</span>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}

export default Sidebar 