import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const N8N_GET_WEBHOOK_URL = process.env.N8N_GET_WEBHOOK_URL || 'YOUR_N8N_GET_WEBHOOK_URL_HERE'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(N8N_GET_WEBHOOK_URL)
    
    // Handle both single object and array responses
    const data = Array.isArray(response.data) ? response.data : [response.data]
    
    const summaries = data.map((item: any, index: number) => ({
      id: item.id || `${Date.now()}-${index}`,
      message: item.subject || item.message || '',
      summary: item.summary || '',
      sender: item.sender || '',
      timestamp: item.timestamp || new Date().toISOString()
    }))

    res.status(200).json({ summaries })
  } catch (error) {
    console.error('Error fetching summaries from n8n:', error)
    res.status(500).json({ error: 'Failed to fetch summaries' })
  }
}