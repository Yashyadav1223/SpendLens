import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { AuditInputPage } from '../pages/AuditInputPage'
import { AuditResultsPage } from '../pages/AuditResultsPage'
import { BenchmarksPage } from '../pages/BenchmarksPage'
import { InsightsPage } from '../pages/InsightsPage'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { SettingsPage } from '../pages/SettingsPage'
import { ShareableReportPage } from '../pages/ShareableReportPage'
import { SignupPage } from '../pages/SignupPage'

export function AppRoutes() {
  return (
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
  )
}
