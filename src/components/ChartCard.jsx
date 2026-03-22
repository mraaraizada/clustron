import { motion } from 'framer-motion'

export default function ChartCard({ title, subtitle, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-8"
      style={{ boxShadow: '0 4px 28px rgba(124,58,237,0.07)' }}
    >
      <div className="mb-6">
        <h4
          className="font-semibold"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', color: '#1E1B4B', lineHeight: '1.4' }}
        >
          {title}
        </h4>
        {subtitle && (
          <p
            className="mt-1.5"
            style={{ fontSize: '13px', color: '#94A3B8', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  )
}
