// Role-based access control utilities
export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  ADMIN: 'admin',
  MANAGE_USERS: 'manage_users',
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_DATA: 'export_data'
}

export const ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer'
}

// Role permission mappings
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.DELETE,
    PERMISSIONS.ADMIN,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA
  ],
  [ROLES.EDITOR]: [
    PERMISSIONS.READ,
    PERMISSIONS.WRITE,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_DATA
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.READ,
    PERMISSIONS.VIEW_ANALYTICS
  ]
}

// Check if user has specific permission
export const hasPermission = (userPermissions, requiredPermission) => {
  return userPermissions && userPermissions.includes(requiredPermission)
}

// Check if user has any of the required permissions
export const hasAnyPermission = (userPermissions, requiredPermissions) => {
  if (!userPermissions || !requiredPermissions) return false
  return requiredPermissions.some(permission => userPermissions.includes(permission))
}

// Check if user has all required permissions
export const hasAllPermissions = (userPermissions, requiredPermissions) => {
  if (!userPermissions || !requiredPermissions) return false
  return requiredPermissions.every(permission => userPermissions.includes(permission))
}

// Get permissions for a role
export const getPermissionsForRole = (role) => {
  return ROLE_PERMISSIONS[role] || []
}

// Check if user can access a specific sidebar item (future implementation)
export const canAccessSidebarItem = (userPermissions, itemPermissions) => {
  if (!itemPermissions || itemPermissions.length === 0) return true
  return hasAnyPermission(userPermissions, itemPermissions)
}

// Sidebar items configuration with role-based access
export const SIDEBAR_ITEMS = {
  WEBSITES: {
    id: 'websites',
    name: 'Websites',
    requiredPermissions: [PERMISSIONS.READ]
  },
  ANALYTICS: {
    id: 'analytics',
    name: 'Analytics',
    requiredPermissions: [PERMISSIONS.VIEW_ANALYTICS]
  },
  USERS: {
    id: 'users',
    name: 'Users',
    requiredPermissions: [PERMISSIONS.MANAGE_USERS]
  },
  SETTINGS: {
    id: 'settings',
    name: 'Settings',
    requiredPermissions: [PERMISSIONS.ADMIN]
  }
}

// Filter sidebar items based on user permissions
export const getAccessibleSidebarItems = (userPermissions) => {
  return Object.values(SIDEBAR_ITEMS).filter(item =>
    canAccessSidebarItem(userPermissions, item.requiredPermissions)
  )
} 