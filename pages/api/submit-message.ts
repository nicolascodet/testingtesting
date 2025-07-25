import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL_HERE'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const response = await axios.post(N8N_WEBHOOK_URL, {
      message,
      timestamp: new Date().toISOString()
    })

    res.status(200).json({ success: true, data: response.data })
  } catch (error) {
    console.error('Error sending to n8n:', error)
    res.status(500).json({ error: 'Failed to process message' })
  }
}