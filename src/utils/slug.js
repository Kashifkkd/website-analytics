/**
 * Generate a URL-friendly slug from a website name
 * @param {string} name - The website name
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (name) => {
  if (!name) return ''
  
  return name
    .toLowerCase()
    .trim()
    // Remove protocol and www
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9-]/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, '')
    // Limit length to 50 characters
    .substring(0, 50)
    .replace(/-$/, '') // Remove trailing hyphen if created by substring
}

/**
 * Find website by slug from a list of websites
 * @param {Array} websites - Array of website objects
 * @param {string} slug - The slug to search for
 * @returns {Object|null} - Found website or null
 */
export const findWebsiteBySlug = (websites, slug) => {
  if (!websites || !slug) return null
  
  return websites.find(website => {
    const websiteSlug = generateSlug(website.name)
    return websiteSlug === slug
  })
}

/**
 * Get website slug from website object
 * @param {Object} website - Website object with name property
 * @returns {string} - Generated slug
 */
export const getWebsiteSlug = (website) => {
  if (!website || !website.name) return ''
  return generateSlug(website.name)
}

/**
 * Validate if a slug is valid (URL-safe)
 * @param {string} slug - The slug to validate
 * @returns {boolean} - Whether the slug is valid
 */
export const isValidSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return false
  
  // Check if slug contains only allowed characters
  const slugPattern = /^[a-z0-9-]+$/
  return slugPattern.test(slug) && slug.length > 0 && slug.length <= 50
}

/**
 * Generate unique slug by appending number if duplicate exists
 * @param {string} name - Website name
 * @param {Array} existingSlugs - Array of existing slugs to check against
 * @returns {string} - Unique slug
 */
export const generateUniqueSlug = (name, existingSlugs = []) => {
  let baseSlug = generateSlug(name)
  let finalSlug = baseSlug
  let counter = 1
  
  while (existingSlugs.includes(finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`
    counter++
  }
  
  return finalSlug
} 