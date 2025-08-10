import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock analytics data - User's provided structure
const mockAnalyticsData = {
  "page": 1,
  "pageSize": 50,
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

// Create mock data for different websites by mapping website IDs to different analytics
const createWebsiteSpecificAnalytics = (websiteId) => {
  // Base analytics data with different multipliers for each website
  const websiteMultipliers = {
    '64f7a1c29a1b4c001f8a1a01': 1.0,    // mybenifitai.org
    '64f7a1c29a1b4c001f8a1a02': 1.2,    // mybenifitai.com  
    '64f7a1c29a1b4c001f8a1a03': 0.8,    // ukbenifit.in
    '64f7a1c29a1b4c001f8a1a04': 0.9,    // seniorbenifit.uk
    '64f7a1c29a1b4c001f8a1a05': 1.1     // americanbenifit.org
  }
  
  const multiplier = websiteMultipliers[websiteId] || 1.0
  
  return {
    ...mockAnalyticsData,
    paths: mockAnalyticsData.paths.map(path => ({
      ...path,
      websiteId: websiteId,
      _id: `${path._id}_${websiteId}`,
      analytics: path.analytics.map(analytic => {
        const metricKey = Object.keys(analytic).find(key => key !== 'name')
        const originalValue = analytic[metricKey]
        const newValue = Math.round(originalValue * multiplier)
        
        return {
          ...analytic,
          [metricKey]: newValue
        }
      })
    }))
  }
}

// Async thunk for fetching analytics data
export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async ({ websiteId, page = 1, pageSize = 50, search = '' }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Get website-specific analytics data
    const websiteAnalytics = createWebsiteSpecificAnalytics(websiteId)
    
    // Filter mock data based on search
    let filteredPaths = websiteAnalytics.paths
    if (search) {
      filteredPaths = websiteAnalytics.paths.filter(path => 
        path.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Simulate pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPaths = filteredPaths.slice(startIndex, endIndex)
    
    return {
      page,
      pageSize,
      totalPaths: filteredPaths.length,
      totalPages: Math.ceil(filteredPaths.length / pageSize),
      paths: paginatedPaths,
      websiteId
    }
  }
)

// Async thunk for fetching single path analytics
export const fetchPathAnalytics = createAsyncThunk(
  'analytics/fetchPathAnalytics',
  async ({ pathId, websiteId }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Get website-specific analytics data
    const websiteAnalytics = createWebsiteSpecificAnalytics(websiteId)
    
    // Find the path in website-specific data
    const path = websiteAnalytics.paths.find(p => p._id === pathId)
    if (!path) {
      throw new Error('Path not found')
    }
    
    return path
  }
)

const initialState = {
  // List view state
  paths: [],
  currentPage: 1,
  pageSize: 50,
  totalPaths: 0,
  totalPages: 0,
  searchQuery: '',
  selectedWebsiteId: null,
  
  // Single path view state
  selectedPath: null,
  pathAnalytics: null,
  
  // Loading states
  isLoading: false,
  isLoadingPath: false,
  
  // Error states
  error: null,
  pathError: null,
  
  // UI state
  viewMode: 'list', // 'list' or 'detail'
  sortBy: 'name',
  sortOrder: 'asc',
  filters: {
    dateRange: 'last7days',
    minViews: 0
  }
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1 // Reset to first page on search
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
      state.currentPage = 1 // Reset to first page on page size change
    },
    setSelectedWebsiteId: (state, action) => {
      state.selectedWebsiteId = action.payload
      state.currentPage = 1
      state.searchQuery = ''
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload.field
      state.sortOrder = action.payload.order
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearSelectedPath: (state) => {
      state.selectedPath = null
      state.pathAnalytics = null
      state.viewMode = 'list'
    },
    clearError: (state) => {
      state.error = null
      state.pathError = null
    },
    resetAnalyticsState: () => {
      return { ...initialState }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch analytics cases
      .addCase(fetchAnalytics.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.isLoading = false
        state.paths = action.payload.paths
        state.currentPage = action.payload.page
        state.pageSize = action.payload.pageSize
        state.totalPaths = action.payload.totalPaths
        state.totalPages = action.payload.totalPages
        state.selectedWebsiteId = action.payload.websiteId
        state.error = null
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch analytics data'
        state.paths = []
      })
      
      // Fetch path analytics cases
      .addCase(fetchPathAnalytics.pending, (state) => {
        state.isLoadingPath = true
        state.pathError = null
      })
      .addCase(fetchPathAnalytics.fulfilled, (state, action) => {
        state.isLoadingPath = false
        state.selectedPath = action.payload
        state.pathAnalytics = action.payload.analytics
        state.viewMode = 'detail'
        state.pathError = null
      })
      .addCase(fetchPathAnalytics.rejected, (state, action) => {
        state.isLoadingPath = false
        state.pathError = action.error.message || 'Failed to fetch path analytics'
        state.selectedPath = null
        state.pathAnalytics = null
      })
  }
})

// Action creators
export const {
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  setSelectedWebsiteId,
  setViewMode,
  setSortBy,
  setFilters,
  clearSelectedPath,
  clearError,
  resetAnalyticsState
} = analyticsSlice.actions

// Selectors
export const selectAnalyticsState = (state) => state.analytics
export const selectPaths = (state) => state.analytics.paths
export const selectSelectedPath = (state) => state.analytics.selectedPath
export const selectPathAnalytics = (state) => state.analytics.pathAnalytics
export const selectIsLoading = (state) => state.analytics.isLoading
export const selectIsLoadingPath = (state) => state.analytics.isLoadingPath
export const selectError = (state) => state.analytics.error
export const selectPathError = (state) => state.analytics.pathError
export const selectPagination = (state) => ({
  currentPage: state.analytics.currentPage,
  pageSize: state.analytics.pageSize,
  totalPaths: state.analytics.totalPaths,
  totalPages: state.analytics.totalPages
})
export const selectSearchQuery = (state) => state.analytics.searchQuery
export const selectViewMode = (state) => state.analytics.viewMode
export const selectFilters = (state) => state.analytics.filters

export default analyticsSlice.reducer 