import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Static credentials for demo
const STATIC_CREDENTIALS = {
  email: 'admin@gmail.com',
  password: '123456'
}

// User roles for future role-based access control
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
}

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check static credentials
      if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
        const userData = {
          id: '1',
          email: email,
          name: 'Admin User',
          role: USER_ROLES.ADMIN,
          token: 'mock-admin-token',
          permissions: ['read', 'write', 'delete', 'admin'] // Future role-based permissions
        }
        
        return userData
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Async thunk for signup (future implementation)
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For now, just return success (implement actual signup logic later)
      return {
        id: '2',
        email: userData.email,
        name: userData.name,
        role: USER_ROLES.VIEWER,
        token: 'mock-user-token',
        permissions: ['read']
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    // For future token refresh
    refreshToken: (state, action) => {
      state.token = action.payload.token
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  }
})

// Selectors
export const selectAuth = (state) => state.auth
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error
export const selectUserRole = (state) => state.auth.user?.role
export const selectUserPermissions = (state) => state.auth.user?.permissions || []

// Helper function to check permissions
export const hasPermission = (state, permission) => {
  const permissions = selectUserPermissions(state)
  return permissions.includes(permission)
}

export const { logout, clearError, refreshToken } = authSlice.actions
export default authSlice.reducer 