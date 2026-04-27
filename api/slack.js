export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, referrer, currentUrl } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Extract Vercel Geolocation & IP Headers
  const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || 'Unknown IP';
  const city = req.headers['x-vercel-ip-city'] || 'Unknown City';
  const region = req.headers['x-vercel-ip-country-region'] || 'Unknown Region';
  const country = req.headers['x-vercel-ip-country'] || 'Unknown Country';

  const SLACK_TOKEN = process.env.SLACK_TOKEN;
  const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID || 'C0A4U132203';

  if (!SLACK_TOKEN) {
    console.error('SLACK_TOKEN environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const messageText = [
    `*New WhatStack Pro Lead* 🚀`,
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    ``,
    `*🌍 Location & Tracing:*`,
    `• *IP:* ${ip}`,
    `• *Location:* ${city}, ${region}, ${country}`,
    `• *Source (Referrer):* ${referrer || 'Direct'}`,
    `• *Signup Page:* ${currentUrl || 'Unknown'}`
  ].join('\n');

  try {
    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SLACK_TOKEN}`
      },
      body: JSON.stringify({
        channel: SLACK_CHANNEL_ID,
        text: messageText,
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
