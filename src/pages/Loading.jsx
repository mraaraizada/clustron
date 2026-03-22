import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MdOutlineAnalytics } from 'react-icons/md'

const steps = [
  'Initializing Data Engine...',
  'Loading Customer Segments...',
  'Processing RFM Scores...',
  'Preparing Dashboard...',
  'Ready!',
]

export default function Loading() {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1
        if (next >= steps.length) {
          clearInterval(interval)
          setTimeout(() => navigate('/'), 600)
        }
        return next < steps.length ? next : prev
      })
      setProgress((prev) => Math.min(prev + 22, 100))
    }, 800)
    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #7C3AED 0%, #1E1B4B 70%)' }}
    >
      {/* Animated rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border-2"
          style={{
            width: 100 + i * 80,
            height: 100 + i * 80,
            borderColor: `rgba(168,85,247,${0.4 - i * 0.1})`,
            borderStyle: i === 1 ? 'solid' : i === 2 ? 'dashed' : 'dotted',
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          className="absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            background: 'rgba(168,85,247,0.7)',
            left: `${10 + (i * 7) % 80}%`,
            top: `${10 + (i * 11) % 80}%`,
          }}
        />
      ))}

      {/* Center content */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)', boxShadow: '0 0 40px rgba(168,85,247,0.6)' }}
        >
          <MdOutlineAnalytics className="text-white text-4xl" />
        </motion.div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="font-extrabold tracking-widest text-white" style={{ fontSize: '42px', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.15em' }}>
            CLUSTRON
          </h1>
          <p className="text-purple-300 tracking-widest text-sm mt-3" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}>
            AI Analytics Engine
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-72 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #A855F7, #7C3AED)' }}
          />
        </div>

        {/* Step text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}
          >
            {steps[stepIndex]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
