import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    let query = supabase
      .from('transactions')
      .select(`
        *,
        properties(title, location, price_kwd),
        clients(name, phone, email)
      `)
      .order('transaction_date', { ascending: false });

    const status = searchParams.get('status');
    if (status) query = query.eq('status', status);

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

    if (!body.property_id || !body.client_id || !body.amount_kwd || !body.transaction_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate commission (5% default)
    const commission_rate = body.commission_rate || 5.0;
    const commission_amount_kwd = (body.amount_kwd * commission_rate) / 100;

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          property_id: body.property_id,
          client_id: body.client_id,
          transaction_type: body.transaction_type,
          amount_kwd: body.amount_kwd,
          commission_rate,
          commission_amount_kwd,
          transaction_date: body.transaction_date || new Date().toISOString(),
          status: 'pending',
          notes: body.notes || '',
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
