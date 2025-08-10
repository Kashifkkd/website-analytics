import React, { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LazyWrapper from '../components/lazy-wrapper'
import RootLayout from '../layouts/root-layout'
import ProtectedLayout from '../layouts/protected-layout'
import AuthLayout from '../layouts/auth-layout'
import DashboardLayout from '../layouts/dashboard-layout'

// Lazy load page components
const DashboardPage = lazy(() => import('../pages/dashboard-page'))
const AnalyticsPage = lazy(() => import('../pages/analytics-page'))
const AuthPage = lazy(() => import('../pages/auth-page'))
const NotFoundPage = lazy(() => import('../pages/not-found'))

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: (
      <LazyWrapper>
        <NotFoundPage />
      </LazyWrapper>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'home',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'login',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <AuthPage />
              </LazyWrapper>
            )
          }
        ]
      },
      {
        path: 'signup',
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: (
              <LazyWrapper>
                <AuthPage />
              </LazyWrapper>
            )
          }
        ]
      },
      {
        path: 'dashboard',
        element: <ProtectedLayout />,
        children: [
          {
            path: '',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: (
                  <LazyWrapper>
                    <DashboardPage />
                  </LazyWrapper>
                )
              },
              {
                path: ':websiteId',
                element: (
                  <LazyWrapper>
                    <AnalyticsPage />
                  </LazyWrapper>
                )
              }
            ]
          }
        ]
      },
      {
        path: '*',
        element: (
          <LazyWrapper>
            <NotFoundPage />
          </LazyWrapper>
        )
      }
    ]
  }
])

export { router } 