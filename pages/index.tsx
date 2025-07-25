import { useState, useEffect } from 'react'
import axios from 'axios'

interface Summary {
  id: string
  message: string
  summary: string
  timestamp: string
}

export default function Home() {
  const [message, setMessage] = useState('')
  const [summaries, setSummaries] = useState<Summary[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      const response = await axios.post('/api/submit-message', { message })
      
      if (response.data.success) {
        alert('Message submitted successfully!')
        setMessage('')
        fetchSummaries()
      }
    } catch (error) {
      console.error('Error submitting message:', error)
      alert('Failed to submit message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          N8N Message Summary System
        </h1>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit New Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter your message here..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
              {loading ? 'Submitting...' : 'Submit Message'}
            </button>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Message Summaries</h2>
            <button
              onClick={fetchSummaries}
              disabled={fetchingData}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              {fetchingData ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {summaries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No summaries available yet.</p>
          ) : (
            <div className="space-y-4">
              {summaries.map((summary) => (
                <div key={summary.id} className="border rounded-lg p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(summary.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900">Original Message:</h3>
                    <p className="text-gray-700">{summary.message}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Summary:</h3>
                    <p className="text-gray-700">{summary.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}