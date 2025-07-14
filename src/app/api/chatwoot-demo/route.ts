import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to read the knowledge base from the markdown file
function getKnowledgeBase(): string {
  try {
    const filePath = path.join(process.cwd(), 'rhythmiq-knowledge-base.md');
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading knowledge base file:', error);
    return 'Knowledge base not available.';
  }
}

async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    const knowledgeBase = getKnowledgeBase();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful customer support assistant for Rhythmiq AI platform. Use the following knowledge base to answer customer questions accurately and professionally. Always be helpful, concise, and accurate. If you don't know something, say so rather than making up information. If the user asks a question that is not related to the knowledge base, say that you are not allowed to answer that question.

Knowledge Base:
${knowledgeBase}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "I'm sorry, I'm experiencing technical difficulties. Please try again later.";
  }
}

// Function to send response back to customer via Chatwoot API
async function sendResponseToCustomer(
  accountId: number,
  conversationId: number,
  message: string,
  accessToken: string,
  chatwootBaseUrl: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `${chatwootBaseUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api_access_token': accessToken,
        },
        body: JSON.stringify({
          content: message,
          message_type: 'outgoing',
          private: false,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to send message to Chatwoot:', response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    console.log('Message sent successfully to Chatwoot:', result);
    return true;
  } catch (error) {
    console.error('Error sending message to Chatwoot:', error);
    return false;
  }
}

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
    const account = body.account;
    
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
    
    // Generate AI response if it's an incoming message from a customer
    let aiResponse = null;
    let messageSent = false;
    
    if (eventType === 'message_created' && message && message.message_type === 'incoming') {
      console.log('Generating AI response for customer message...');
      aiResponse = await generateAIResponse(message.content);
      console.log('AI Response:', aiResponse);
      
      // Send the response back to the customer via Chatwoot API
      if (aiResponse && conversation && account) {
        const chatwootBaseUrl = process.env.CHATWOOT_BASE_URL || 'https://app.chatwoot.com';
        const accessToken = process.env.CHATWOOT_ACCESS_TOKEN;
        
        if (accessToken) {
          messageSent = await sendResponseToCustomer(
            account.id,
            conversation.id,
            aiResponse,
            accessToken,
            chatwootBaseUrl
          );
        } else {
          console.error('CHATWOOT_ACCESS_TOKEN not configured');
        }
      }
    }
    
    console.log('=== End Chatwoot Webhook ===\n');
    
    // Return a success response to Chatwoot webhook
    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString(),
        aiResponse: aiResponse,
        messageSent: messageSent
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