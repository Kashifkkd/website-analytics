import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Mock API data
const mockWebsitesData = {
  "page": 1,
  "limit": 25,
  "totalItems": 5,
  "totalPages": 1,
  "data": [
    { 
      "name": "mybenifitai.org", 
      "_id": "64f7a1c29a1b4c001f8a1a01", 
      "paths": [
        { "id": 11222323, "name": "Home Page Path" },
        { "id": 11222324, "name": "Pricing Page Path" },
        { "id": 11222325, "name": "Contact Page Path" },
        { "id": 11222326, "name": "About Us Path" },
        { "id": 11222327, "name": "Blog Page Path" },
        { "id": 11222328, "name": "Product Page Path" },
        { "id": 11222329, "name": "Checkout Page Path" },
        { "id": 11222330, "name": "FAQ Page Path" },
        { "id": 11222331, "name": "Landing Page Path" }
      ]
    },
    { 
      "name": "mybenifitai.com", 
      "_id": "64f7a1c29a1b4c001f8a1a02", 
      "paths": [
        { "id": 11222332, "name": "Home Page Path" },
        { "id": 11222333, "name": "Pricing Page Path" },
        { "id": 11222334, "name": "Contact Page Path" },
        { "id": 11222335, "name": "About Us Path" },
        { "id": 11222336, "name": "Blog Page Path" },
        { "id": 11222337, "name": "Product Page Path" },
        { "id": 11222338, "name": "Checkout Page Path" },
        { "id": 11222339, "name": "FAQ Page Path" },
        { "id": 11222340, "name": "Landing Page Path" }
      ]
    },
    { 
      "name": "ukbenifit.in", 
      "_id": "64f7a1c29a1b4c001f8a1a03", 
      "paths": [
        { "id": 11222341, "name": "Home Page Path" },
        { "id": 11222342, "name": "Pricing Page Path" },
        { "id": 11222343, "name": "Contact Page Path" },
        { "id": 11222344, "name": "About Us Path" },
        { "id": 11222345, "name": "Blog Page Path" },
        { "id": 11222346, "name": "Product Page Path" },
        { "id": 11222347, "name": "Checkout Page Path" },
        { "id": 11222348, "name": "FAQ Page Path" },
        { "id": 11222349, "name": "Landing Page Path" }
      ]
    },
    { 
      "name": "seniorbenifit.uk", 
      "_id": "64f7a1c29a1b4c001f8a1a04", 
      "paths": [
        { "id": 11222350, "name": "Home Page Path" },
        { "id": 11222351, "name": "Pricing Page Path" },
        { "id": 11222352, "name": "Contact Page Path" },
        { "id": 11222353, "name": "About Us Path" },
        { "id": 11222354, "name": "Blog Page Path" },
        { "id": 11222355, "name": "Product Page Path" },
        { "id": 11222356, "name": "Checkout Page Path" },
        { "id": 11222357, "name": "FAQ Page Path" },
        { "id": 11222358, "name": "Landing Page Path" }
      ]
    },
    { 
      "name": "americanbenifit.org", 
      "_id": "64f7a1c29a1b4c001f8a1a05", 
      "paths": [
        { "id": 11222359, "name": "Home Page Path" },
        { "id": 11222360, "name": "Pricing Page Path" },
        { "id": 11222361, "name": "Contact Page Path" },
        { "id": 11222362, "name": "About Us Path" },
        { "id": 11222363, "name": "Blog Page Path" },
        { "id": 11222364, "name": "Product Page Path" },
        { "id": 11222365, "name": "Checkout Page Path" },
        { "id": 11222366, "name": "FAQ Page Path" },
        { "id": 11222367, "name": "Landing Page Path" }
      ]
    }
  ]
}

// Async thunk for fetching websites
export const fetchWebsites = createAsyncThunk(
  'api/fetchWebsites',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const { auth } = getState()
      if (!auth.isAuthenticated) {
        throw new Error('User not authenticated')
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate potential API errors (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Failed to fetch websites. Please try again.')
      }
      
      // Filter data based on user role (future implementation)
      let filteredData = mockWebsitesData.data
      
      const userRole = auth.user?.role
      if (userRole === 'viewer') {
        // Viewers might see limited websites
        filteredData = mockWebsitesData.data.slice(0, 3)
      }
      
      return {
        ...mockWebsitesData,
        data: filteredData,
        totalItems: filteredData.length
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for fetching website analytics (future implementation)
export const fetchWebsiteAnalytics = createAsyncThunk(
  'api/fetchWebsiteAnalytics',
  async (websiteId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState()
      if (!auth.isAuthenticated) {
        throw new Error('User not authenticated')
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock analytics data
      const analyticsData = {
        websiteId,
        visitors: Math.floor(Math.random() * 10000),
        pageViews: Math.floor(Math.random() * 50000),
        bounceRate: Math.floor(Math.random() * 100),
        avgSessionDuration: Math.floor(Math.random() * 300),
        topPages: [
          { path: '/', views: Math.floor(Math.random() * 1000) },
          { path: '/about', views: Math.floor(Math.random() * 500) },
          { path: '/contact', views: Math.floor(Math.random() * 300) }
        ]
      }
      
      return analyticsData
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  websites: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null
  },
  analytics: {
    data: {},
    loading: false,
    error: null
  },
  selectedWebsite: null
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSelectedWebsite: (state, action) => {
      state.selectedWebsite = action.payload
    },
    clearWebsitesError: (state) => {
      state.websites.error = null
    },
    clearAnalyticsError: (state) => {
      state.analytics.error = null
    },
    // Reset API state on logout
    resetApiState: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch websites cases
      .addCase(fetchWebsites.pending, (state) => {
        state.websites.loading = true
        state.websites.error = null
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        state.websites.loading = false
        state.websites.data = action.payload.data
        state.websites.error = null
        state.websites.lastFetched = Date.now()
        
        // Set first website as selected if none selected
        if (!state.selectedWebsite && action.payload.data.length > 0) {
          state.selectedWebsite = action.payload.data[0]
        }
      })
      .addCase(fetchWebsites.rejected, (state, action) => {
        state.websites.loading = false
        state.websites.error = action.payload
      })
      // Fetch analytics cases
      .addCase(fetchWebsiteAnalytics.pending, (state) => {
        state.analytics.loading = true
        state.analytics.error = null
      })
      .addCase(fetchWebsiteAnalytics.fulfilled, (state, action) => {
        state.analytics.loading = false
        state.analytics.data[action.payload.websiteId] = action.payload
        state.analytics.error = null
      })
      .addCase(fetchWebsiteAnalytics.rejected, (state, action) => {
        state.analytics.loading = false
        state.analytics.error = action.payload
      })
  }
})

// Selectors
export const selectWebsites = (state) => state.api.websites.data
export const selectWebsitesLoading = (state) => state.api.websites.loading
export const selectWebsitesError = (state) => state.api.websites.error
export const selectSelectedWebsite = (state) => state.api.selectedWebsite
export const selectWebsiteAnalytics = (state, websiteId) => 
  state.api.analytics.data[websiteId]
export const selectAnalyticsLoading = (state) => state.api.analytics.loading
export const selectAnalyticsError = (state) => state.api.analytics.error

// Helper selectors
export const selectWebsiteById = (state, websiteId) => 
  state.api.websites.data.find(website => website._id === websiteId)

export const selectWebsitesCount = (state) => state.api.websites.data.length

export const { 
  setSelectedWebsite, 
  clearWebsitesError, 
  clearAnalyticsError, 
  resetApiState 
} = apiSlice.actions

export default apiSlice.reducer 