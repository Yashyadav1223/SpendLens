import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'

const AuditInputPage = lazy(() =>
  import('../pages/AuditInputPage').then((module) => ({
    default: module.AuditInputPage,
  })),
)
const AuditResultsPage = lazy(() =>
  import('../pages/AuditResultsPage').then((module) => ({
    default: module.AuditResultsPage,
  })),
)
const BenchmarksPage = lazy(() =>
  import('../pages/BenchmarksPage').then((module) => ({
    default: module.BenchmarksPage,
  })),
)
const InsightsPage = lazy(() =>
  import('../pages/InsightsPage').then((module) => ({
    default: module.InsightsPage,
  })),
)
const LandingPage = lazy(() =>
  import('../pages/LandingPage').then((module) => ({
    default: module.LandingPage,
  })),
)
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((module) => ({
    default: module.LoginPage,
  })),
)
const SettingsPage = lazy(() =>
  import('../pages/SettingsPage').then((module) => ({
    default: module.SettingsPage,
  })),
)
const ShareableReportPage = lazy(() =>
  import('../pages/ShareableReportPage').then((module) => ({
    default: module.ShareableReportPage,
  })),
)
const SignupPage = lazy(() =>
  import('../pages/SignupPage').then((module) => ({
    default: module.SignupPage,
  })),
)

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/report" element={<ShareableReportPage />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<AuditResultsPage />} />
          <Route path="audit" element={<AuditInputPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="report" element={<ShareableReportPage embedded />} />
          <Route path="benchmarks" element={<BenchmarksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

function RouteFallback() {
  return (
    <div className="theme-shell grid min-h-screen place-items-center">
      <div className="h-12 w-12 animate-pulse rounded-2xl bg-fintech-gradient shadow-glow" />
    </div>
  )
}
