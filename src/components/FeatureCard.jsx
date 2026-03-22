import { motion } from 'framer-motion'

export default function FeatureCard({ icon, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(124,58,237,0.14)' }}
      className="glass-card p-10 cursor-default"
      style={{ boxShadow: '0 4px 28px rgba(124,58,237,0.07)' }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-7 text-3xl"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.12))' }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="font-bold mb-4"
        style={{ fontSize: '20px', fontFamily: 'Poppins, sans-serif', color: '#1E1B4B', lineHeight: '1.3' }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '15px',
          color: '#64748B',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.8',
        }}
      >
        {description}
      </p>

      {/* Link */}
      <div
        className="mt-7 flex items-center gap-1.5 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-70"
        style={{ color: '#7C3AED' }}
      >
        Learn more →
      </div>
    </motion.div>
  )
}
