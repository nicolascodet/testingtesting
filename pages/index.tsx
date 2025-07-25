import { useState, useEffect } from 'react'
import axios from 'axios'

interface Summary {
  id: string
  message: string
  summary: string
  sender?: string
  timestamp: string
}

export default function Home() {
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [fetchingData, setFetchingData] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const fetchSummaries = async () => {
    setFetchingData(true)
    try {
      const response = await axios.get('/api/get-summaries')
      setSummaries(response.data.summaries || [])
    } catch (error) {
      console.error('Error fetching summaries:', error)
    } finally {
      setFetchingData(false)
    }
  }

  useEffect(() => {
    fetchSummaries()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 float-animation">
          <h1 className="text-6xl sm:text-7xl font-bold mb-6">
            <span className="gradient-text">Email AI</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your inbox with AI-powered summaries. Get instant insights from your emails.
          </p>
        </div>

        {/* Main Action Card */}
        <div className="mb-12">
          <div className="glass rounded-3xl p-8 glow hover:shadow-2xl transition-all duration-300">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glass-heavy mb-4">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">
                Ready to unlock your email insights?
              </h2>
              
              <button
                onClick={fetchSummaries}
                disabled={fetchingData}
                className={`
                  relative px-12 py-4 rounded-full font-semibold text-lg
                  button-gradient text-white
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shimmer overflow-hidden
                  ${fetchingData ? '' : 'pulse-glow'}
                `}
              >
                <span className="relative z-10">
                  {fetchingData ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Magic...
                    </span>
                  ) : (
                    '✨ Summarize My Email'
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Summaries Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Your Summaries</span>
          </h2>
          
          {summaries.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass-heavy mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg">Your email summaries will appear here</p>
              <p className="text-gray-500 text-sm mt-2">Click the button above to get started</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {summaries.map((summary, index) => (
                <div
                  key={summary.id}
                  className={`
                    glass rounded-2xl p-6 card-hover cursor-pointer
                    transform transition-all duration-500
                    ${hoveredCard === summary.id ? 'scale-105' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                  onMouseEnter={() => setHoveredCard(summary.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full glass-heavy flex items-center justify-center">
                        <span className="text-purple-400 font-semibold">
                          {summary.sender?.[0]?.toUpperCase() || '?'}
                        </span>
                      </div>
                      <div>
                        {summary.sender && (
                          <p className="text-sm font-medium text-gray-300">{summary.sender}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {new Date(summary.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">Subject</h3>
                    <p className="text-gray-100 line-clamp-2">{summary.message}</p>
                  </div>

                  {/* Summary */}
                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      AI Summary
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-4">{summary.summary}</p>
                  </div>

                  {/* Hover Effect */}
                  {hoveredCard === summary.id && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Powered by AI • Built with Next.js</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}