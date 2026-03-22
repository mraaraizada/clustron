import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        background: scrolled 
          ? 'rgba(15, 23, 42, 0.8)' 
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}
    >
      <div style={{ width: '100%', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Logo - Far Left Corner */}
        <Link to="/" className="flex items-center gap-2.5 no-underline group" style={{ flexShrink: 0 }}>
          <img 
            src="/logo.png" 
            alt="Clustron Logo" 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              transition: 'transform 0.3s'
            }}
            className="group-hover:scale-110"
          />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ 
              fontFamily: 'Poppins, sans-serif', 
              color: '#ffffff',
              transition: 'color 0.3s'
            }}
          >
            Clustron
          </span>
        </Link>

        {/* CTA buttons - Far Right Corner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <button
            style={{ 
              padding: '10px 24px', 
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              background: 'transparent',
              color: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            Sign In
          </button>
          <Link to="/dashboard">
            <button
              style={{ 
                padding: '10px 24px', 
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-1px)'
                e.target.style.boxShadow = '0 6px 20px rgba(124,58,237,0.5)'
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(124,58,237,0.4)'
              }}
            >
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
