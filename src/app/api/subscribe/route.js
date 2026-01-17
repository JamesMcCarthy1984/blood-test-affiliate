import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, phone, marketing } = await request.json();

  if (!email || !marketing) {
    return NextResponse.json(
      { error: 'Email and marketing consent are required' },
      { status: 400 }
    );
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      PHONE: phone || '',
    },
    tags: ['Website Signup'],
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Mailchimp error:', result);
      return NextResponse.json(
        { error: result.title || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
