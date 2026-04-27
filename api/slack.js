export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID || 'C0A4U132203';

  if (!SLACK_TOKEN) {
    console.error('SLACK_TOKEN environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SLACK_TOKEN}`
      },
      body: JSON.stringify({
        channel: SLACK_CHANNEL_ID,
        text: `*New WhatStack Pro Lead* 🚀\n*Name:* ${name}\n*Email:* ${email}`,
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Slack API Error:', data);
      return res.status(500).json({ error: 'Failed to send message to Slack' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to Slack:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
