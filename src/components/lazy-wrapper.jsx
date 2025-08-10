import React, { Suspense } from 'react'
import { PageLoader } from './loading-screen'

const LazyWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
)

export default LazyWrapper 