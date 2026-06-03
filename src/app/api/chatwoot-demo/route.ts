import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key-for-build',
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
    console.log('🔍 Generating AI response for message:', userMessage);
    const knowledgeBase = getKnowledgeBase();
    console.log('📚 Knowledge base loaded, length:', knowledgeBase.length);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful customer support assistant for Rhythmiq AI platform. Use the following knowledge base to answer customer questions accurately and professionally. Always be helpful, concise, and accurate. If you don't know something, say so rather than making up information.

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

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response at the moment.";
    console.log('🤖 AI Response generated:', response);
    return response;
  } catch (error) {
    console.error('❌ Error generating AI response:', error);
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
    console.log('📤 Attempting to send response to Chatwoot...');
    console.log('📍 Account ID:', accountId);
    console.log('📍 Conversation ID:', conversationId);
    console.log('📍 Message:', message);
    console.log('📍 Base URL:', chatwootBaseUrl);
    
    const apiUrl = `${chatwootBaseUrl}/api/v1/accounts/${accountId}/conversations/${conversationId}/messages`;
    console.log('🌐 API URL:', apiUrl);
    
    const requestBody = {
      content: message,
      message_type: 'outgoing',
      private: false,
    };
    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_access_token': accessToken,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to send message to Chatwoot:', response.status, response.statusText);
      console.error('❌ Error details:', errorText);
      return false;
    }

    const result = await response.json();
    console.log('✅ Message sent successfully to Chatwoot:', result);
    return true;
  } catch (error) {
    console.error('❌ Error sending message to Chatwoot:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 === Chatwoot Webhook Received ===');
    console.log('⏰ Timestamp:', new Date().toISOString());
    
    // Parse the incoming webhook payload
    const body = await request.json();
    console.log('📋 Full payload:', JSON.stringify(body, null, 2));
    
    // Extract relevant information based on Chatwoot webhook structure
    const eventType = body.event;
    const conversation = body.conversation;
    const account = body.account;
    const inbox = body.inbox;
    const sender = body.sender;
    
    // Extract message content from the correct location
    const messageContent = body.content;
    const messageType = body.message_type;
    const messageId = body.id;
    
    console.log('🔍 === Extracted Data ===');
    console.log('📅 Event Type:', eventType);
    console.log('💬 Message Content:', messageContent);
    console.log('📝 Message Type:', messageType);
    console.log('🆔 Message ID:', messageId);
    
    if (conversation) {
      console.log('💭 Conversation ID:', conversation.id);
      console.log('📊 Conversation Status:', conversation.status);
      console.log('📥 Conversation Inbox ID:', conversation.inbox_id);
      console.log('📈 Unread Count:', conversation.unread_count);
    }
    
    if (account) {
      console.log('🏢 Account ID:', account.id);
      console.log('🏢 Account Name:', account.name);
    }
    
    if (inbox) {
      console.log('📮 Inbox ID:', inbox.id);
      console.log('📮 Inbox Name:', inbox.name);
    }
    
    if (sender) {
      console.log('👤 Sender ID:', sender.id);
      console.log('👤 Sender Name:', sender.name);
      console.log('📧 Sender Email:', sender.email);
    }
    
    // Generate AI response if it's an incoming message from a customer
    let aiResponse = null;
    let messageSent = false;
    
    console.log('🔍 === Processing Logic ===');
    console.log('📋 Event type check:', eventType === 'message_created');
    console.log('📋 Message type check:', messageType === 'incoming');
    console.log('📋 Message content exists:', !!messageContent);
    
    if (eventType === 'message_created' && messageType === 'incoming' && messageContent) {
      console.log('✅ Conditions met - generating AI response...');
      aiResponse = await generateAIResponse(messageContent);
      
      // Send the response back to the customer via Chatwoot API
      if (aiResponse && conversation && account) {
        console.log('📤 === Sending Response ===');
        const chatwootBaseUrl = process.env.CHATWOOT_BASE_URL || 'https://app.chatwoot.com';
        const accessToken = process.env.CHATWOOT_ACCESS_TOKEN;
        
        console.log('🔑 Base URL configured:', chatwootBaseUrl);
        console.log('🔑 Access token configured:', !!accessToken);
        
        if (accessToken) {
          messageSent = await sendResponseToCustomer(
            account.id,
            conversation.id,
            aiResponse,
            accessToken,
            chatwootBaseUrl
          );
          console.log('📤 Message sent result:', messageSent);
        } else {
          console.error('❌ CHATWOOT_ACCESS_TOKEN not configured');
        }
      } else {
        console.log('❌ Missing required data for sending response:');
        console.log('  - AI Response:', !!aiResponse);
        console.log('  - Conversation:', !!conversation);
        console.log('  - Account:', !!account);
      }
    } else {
      console.log('❌ Conditions not met for AI response generation:');
      console.log('  - Event type is message_created:', eventType === 'message_created');
      console.log('  - Message type is incoming:', messageType === 'incoming');
      console.log('  - Message content exists:', !!messageContent);
    }
    
    console.log('🏁 === End Chatwoot Webhook ===\n');
    
    // Return a success response to Chatwoot webhook
    const responseData = { 
      status: 'success', 
      message: 'Webhook received successfully',
      timestamp: new Date().toISOString(),
      aiResponse: aiResponse,
      messageSent: messageSent,
      processed: {
        eventType,
        messageContent,
        messageType,
        conversationId: conversation?.id,
        accountId: account?.id
      }
    };
    
    console.log('📤 Returning response to Chatwoot:', JSON.stringify(responseData, null, 2));
    
    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error processing Chatwoot webhook:', error);
    
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