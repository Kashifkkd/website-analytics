import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import CommonDashboard from '../features/dashboard/common-dashboard'
import LoadingScreen from '../components/loading-screen'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { BarChart3, TrendingUp } from 'lucide-react'
import { selectWebsites, selectWebsitesLoading, fetchWebsites } from '../store/slices/apiSlice'
import Button from '../components/ui/button'

const DashboardPage = () => {
  const dispatch = useDispatch()
  const websites = useSelector(selectWebsites)
  const isLoadingWebsites = useSelector(selectWebsitesLoading)

  // Fetch websites when component mounts
  useEffect(() => {
    if (websites.length === 0) {
      dispatch(fetchWebsites())
    }
  }, [dispatch, websites.length])

  return (
    <div className="p-8">
      {/* Loading state for websites */}
      {isLoadingWebsites && (
        <LoadingScreen variant="spinner" size="lg" message="Loading websites..." />
      )}

      {/* No websites state */}
      {!isLoadingWebsites && websites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center py-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>No Websites Found</span>
              </CardTitle>
              <CardDescription>
                You need to have websites configured to view analytics data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Add Website
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Dashboard - Show All Websites */}
      {!isLoadingWebsites && websites.length > 0 && (
        <CommonDashboard />
      )}
    </div>
  )
}

export default DashboardPage 