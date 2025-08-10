import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Eye, 
  MousePointer,
  Activity,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { selectWebsites, selectWebsitesLoading, fetchWebsites } from '../../store/slices/apiSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/button'

const CommonDashboard = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const websites = useSelector(selectWebsites)
  const isLoading = useSelector(selectWebsitesLoading)

  useEffect(() => {
    if (websites.length === 0) {
      dispatch(fetchWebsites())
    }
  }, [dispatch, websites.length])

  // Calculate aggregate statistics
  const totalWebsites = websites.length
  const totalPaths = websites.reduce((sum, website) => sum + (website.paths?.length || 0), 0)
  const avgPathsPerWebsite = totalWebsites > 0 ? Math.round(totalPaths / totalWebsites) : 0

  // Mock aggregate analytics data
  const aggregateStats = {
    totalViews: 12847,
    totalClicks: 5632,
    conversionRate: 4.2,
    activeWebsites: websites.filter(w => w.paths?.length > 0).length
  }

  const handleWebsiteClick = (website) => {
    navigate(`/dashboard/${website._id}`)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-xl font-bold font-display">
          Analytics Overview
        </h1>
        <p className="text-base text-muted-foreground">
          Monitor performance across all your websites
        </p>
      </motion.div>

      {/* Analytics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Total Websites */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWebsites}</div>
            <p className="text-xs text-muted-foreground">
              {aggregateStats.activeWebsites} active
            </p>
          </CardContent>
        </Card>

        {/* Total Views */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregateStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        {/* Total Interactions */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aggregateStats.totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <Activity className="inline w-3 h-3 mr-1" />
              {aggregateStats.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        {/* Total Paths */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paths</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPaths}</div>
            <p className="text-xs text-muted-foreground">
              Avg {avgPathsPerWebsite} per website
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Performance Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Performance Trends</span>
            </CardTitle>
            <CardDescription>Website performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Chart visualization will be integrated here</p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Traffic Sources</span>
            </CardTitle>
            <CardDescription>Visitor sources across all websites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Users className="w-12 h-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Traffic source breakdown</p>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Websites Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-display">Your Websites</h2>
          <Badge variant="secondary">{totalWebsites} websites</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website, index) => (
            <motion.div
              key={website._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -2 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/50"
                onClick={() => handleWebsiteClick(website)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <span className="truncate">{website.name}</span>
                    </CardTitle>
                    <Badge variant="outline">
                      {website.paths?.length || 0} paths
                    </Badge>
                  </div>
                  <CardDescription>
                    Click to view detailed analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-muted-foreground">Active</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Last 24h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {websites.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No websites found</h3>
            <p className="text-muted-foreground mb-4">
              Add your first website to start tracking analytics
            </p>
            <Button variant="outline">
              <Globe className="w-4 h-4 mr-2" />
              Add Website
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default CommonDashboard 