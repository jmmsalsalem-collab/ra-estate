import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    let query = supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    const status = searchParams.get('status');
    if (status) query = query.eq('status', status);

    const type = searchParams.get('type');
    if (type) query = query.eq('client_type', type);

    const { data, error } = await query.limit(100);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    if (!body.name || !body.phone || !body.client_type) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, client_type' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name: body.name,
          phone: body.phone,
          email: body.email || '',
          client_type: body.client_type,
          budget_min_kwd: body.budget_min_kwd || 0,
          budget_max_kwd: body.budget_max_kwd || 0,
          preferred_location: body.preferred_location || '',
          preferred_property_type: body.preferred_property_type || '',
          status: 'active',
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
