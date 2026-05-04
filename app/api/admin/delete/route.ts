import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const userType = searchParams.get('userType');

    if (!id || !userType) {
      return NextResponse.json(
        { error: 'ID and userType are required' },
        { status: 400 }
      );
    }

    if (!['customer', 'provider'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    const tableName = userType === 'customer' ? 'bb_waitlist_customers' : 'bb_waitlist_providers';

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete entry' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Entry deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
