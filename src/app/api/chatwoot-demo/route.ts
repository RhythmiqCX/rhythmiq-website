import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming webhook payload
    const body = await request.json();
    
    // Log the entire webhook payload for debugging
    console.log('=== Chatwoot Webhook Received ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Full payload:', JSON.stringify(body, null, 2));
    
    // Extract relevant information based on Chatwoot webhook structure
    const eventType = body.event;
    const conversation = body.conversation;
    const message = body.message;
    
    console.log('Event Type:', eventType);
    
    if (conversation) {
      console.log('Conversation ID:', conversation.id);
      console.log('Conversation Status:', conversation.status);
      console.log('Conversation Inbox ID:', conversation.inbox_id);
    }
    
    if (message) {
      console.log('Message ID:', message.id);
      console.log('Message Content:', message.content);
      console.log('Message Type:', message.message_type);
      console.log('Sender Type:', message.sender_type);
      console.log('Sender ID:', message.sender_id);
    }
    
    console.log('=== End Chatwoot Webhook ===\n');
    
    // Return a success response to Chatwoot
    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing Chatwoot webhook:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to process webhook',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing the endpoint)
export async function GET() {
  return NextResponse.json(
    { 
      status: 'success', 
      message: 'Chatwoot webhook endpoint is active',
      endpoint: '/api/chatwoot-demo',
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
} 