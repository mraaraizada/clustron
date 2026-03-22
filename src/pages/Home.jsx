import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FiArrowRight, FiDatabase, FiCpu, FiTrendingUp } from 'react-icons/fi'
import { BiNetworkChart } from 'react-icons/bi'
import { SiPython, SiScikitlearn, SiFlask, SiPandas } from 'react-icons/si'

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', position: 'relative', overflow: 'hidden' }}>
      <Navbar />
      
      {/* Animated background elements */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)' }} />

      {/* Main Hero Section - Centered */}
      <section style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '72px',
              fontWeight: 800,
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '1.1',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #A855F7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Customer Segmentation
            <br />
            Platform
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto 48px',
              fontWeight: 400
            }}
          >
            Advanced machine learning algorithms for intelligent customer clustering.
            Powered by KMeans, Agglomerative, and Gaussian Mixture Models.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px' }}
          >
            <Link to="/dashboard">
              <button style={{
                padding: '18px 40px',
                fontSize: '16px',
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 40px rgba(124,58,237,0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 15px 50px rgba(124,58,237,0.5)'
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 10px 40px rgba(124,58,237,0.4)'
              }}
              >
                Start Analyzing <FiArrowRight />
              </button>
            </Link>
            
            <button style={{
              padding: '18px 40px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              background: 'rgba(255,255,255,0.05)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255,255,255,0.1)'
              e.target.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255,255,255,0.05)'
              e.target.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
            >
              View Documentation
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginBottom: '64px'
            }}
          >
            {[
              {
                icon: <BiNetworkChart style={{ fontSize: '32px', color: '#A855F7' }} />,
                title: 'Multiple Algorithms',
                description: 'KMeans, Agglomerative & Gaussian Mixture'
              },
              {
                icon: <FiDatabase style={{ fontSize: '32px', color: '#A855F7' }} />,
                title: 'PCA Visualization',
                description: '2D & 3D dimensionality reduction'
              },
              {
                icon: <FiTrendingUp style={{ fontSize: '32px', color: '#A855F7' }} />,
                title: 'Elbow Method',
                description: 'Optimal cluster number detection'
              },
              {
                icon: <FiCpu style={{ fontSize: '32px', color: '#A855F7' }} />,
                title: 'Silhouette Score',
                description: 'Cluster quality metrics'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{
                  padding: '32px',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  cursor: 'default'
                }}
              >
                <div style={{ marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#ffffff',
                  marginBottom: '8px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ textAlign: 'center' }}
          >
            <p style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '24px',
              fontWeight: 600
            }}>
              Powered By
            </p>
            <div style={{
              display: 'flex',
              gap: '40px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {[
                { icon: <SiPython style={{ fontSize: '36px', color: '#3776AB' }} />, name: 'Python' },
                { icon: <SiFlask style={{ fontSize: '36px', color: '#ffffff' }} />, name: 'Flask' },
                { icon: <SiScikitlearn style={{ fontSize: '36px', color: '#F7931E' }} />, name: 'Scikit-learn' },
                { icon: <SiPandas style={{ fontSize: '36px', color: '#150458' }} />, name: 'Pandas' }
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -3 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'default'
                  }}
                >
                  {tech.icon}
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <section style={{ padding: '120px 20px', background: 'rgba(15, 23, 42, 0.5)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff',
              marginBottom: '24px'
            }}>
              About Clustron
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.8',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Clustron is a powerful customer segmentation platform that leverages advanced machine learning 
              algorithms to help businesses understand their customer base. Built with Python, Flask, and 
              scikit-learn, it provides real-time clustering analysis with multiple algorithms.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {[
              {
                title: 'Machine Learning Powered',
                description: 'Utilizes KMeans, Agglomerative Clustering, and Gaussian Mixture Models for accurate customer segmentation.',
                icon: '🤖'
              },
              {
                title: 'Real-Time Analysis',
                description: 'Process customer data instantly with our high-performance Flask API backend and get immediate insights.',
                icon: '⚡'
              },
              {
                title: 'Visual Insights',
                description: 'PCA-based 2D and 3D visualizations help you understand cluster distributions and patterns easily.',
                icon: '📊'
              },
              {
                title: 'Quality Metrics',
                description: 'Silhouette scores and elbow method analysis ensure optimal cluster selection for your data.',
                icon: '📈'
              },
              {
                title: 'Scalable Architecture',
                description: 'Built to handle large datasets efficiently with StandardScaler normalization and optimized algorithms.',
                icon: '🚀'
              },
              {
                title: 'RESTful API',
                description: 'Easy integration with comprehensive API endpoints for clustering, segments, and data preview.',
                icon: '🔌'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  padding: '40px',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#ffffff',
                  marginBottom: '12px'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.7'
                }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '120px 20px', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: '#ffffff',
              marginBottom: '24px'
            }}>
              How It Works
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Simple, powerful workflow to segment your customers in minutes
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: '40px' }}>
            {[
              {
                title: 'Upload Customer Data',
                description: 'Import your customer dataset with features like purchase history, demographics, and behavior metrics. Our system automatically detects numeric columns for analysis.'
              },
              {
                title: 'Choose Algorithm',
                description: 'Select from KMeans for speed, Agglomerative for hierarchical relationships, or Gaussian Mixture for probabilistic clustering based on your needs.'
              },
              {
                title: 'Analyze Results',
                description: 'View cluster distributions, silhouette scores, and PCA visualizations. Use the elbow method to determine optimal cluster numbers.'
              },
              {
                title: 'Take Action',
                description: 'Export segments with detailed statistics and insights. Integrate results into your marketing campaigns and business strategies.'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: '24px',
                  alignItems: 'start',
                  padding: '40px',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px'
                }}
              >
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                  marginTop: '8px',
                  boxShadow: '0 0 20px rgba(124,58,237,0.5)'
                }}>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#ffffff',
                    marginBottom: '12px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.6)',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.7'
                  }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 20px', background: '#0F172A', borderTop: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Poppins, sans-serif', color: '#ffffff' }}>
                  Clustron
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
                AI-powered customer segmentation platform for data-driven business growth.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#ffffff', marginBottom: '16px' }}>
                Product
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Features', 'API', 'Documentation', 'Pricing'].map(item => (
                  <a key={item} href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#A855F7'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#ffffff', marginBottom: '16px' }}>
                Company
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                  <a key={item} href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#A855F7'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#ffffff', marginBottom: '16px' }}>
                Resources
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Help Center', 'Community', 'Status', 'Terms'].map(item => (
                  <a key={item} href="#" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#A855F7'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>
              © 2026 Clustron. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
