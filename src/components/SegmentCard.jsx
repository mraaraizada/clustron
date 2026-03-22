import { motion } from 'framer-motion'
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts'

export default function SegmentCard({ segment, index }) {
  const chartData = segment.data.map((val, i) => ({ val, i }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5, boxShadow: '0 20px 52px rgba(124,58,237,0.14)' }}
      className="glass-card p-6 cursor-default flex flex-col gap-4"
      style={{ boxShadow: '0 4px 20px rgba(124,58,237,0.06)' }}
    >
      {/* Top row: avatar + trend badge */}
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0"
          style={{ background: segment.bgColor, color: segment.color }}
        >
          {segment.name[0]}
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: segment.trendUp ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: segment.trendUp ? '#16A34A' : '#DC2626',
          }}
        >
          {segment.trend}
        </span>
      </div>

      {/* Name + tag */}
      <div>
        <h4
          className="font-bold leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#1E1B4B' }}
        >
          {segment.name}
        </h4>
        <span
          className="text-xs font-medium px-2.5 py-0.5 rounded-full inline-block mt-2"
          style={{ background: segment.bgColor, color: segment.color }}
        >
          {segment.tag}
        </span>
      </div>

      {/* Count */}
      <div>
        <div
          className="font-bold text-2xl leading-none"
          style={{ fontFamily: 'Poppins, sans-serif', color: '#1E1B4B' }}
        >
          {segment.count.toLocaleString()}
        </div>
        <div className="text-xs mt-1" style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif' }}>
          customers
        </div>
      </div>

      {/* Mini sparkline */}
      <ResponsiveContainer width="100%" height={48}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="val"
            stroke={segment.color}
            strokeWidth={2.5}
            dot={false}
          />
          <Tooltip contentStyle={{ display: 'none' }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
