# Email Summary System

A Next.js application that fetches and displays email summaries from n8n workflow.

## Environment Variables

Add this to your Vercel environment variables:

```
N8N_GET_WEBHOOK_URL=https://thunderbird-labs.app.n8n.cloud/webhook/493fd04d-9773-43b8-8b5a-32b80529eb50
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with the webhook URL above

3. Run development server:
```bash
npm run dev
```

## How it Works

- Click "Summarize My Email" button
- Fetches email summaries from n8n webhook
- Displays sender, subject, and AI-generated summary