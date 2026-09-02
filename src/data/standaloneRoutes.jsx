/* eslint-disable react/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const Auth = {
  SignIn: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.SignIn }))),
  SignUp: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.SignUp }))),
  ResetPassword: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.ResetPassword }))),
  CreatePassword: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.CreatePassword }))),
  LockScreen: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.LockScreen }))),
  TwoStep: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.TwoStep }))),
  ComingSoon: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.ComingSoonPage }))),
  UnderMaintenance: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.UnderMaintenance }))),
  Offline: lazy(() => import('../Pages/Auth/AuthPages').then((m) => ({ default: m.Offline }))),
}
const ErrorPage = lazy(() => import('../Pages/Errors/ErrorPage'))
const Landing = lazy(() => import('../Pages/Landing'))

const pair = (base, Cmp) => [
  <Route key={base} path={base} element={<Cmp />} />,
  <Route key={base + '/split'} path={base + '/split'} element={<Cmp split />} />,
]

export const standaloneRoutePaths = [
  '/auth/sign-in', '/auth/sign-in/split',
  '/auth/sign-up', '/auth/sign-up/split',
  '/auth/reset-password', '/auth/reset-password/split',
  '/auth/create-password', '/auth/create-password/split',
  '/auth/lock-screen', '/auth/lock-screen/split',
  '/auth/two-step', '/auth/two-step/split',
  '/auth/coming-soon', '/auth/under-maintenance', '/auth/offline',
  '/error/401', '/error/404', '/error/500',
  '/pages/landing',
]

export const standaloneRoutes = [
  ...pair('/auth/sign-in', Auth.SignIn),
  ...pair('/auth/sign-up', Auth.SignUp),
  ...pair('/auth/reset-password', Auth.ResetPassword),
  ...pair('/auth/create-password', Auth.CreatePassword),
  ...pair('/auth/lock-screen', Auth.LockScreen),
  ...pair('/auth/two-step', Auth.TwoStep),
  <Route key="/auth/coming-soon" path="/auth/coming-soon" element={<Auth.ComingSoon />} />,
  <Route key="/auth/under-maintenance" path="/auth/under-maintenance" element={<Auth.UnderMaintenance />} />,
  <Route key="/auth/offline" path="/auth/offline" element={<Auth.Offline />} />,
  <Route key="/error/401" path="/error/401" element={<ErrorPage code={401} />} />,
  <Route key="/error/404" path="/error/404" element={<ErrorPage code={404} />} />,
  <Route key="/error/500" path="/error/500" element={<ErrorPage code={500} />} />,
  <Route key="/pages/landing" path="/pages/landing" element={<Landing />} />,
]
