import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase env vars are not configured');
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 });
    }
    // Instantiated per-request (not at module scope) so missing env vars fail this
    // route at runtime instead of breaking the entire production build.
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const payload = await request.json();

    // basic required-field guard
    if (!payload?.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('waitlist_signups')
      .insert([
        {
          first_name: payload.firstName ?? null,
          email: payload.email,
          company: payload.company ?? null,
          role: payload.role ?? null,
          tickets: payload.tickets ?? null,
          use_cases: payload.useCases ?? [],
          tools: payload.tools ?? [],
          pain: payload.pain ?? null,
          phone: payload.phone ?? null,
          consent: !!payload.consent,
        },
      ]);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message ?? 'Server error' },
      { status: 500 }
    );
  }
}
