import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validate required fields
    if (!payload?.email || !payload?.name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    const { name, email, company, message, source } = payload;

    // Send email notification
    const emailBody = `
      <h2 style="color: #06b6d4; font-size: 24px; margin-bottom: 20px;">🎯 New Lead on Rhythmiq Website</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${company}</p>` : ''}
        ${message ? `<p style="margin: 8px 0;"><strong>Message:</strong> ${message}</p>` : ''}
        <p style="margin: 8px 0;"><strong>Source:</strong> ${source || 'unknown'}</p>
        <p style="margin: 8px 0; color: #6b7280; font-size: 14px;">
          <strong>Timestamp:</strong> ${new Date().toLocaleString()}
        </p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px; margin: 4px 0;">
          <strong>Quick Actions:</strong>
        </p>
        <a 
          href="mailto:${email}?subject=Re: Your Inquiry About Rhythmiq" 
          style="background: #06b6d4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;"
        >
          Reply via Email
        </a>
      </div>
    `;

    const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL;
    
    if (!notificationEmail) {
      console.error('LEAD_NOTIFICATION_EMAIL is not configured');
      return NextResponse.json(
        { error: 'Email notification is not configured' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: 'Rhythmiq Lead Notification <onboarding@resend.dev>', // Use Resend's test domain for now
      to: notificationEmail,
      subject: `🎯 New Lead: ${name} - Rhythmiq Website`,
      html: emailBody,
      replyTo: email, // Replies go to the lead's email
    });

    // Optional: Store in database (Supabase)
    // You can uncomment this if you want to store leads in Supabase
    /*
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from('leads').insert([
      {
        name,
        email,
        company: company || null,
        message: message || null,
        source: source || 'unknown',
      },
    ]);
    */

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Lead notification error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to send notification' },
      { status: 500 }
    );
  }
}

