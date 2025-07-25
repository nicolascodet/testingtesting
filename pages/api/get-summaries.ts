import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const N8N_GET_SUMMARIES_WEBHOOK = process.env.N8N_GET_SUMMARIES_WEBHOOK || 'YOUR_N8N_GET_SUMMARIES_WEBHOOK_URL_HERE'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await axios.get(N8N_GET_SUMMARIES_WEBHOOK)
    
    const summaries = response.data.map((item: any) => ({
      id: item.id || Date.now().toString(),
      message: item.message || '',
      summary: item.summary || '',
      timestamp: item.timestamp || new Date().toISOString()
    }))

    res.status(200).json({ summaries })
  } catch (error) {
    console.error('Error fetching summaries from n8n:', error)
    res.status(500).json({ error: 'Failed to fetch summaries' })
  }
}