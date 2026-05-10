import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()

  return (
    <div className="theme-shell" data-theme={theme}>
      <div className="lg:flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="min-h-screen min-w-0 flex-1">
          <Navbar
            onMenuClick={() => setIsSidebarOpen(true)}
            setTheme={setTheme}
            theme={theme}
          />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                initial={{ opacity: 0, y: 12 }}
                key={location.pathname}
                transition={{ duration: 0.22 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}
