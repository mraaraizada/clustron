import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { FiArrowLeft, FiRefreshCw } from 'react-icons/fi'

const API_URL = 'http://localhost:5001/api'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [method, setMethod] = useState('KMeans')
  const [nClusters, setNClusters] = useState(4)
  const [clusterData, setClusterData] = useState(null)

  const fetchClusterData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/cluster`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, n_clusters: nClusters })
      })
      
      if (!response.ok) throw new Error('Failed to fetch cluster data')
      
      const data = await response.json()
      setClusterData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClusterData()
  }, [])

  const handleAnalyze = () => {
    fetchClusterData()
  }

  const pieData = clusterData?.cluster_counts 
    ? Object.entries(clusterData.cluster_counts).map(([key, value]) => ({
        name: `Cluster ${parseInt(key) + 1}`,
        value,
        color: ['#7C3AED', '#A855F7', '#C084FC', '#E9D5FF'][parseInt(key) % 4]
      }))
    : []

  const scatterData = clusterData?.pca_2d
    ? clusterData.pca_2d.x.map((x, i) => ({
        x,
        y: clusterData.pca_2d.y[i],
        cluster: clusterData.pca_2d.clusters[i]
      }))
    : []

  // Group scatter data by cluster for colored visualization
  const clusterColors = ['#7C3AED', '#A855F7', '#C084FC', '#E9D5FF', '#F3E8FF', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED']
  const scatterByCluster = {}
  scatterData.forEach(point => {
    if (!scatterByCluster[point.cluster]) {
      scatterByCluster[point.cluster] = []
    }
    scatterByCluster[point.cluster].push(point)
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA' }}>
      {/* Header - Fixed at top */}
      <div className="w-full" style={{ background: '#F8F9FA', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-sm" style={{ color: '#7C3AED' }}>
              <FiArrowLeft /> Back
            </Link>
            <h1 style={{ fontSize: '28px', fontFamily: 'Poppins, sans-serif', color: '#1E1B4B', fontWeight: 700, textAlign: 'center', flex: 1, margin: 0 }}>
              Customer Analytics Dashboard
            </h1>
            <div style={{ width: '60px' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 100px)' }}>
        <div className="w-full max-w-7xl mx-auto px-8 py-8">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Left Side - Results */}
          <div className="lg:col-span-3">
            {/* Error State */}
            {error && (
              <div className="glass-card p-6 mb-8" style={{ borderLeft: '4px solid #EF4444' }}>
                <p style={{ color: '#EF4444' }}>Error: {error}</p>
                <p className="text-sm mt-2" style={{ color: '#64748B' }}>
                  Make sure the Flask backend is running on port 5001
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && !clusterData && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#7C3AED' }}></div>
              </div>
            )}

            {/* Results */}
            {!loading && clusterData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Charts */}
                <div className="flex flex-col gap-6">
                  {/* PCA Scatter Plot */}
                  <div className="glass-card p-6">
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E1B4B', marginBottom: '16px' }}>
                      PCA Cluster Visualization
                    </h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.08)" />
                        <XAxis dataKey="x" name="PC1" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                        <YAxis dataKey="y" name="PC2" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: '14px',
                            border: 'none',
                            background: 'rgba(255,255,255,0.97)',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                            padding: '10px 14px',
                            fontSize: '13px'
                          }}
                          formatter={(value, name) => [value.toFixed(2), name]}
                        />
                        <Legend 
                          wrapperStyle={{
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            paddingTop: '8px'
                          }}
                        />
                        {Object.entries(scatterByCluster).map(([cluster, data]) => (
                          <Scatter
                            key={cluster}
                            name={`Cluster ${parseInt(cluster) + 1}`}
                            data={data}
                            fill={clusterColors[parseInt(cluster) % clusterColors.length]}
                            opacity={0.7}
                          />
                        ))}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="glass-card p-6">
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E1B4B', marginBottom: '16px' }}>
                      Cluster Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          paddingAngle={3}
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
                            fontSize: '13px'
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            paddingTop: '16px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Side - Controls */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col gap-6">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#64748B' }}>
                      Clustering Method
                    </label>
                    <select
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#E2E8F0' }}
                    >
                      <option value="KMeans">KMeans</option>
                      <option value="Agglomerative">Agglomerative</option>
                      <option value="GaussianMixture">Gaussian Mixture</option>
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#64748B' }}>
                      Number of Clusters
                    </label>
                    <input
                      type="number"
                      min="2"
                      max="10"
                      value={nClusters}
                      onChange={(e) => setNClusters(parseInt(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border"
                      style={{ borderColor: '#E2E8F0' }}
                    />
                  </div>

                  <div className="w-full">
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="btn-primary w-full"
                    >
                      {loading ? 'Analyzing...' : (
                        <>
                          <FiRefreshCw /> Analyze
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Metrics Cards */}
              {!loading && clusterData && (
                <>
                  <div className="glass-card p-6">
                    <p className="text-sm mb-2" style={{ color: '#64748B' }}>Total Customers</p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#1E1B4B' }}>
                      {clusterData.total_customers?.toLocaleString()}
                    </p>
                  </div>

                  <div className="glass-card p-6">
                    <p className="text-sm mb-2" style={{ color: '#64748B' }}>Clusters Found</p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#7C3AED' }}>
                      {Object.keys(clusterData.cluster_counts || {}).length}
                    </p>
                  </div>

                  <div className="glass-card p-6">
                    <p className="text-sm mb-2" style={{ color: '#64748B' }}>Silhouette Score</p>
                    <p style={{ fontSize: '32px', fontWeight: 700, color: '#A855F7' }}>
                      {clusterData.silhouette_score?.toFixed(3) || 'N/A'}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
