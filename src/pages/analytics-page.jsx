import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Eye,
  MousePointer,
  Play,
  FileText,
  Scroll,
  Search,
  Filter,
  Download,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { selectWebsites, selectSelectedWebsite, fetchWebsites, setSelectedWebsite } from '../store/slices/apiSlice'
import LoadingScreen from '../components/loading-screen'
import Sidebar from '../features/dashboard/Sidebar'
import Input from '../components/ui/input'
import Button from '../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'


// Mock path analytics data
const mockPathAnalytics = {
  "page": 1,
  "pageSize": 10,
  "totalPaths": 50,
  "paths": [
    {
      "name": "Home Page Path",
      "_id": "66b72e9fa7f1a3c7e25f102a",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 245, "name": "Page Views - Home" },
        { "button_tracker_1": 120, "name": "Start Now Button" },
        { "button_tracker_2": 85, "name": "Learn More Button" },
        { "form_submission_counter_1": 34, "name": "Signup Form" },
        { "scroll_depth_tracker_1": 150, "name": "Scroll Depth 50%" }
      ]
    },
    {
      "name": "Pricing Page Path",
      "_id": "66b72f10a7f1a3c7e25f102b",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 178, "name": "Page Views - Pricing" },
        { "button_tracker_1": 54, "name": "Get Started Button" },
        { "form_submission_counter_1": 27, "name": "Pricing Inquiry Form" },
        { "scroll_depth_tracker_1": 88, "name": "Scroll Depth 75%" },
        { "video_play_counter_1": 15, "name": "Pricing Explainer Video" }
      ]
    },
    {
      "name": "Contact Page Path",
      "_id": "66b72f4aa7f1a3c7e25f102c",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 96, "name": "Page Views - Contact" },
        { "form_submission_counter_1": 45, "name": "Contact Form" },
        { "button_tracker_1": 10, "name": "Call Us Button" },
        { "button_tracker_2": 6, "name": "Email Us Button" },
        { "scroll_depth_tracker_1": 50, "name": "Scroll Depth 25%" }
      ]
    },
    {
      "name": "About Us Path",
      "_id": "66b72f7ba7f1a3c7e25f102d",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 132, "name": "Page Views - About" },
        { "button_tracker_1": 18, "name": "Read More Button" },
        { "scroll_depth_tracker_1": 64, "name": "Scroll Depth 80%" },
        { "video_play_counter_1": 12, "name": "Team Intro Video" },
        { "form_submission_counter_1": 5, "name": "Join Us Form" }
      ]
    },
    {
      "name": "Blog Page Path",
      "_id": "66b72fa8a7f1a3c7e25f102e",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 289, "name": "Page Views - Blog" },
        { "button_tracker_1": 72, "name": "Subscribe Button" },
        { "scroll_depth_tracker_1": 156, "name": "Scroll Depth 90%" },
        { "video_play_counter_1": 25, "name": "Blog Video Play" },
        { "button_tracker_2": 14, "name": "Share Blog Button" },
        { "form_submission_counter_1": 3, "name": "Blog Feedback Form" }
      ]
    },
    {
      "name": "Product Page Path",
      "_id": "66b72fd1a7f1a3c7e25f102f",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 405, "name": "Page Views - Product" },
        { "button_tracker_1": 210, "name": "Add to Cart Button" },
        { "button_tracker_2": 132, "name": "Buy Now Button" },
        { "scroll_depth_tracker_1": 180, "name": "Scroll Depth 100%" },
        { "video_play_counter_1": 44, "name": "Product Demo Video" }
      ]
    },
    {
      "name": "Checkout Page Path",
      "_id": "66b73001a7f1a3c7e25f1030",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 189, "name": "Page Views - Checkout" },
        { "form_submission_counter_1": 142, "name": "Place Order Form" },
        { "button_tracker_1": 72, "name": "Apply Coupon Button" },
        { "button_tracker_2": 18, "name": "Change Address Button" }
      ]
    },
    {
      "name": "FAQ Page Path",
      "_id": "66b73025a7f1a3c7e25f1031",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 76, "name": "Page Views - FAQ" },
        { "button_tracker_1": 33, "name": "Contact Support Button" },
        { "scroll_depth_tracker_1": 40, "name": "Scroll Depth 50%" },
        { "form_submission_counter_1": 2, "name": "FAQ Question Form" }
      ]
    },
    {
      "name": "Landing Page Path",
      "_id": "66b73045a7f1a3c7e25f1032",
      "websiteId": "66b72e6ea7f1a3c7e25f101b",
      "analytics": [
        { "total_views_counter_1": 512, "name": "Page Views - Landing" },
        { "button_tracker_1": 322, "name": "Sign Up Now Button" },
        { "video_play_counter_1": 78, "name": "Promo Video Play" },
        { "form_submission_counter_1": 54, "name": "Landing Page Form" }
      ]
    }
  ]
}

const getAnalyticsIcon = (name) => {
  if (name.includes('Page Views')) return <Eye className="w-4 h-4" />
  if (name.includes('Button')) return <MousePointer className="w-4 h-4" />
  if (name.includes('Form')) return <FileText className="w-4 h-4" />
  if (name.includes('Video')) return <Play className="w-4 h-4" />
  if (name.includes('Scroll')) return <Scroll className="w-4 h-4" />
  return <BarChart3 className="w-4 h-4" />
}

const getAnalyticsColor = (name) => {
  if (name.includes('Page Views')) return 'text-blue-500'
  if (name.includes('Button')) return 'text-green-500'
  if (name.includes('Form')) return 'text-purple-500'
  if (name.includes('Video')) return 'text-red-500'
  if (name.includes('Scroll')) return 'text-orange-500'
  return 'text-gray-500'
}

const AnalyticsPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { websiteId } = useParams()
  const websites = useSelector(selectWebsites)
  const selectedWebsite = useSelector(selectSelectedWebsite)

  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pathAnalytics, setPathAnalytics] = useState(null)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [selectedDateFilter, setSelectedDateFilter] = useState('today')
  const [selectedMetricTypes, setSelectedMetricTypes] = useState(['all'])
  const [customDateRange, setCustomDateRange] = useState({ startDate: '', endDate: '' })
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)

  // Fetch websites and set selected website
  useEffect(() => {
    if (websites.length === 0) {
      dispatch(fetchWebsites())
    }
  }, [dispatch, websites.length])

  useEffect(() => {
    if (websiteId && websites.length > 0) {
      const website = websites.find(w => w._id === websiteId)
      if (website && (!selectedWebsite || selectedWebsite._id !== websiteId)) {
        dispatch(setSelectedWebsite(website))
      }
    }
  }, [dispatch, websiteId, websites, selectedWebsite])

  // Load path analytics immediately when component mounts or website changes
  useEffect(() => {
    // Set analytics data immediately - no loading delay
    setPathAnalytics(mockPathAnalytics)
    setIsLoading(false)

    // Scroll to top when website changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selectedWebsite])

  // Close custom date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCustomDatePicker && !event.target.closest('.date-picker-container')) {
        setShowCustomDatePicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCustomDatePicker])

  const filteredPaths = pathAnalytics?.paths.filter(path =>
    path.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  if (!selectedWebsite) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingScreen variant="spinner" size="lg" message="Loading website..." />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Title Row with Back Button */}
        <div className="mb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="hover:bg-accent"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">
                  {selectedWebsite.name}
                </h1>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {/* Handle export */ }}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Stats and Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="text-2xl font-bold text-foreground">{filteredPaths.length}</span> of <span className="font-medium">{pathAnalytics?.totalPaths || 0}</span> paths
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground">
              Page {pathAnalytics?.page || 1} of {Math.ceil((pathAnalytics?.totalPaths || 0) / (pathAnalytics?.pageSize || 10))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search paths..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>

            {/* Date Filter Dropdown */}
            <div className="relative">
              <Select
                value={selectedDateFilter}
                onValueChange={(value) => {
                  setSelectedDateFilter(value)
                  if (value === 'custom') {
                    setShowCustomDatePicker(true)
                  } else {
                    setShowCustomDatePicker(false)
                  }
                }}
              >
                <SelectTrigger className="w-[140px] bg-background border-input">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent className="bg-background border-input">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {/* Custom Date Range Picker */}
              {showCustomDatePicker && (
                <div className="date-picker-container absolute top-full left-0 mt-2 p-4 bg-background border border-input rounded-md shadow-lg z-50 min-w-[300px]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium">Custom Date Range</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowCustomDatePicker(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-2 block">Start Date</label>
                        <input
                          type="date"
                          value={customDateRange.startDate || ''}
                          onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                          max={customDateRange.endDate || new Date().toISOString().split('T')[0]}
                          className="w-full h-8 px-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-2 block">End Date</label>
                        <input
                          type="date"
                          value={customDateRange.endDate || ''}
                          onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                          min={customDateRange.startDate || ''}
                          max={new Date().toISOString().split('T')[0]}
                          className="w-full h-8 px-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() => {
                          setCustomDateRange({ startDate: '', endDate: '' })
                          setSelectedDateFilter('today')
                          setShowCustomDatePicker(false)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() => setShowCustomDatePicker(false)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>



            <Button
              variant="outline"
              className="h-10"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <LoadingScreen variant="spinner" size="lg" message="Loading analytics..." />
        </div>
      )}

      {/* Path Analytics Grid */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {filteredPaths.map((path, index) => (
            <motion.div
              key={path._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold">
                          {path.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Analytics overview for this path
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="font-medium">
                        {path.analytics.length} metrics
                      </Badge>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {path.analytics.map((metric, metricIndex) => {
                      const key = Object.keys(metric).find(k => k !== 'name')
                      const value = metric[key]
                      const name = metric.name

                      return (
                        <motion.div
                          key={metricIndex}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="p-4 rounded-xl border bg-gradient-to-br from-card to-card/50 hover:from-accent/30 hover:to-accent/10 transition-all duration-200 group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-background/50 group-hover:bg-background ${getAnalyticsColor(name)}`}>
                              {getAnalyticsIcon(name)}
                            </div>
                            <div className="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              +12%
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-foreground">
                              {value.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground font-medium leading-tight">
                              {name}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && filteredPaths.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No paths found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Try adjusting your search terms.' : 'No analytics data available for this website.'}
          </p>
        </motion.div>
      )}

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-96 bg-background border-l shadow-lg">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterDrawerOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 px-6 py-3 space-y-4 overflow-y-auto">
                {/* Metric Types Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Metric Types</h3>
                  <div className="space-y-2">
                    {['All', 'Page Views', 'Button Clicks', 'Form Submissions', 'Video Plays', 'Scroll Depth'].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMetricTypes.includes(type.toLowerCase().replace(' ', '-'))}
                          onChange={(e) => {
                            const value = type.toLowerCase().replace(' ', '-')
                            if (e.target.checked) {
                              setSelectedMetricTypes([...selectedMetricTypes, value])
                            } else {
                              setSelectedMetricTypes(selectedMetricTypes.filter(t => t !== value))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Value Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Value Range</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Minimum Value</label>
                      <Input type="number" placeholder="0" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Maximum Value</label>
                      <Input type="number" placeholder="1000" className="mt-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedMetricTypes(['all'])
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setIsFilterDrawerOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnalyticsPage 