import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MdOutlineAnalytics,
  MdDashboard,
  MdPeople,
  MdReceipt,
  MdLightbulb,
  MdBarChart,
  MdSettings,
  MdMenu,
  MdClose,
  MdOutlineNotifications,
  MdSearch,
} from 'react-icons/md'

const navItems = [
  { label: 'Dashboard',         icon: <MdDashboard />, to: '/dashboard'              },
  { label: 'Customer Segments', icon: <MdPeople />,    to: '/dashboard/segments'     },
  { label: 'Transactions',      icon: <MdReceipt />,   to: '/dashboard/transactions' },
  { label: 'Insights',          icon: <MdLightbulb />, to: '/dashboard/insights'     },
  { label: 'Reports',           icon: <MdBarChart />,  to: '/dashboard/reports'      },
  { label: 'Settings',          icon: <MdSettings />,  to: '/dashboard/settings'     },
]

const SIDEBAR_W = 260

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen" style={{ background: '#F5F3FF' }}>

      {/* ── Sidebar ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -SIDEBAR_W }}
            animate={{ x: 0 }}
            exit={{ x: -SIDEBAR_W }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed left-0 top-0 bottom-0 z-40 flex flex-col"
            style={{ width: `${SIDEBAR_W}px`, background: '#1E1B4B', boxShadow: '4px 0 40px rgba(30,27,75,0.18)' }}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-3 px-7 py-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
              >
                <MdOutlineAnalytics className="text-white text-lg" />
              </div>
              <span
                className="font-bold text-white"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', letterSpacing: '-0.01em' }}
              >
                Clustron
              </span>
            </div>

            {/* Nav label */}
            <p
              className="px-7 mt-8 mb-3 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}
            >
              Main Menu
            </p>

            {/* Nav links */}
            <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto pb-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${
                      isActive
                        ? 'text-white'
                        : 'text-white/45 hover:text-white/80 hover:bg-white/5'
                    }`
                  }
                  style={({ isActive }) =>
                    isActive
                      ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)', fontFamily: 'Inter, sans-serif' }
                      : { fontFamily: 'Inter, sans-serif' }
                  }
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* User footer */}
            <div
              className="px-6 py-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}
                >
                  AC
                </div>
                <div className="min-w-0">
                  <div
                    className="text-white text-sm font-semibold truncate"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Admin
                  </div>
                  <div
                    className="text-xs truncate mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter, sans-serif' }}
                  >
                    analytics@clustron.ai
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ marginLeft: sidebarOpen ? `${SIDEBAR_W}px` : '0', transition: 'margin 0.3s ease' }}
      >
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: 'rgba(245,243,255,0.92)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderBottom: '1px solid rgba(124,58,237,0.09)',
          }}
        >
          <div className="flex items-center gap-4">
            {/* Toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}
            >
              {sidebarOpen ? <MdClose className="text-xl" /> : <MdMenu className="text-xl" />}
            </button>

            {/* Search */}
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
              <input
                type="text"
                placeholder="Search customers, segments…"
                className="pl-10 pr-5 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: 'rgba(124,58,237,0.06)',
                  border: '1px solid rgba(124,58,237,0.11)',
                  color: '#1E1B4B',
                  fontFamily: 'Inter, sans-serif',
                  width: '280px',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{ background: 'rgba(124,58,237,0.08)', color: '#7C3AED' }}
            >
              <MdOutlineNotifications className="text-xl" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: '#A855F7' }}
              />
            </button>

            {/* Home link */}
            <Link to="/">
              <button
                className="btn-secondary"
                style={{ padding: '8px 20px', fontSize: '13px' }}
              >
                ← Home
              </button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
