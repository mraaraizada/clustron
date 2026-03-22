import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const pieData = [
  { name: 'Platinum', value: 18, color: '#7C3AED' },
  { name: 'Loyal',    value: 24, color: '#9333EA' },
  { name: 'Potential',value: 28, color: '#A855F7' },
  { name: 'At Risk',  value: 16, color: '#EC4899' },
  { name: 'Lost',     value: 14, color: '#EF4444' },
]

const floatingCards = [
  { label: 'Total Customers', value: '12,480', icon: '👥', top: '6%',  left: '-4%'  },
  { label: 'Revenue',         value: '$2.4M',  icon: '💰', top: '62%', right: '-4%' },
  { label: 'Segments',        value: '11',     icon: '🎯', bottom: '2%', left: '8%' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '88px' }}>
      {/* Background blobs */}
      <div className="gradient-blob w-[520px] h-[520px]" style={{ background: '#A855F7', top: '-60px', right: '-80px' }} />
      <div className="gradient-blob w-80 h-80"             style={{ background: '#7C3AED', bottom: '40px', left: '-40px' }} />

      <div className="max-w-7xl mx-auto px-8 w-full grid md:grid-cols-2 gap-16 items-center relative z-10 py-20">

        {/* ── Left ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 mb-7"
            style={{ background: 'rgba(124,58,237,0.09)', color: '#7C3AED', fontFamily: 'Inter, sans-serif', fontSize: '13.5px', fontWeight: 500 }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#7C3AED' }} />
            AI-Powered Customer Analytics
          </motion.div>

          {/* Headline */}
          <h1 style={{ fontSize: '54px', lineHeight: '1.12', fontFamily: 'Poppins, sans-serif', color: '#1E1B4B', fontWeight: 800 }}>
            Transform Customer Data
            <br />
            <span className="gradient-text">Into Actionable</span>
            <br />
            Insights
          </h1>

          {/* Sub-text */}
          <p
            className="mt-7"
            style={{
              color: '#64748B',
              fontFamily: 'Inter, sans-serif',
              fontSize: '17px',
              lineHeight: '1.8',
              maxWidth: '460px',
            }}
          >
            Clustron analyzes customer transactions using RFM modeling
            to uncover high-value segments and growth opportunities.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10">
            <Link to="/dashboard">
              <button className="btn-primary">
                Start Analysis <FiArrowRight />
              </button>
            </Link>
            <button className="btn-secondary">
              <FiPlay /> Watch Demo
            </button>
          </div>

          {/* Stats row */}
          <div
            className="flex gap-10 mt-14 pt-10"
            style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}
          >
            {[
              { val: '12K+', label: 'Customers Analyzed' },
              { val: '11',   label: 'Segments'           },
              { val: '98%',  label: 'Accuracy'           },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-bold gradient-text"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {s.val}
                </div>
                <div
                  className="text-sm mt-1.5"
                  style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right — chart illustration ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
          style={{ minHeight: '500px' }}
        >
          {/* Main chart card */}
          <motion.div
            animate={{ y: [-7, 7, -7] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-card p-8"
            style={{ width: '360px', boxShadow: '0 24px 70px rgba(124,58,237,0.18)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <span
                className="font-semibold"
                style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1B4B', fontSize: '15px' }}
              >
                Customer Segments
              </span>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }}
              >
                ● Live
              </span>
            </div>

            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '14px',
                    border: 'none',
                    background: 'rgba(255,255,255,0.97)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                    padding: '10px 14px',
                    fontSize: '13px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-xs" style={{ color: '#64748B', fontFamily: 'Inter, sans-serif' }}>
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating metric cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 3.2 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
              className="absolute glass-card px-5 py-3.5 shadow-xl flex items-center gap-3.5"
              style={{
                top: card.top, left: card.left, right: card.right, bottom: card.bottom,
                minWidth: '155px',
                boxShadow: '0 8px 32px rgba(124,58,237,0.13)',
              }}
            >
              <span className="text-2xl">{card.icon}</span>
              <div>
                <div
                  className="font-bold text-sm"
                  style={{ color: '#1E1B4B', fontFamily: 'Poppins, sans-serif' }}
                >
                  {card.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{card.label}</div>
              </div>
            </motion.div>
          ))}

          {/* Decorative pulsing dots */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.2 + i * 0.5, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: 9 + i * 5,
                height: 9 + i * 5,
                background: `rgba(168,85,247,${0.35 + i * 0.1})`,
                top: `${18 + i * 16}%`,
                right: `${8 + i * 2}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
