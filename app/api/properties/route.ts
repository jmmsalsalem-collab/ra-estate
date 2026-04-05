import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Build query with filters
    let query = supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    const status = searchParams.get('status');
    if (status) query = query.eq('property_status', status);

    const location = searchParams.get('location');
    if (location) query = query.eq('location', location);

    const type = searchParams.get('type');
    if (type) query = query.eq('property_type', type);

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

    // Validate required fields
    if (!body.title || !body.property_type || !body.location || !body.price_kwd) {
      return NextResponse.json(
        { error: 'Missing required fields: title, property_type, location, price_kwd' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          title: body.title,
          description: body.description || '',
          property_type: body.property_type,
          location: body.location,
          size_sqm: body.size_sqm,
          bedrooms: body.bedrooms || 0,
          bathrooms: body.bathrooms || 0,
          price_kwd: body.price_kwd,
          property_status: 'available',
          listing_type: body.listing_type || 'sale',
          images_url: body.images_url || [],
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data?.[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
