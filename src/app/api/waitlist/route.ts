import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database is not configured' },
        { status: 500 }
      );
    }

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
