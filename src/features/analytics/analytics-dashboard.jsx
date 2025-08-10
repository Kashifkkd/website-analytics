import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  MousePointer,
  FileText,
  Video,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import {
  fetchAnalytics,
  fetchPathAnalytics,
  setSearchQuery,
  setCurrentPage,
  clearSelectedPath,
  selectPaths,
  selectSelectedPath,
  selectIsLoading,
  selectIsLoadingPath,
  selectError,
  selectPagination,
  selectSearchQuery,
  selectViewMode
} from '../../store/slices/analytics-slice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Separator } from '../../components/ui/separator'
import LoadingScreen from '../../components/loading-screen'

const AnalyticsDashboard = ({ selectedWebsiteId }) => {
  const dispatch = useDispatch()
  const paths = useSelector(selectPaths)
  const selectedPath = useSelector(selectSelectedPath)
  const isLoading = useSelector(selectIsLoading)
  const isLoadingPath = useSelector(selectIsLoadingPath)
  const error = useSelector(selectError)
  const pagination = useSelector(selectPagination)
  const searchQuery = useSelector(selectSearchQuery)
  const viewMode = useSelector(selectViewMode)
  
  const [viewType, setViewType] = useState('grid') // 'grid' or 'list'
  const [localSearch, setLocalSearch] = useState('')

  // Load analytics data when component mounts or website changes
  useEffect(() => {
    if (selectedWebsiteId) {
      dispatch(fetchAnalytics({ 
        websiteId: selectedWebsiteId,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        search: searchQuery
      }))
    }
  }, [dispatch, selectedWebsiteId, pagination.currentPage, pagination.pageSize, searchQuery])

  // Handle search with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch))
    }, 500)
    return () => clearTimeout(timer)
  }, [localSearch, dispatch])

  const handlePathClick = (pathId) => {
    dispatch(fetchPathAnalytics({ pathId, websiteId: selectedWebsiteId }))
  }

  const handleBackToList = () => {
    dispatch(clearSelectedPath())
  }

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage))
  }

  const getAnalyticIcon = (key) => {
    if (key.includes('views') || key.includes('counter')) return <Eye className="w-4 h-4" />
    if (key.includes('button') || key.includes('tracker')) return <MousePointer className="w-4 h-4" />
    if (key.includes('form') || key.includes('submission')) return <FileText className="w-4 h-4" />
    if (key.includes('video') || key.includes('play')) return <Video className="w-4 h-4" />
    return <TrendingUp className="w-4 h-4" />
  }

  const getMetricTrend = (value) => {
    if (value > 200) return { icon: <TrendingUp className="w-3 h-3" />, color: 'text-green-500' }
    if (value < 50) return { icon: <TrendingDown className="w-3 h-3" />, color: 'text-red-500' }
    return { icon: <Minus className="w-3 h-3" />, color: 'text-yellow-500' }
  }

  const getMetricVariant = (key) => {
    if (key.includes('views')) return 'info'
    if (key.includes('button')) return 'success'
    if (key.includes('form')) return 'warning'
    if (key.includes('video')) return 'secondary'
    return 'default'
  }

  // Show detailed path view
  if (viewMode === 'detail' && selectedPath) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackToList}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Paths</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h2 className="text-2xl font-bold">{selectedPath.name}</h2>
              <p className="text-sm text-muted-foreground">Path Analytics Details</p>
            </div>
          </div>
        </div>

        {/* Loading state for path details */}
        {isLoadingPath && (
          <LoadingScreen variant="dots" size="sm" message="Loading path analytics..." />
        )}

        {/* Analytics Cards */}
        {!isLoadingPath && selectedPath.analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedPath.analytics.map((metric, index) => {
              const metricKey = Object.keys(metric).find(key => key !== 'name')
              const metricValue = metric[metricKey]
              const trend = getMetricTrend(metricValue)
              
              return (
                <motion.div
                  key={`${metricKey}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {metric.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        {getAnalyticIcon(metricKey)}
                        <div className={trend.color}>
                          {trend.icon}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metricValue.toLocaleString()}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getMetricVariant(metricKey)}>
                          {metricKey.replace(/_/g, ' ').replace(/\d+/g, '').trim()}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    )
  }

  // Show main list view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze your website path performance
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewType === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search paths..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <LoadingScreen variant="pulse" size="md" message="Loading analytics data..." />
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-destructive text-sm">{error}</div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4"
            onClick={() => dispatch(fetchAnalytics({ 
              websiteId: selectedWebsiteId,
              page: 1,
              pageSize: pagination.pageSize,
              search: searchQuery
            }))}
          >
            Try Again
          </Button>
        </motion.div>
      )}

      {/* Paths Grid/List */}
      {!isLoading && !error && (
        <AnimatePresence mode="wait">
          <motion.div
            key={viewType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewType === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {paths.map((path, index) => (
              <motion.div
                key={path._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className="cursor-pointer"
                onClick={() => handlePathClick(path._id)}
              >
                <Card className="hover:shadow-lg transition-all duration-200 hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{path.name}</CardTitle>
                      <Badge variant="outline">{path.analytics.length} metrics</Badge>
                    </div>
                    <CardDescription>
                      Click to view detailed analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {path.analytics.slice(0, 4).map((metric, metricIndex) => {
                        const metricKey = Object.keys(metric).find(key => key !== 'name')
                        const metricValue = metric[metricKey]
                        
                        return (
                          <div key={metricIndex} className="text-center">
                            <div className="text-sm font-medium">{metricValue}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {metric.name}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {!isLoading && !error && pagination.totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <div className="text-sm text-muted-foreground">
            Showing {paths.length} of {pagination.totalPaths} paths
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .slice(
                  Math.max(0, pagination.currentPage - 3),
                  Math.min(pagination.totalPages, pagination.currentPage + 2)
                )
                .map((page) => (
                  <Button
                    key={page}
                    variant={page === pagination.currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !error && paths.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground mb-4">
            No analytics data found for this website.
          </div>
          <Button variant="outline" size="sm">
            Refresh Data
          </Button>
        </motion.div>
      )}
    </div>
  )
}

export default AnalyticsDashboard 