import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, state, city, userType } = body;

    // Validate required fields
    if (!name || !email || !phone || !state || !city || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate user type
    if (!['customer', 'provider'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Select table based on user type
    const tableName = userType === 'customer' ? 'bb_waitlist_customers' : 'bb_waitlist_providers';

    // Insert into Supabase
    const { data, error } = await supabase
      .from(tableName)
      .insert({
        name,
        email,
        phone,
        state,
        city,
        profile_completed: false,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      
      // Check for duplicate email/phone
      if (error.code === '23505') {
        if (error.message.includes('email')) {
          return NextResponse.json(
            { error: 'This email is already on the waitlist' },
            { status: 409 }
          );
        }
        if (error.message.includes('phone')) {
          return NextResponse.json(
            { error: 'This phone number is already on the waitlist' },
            { status: 409 }
          );
        }
        return NextResponse.json(
          { error: 'This email or phone is already on the waitlist' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      );
    }

    console.log('New waitlist entry:', { id: data.id, userType, email });

    return NextResponse.json(
      {
        message: 'Successfully joined the waitlist!',
        id: data.id,
        userType,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, userType, ...additionalFields } = body;

    if (!id || !userType) {
      return NextResponse.json(
        { error: 'ID and userType are required' },
        { status: 400 }
      );
    }

    // Select table based on user type
    const tableName = userType === 'customer' ? 'bb_waitlist_customers' : 'bb_waitlist_providers';

    // Build update object based on user type
    let updateData: Record<string, unknown> = {
      profile_completed: true,
      updated_at: new Date().toISOString(),
    };

    if (userType === 'customer') {
      updateData = {
        ...updateData,
        diet_preference: additionalFields.dietPreference || null,
        budget_range: additionalFields.budgetRange || null,
        meals_needed: additionalFields.mealsNeeded || null,
        current_solution: additionalFields.currentSolution || null,
        urgency: additionalFields.urgency || null,
      };
    } else if (userType === 'provider') {
      updateData = {
        ...updateData,
        business_name: additionalFields.businessName || null,
        daily_capacity: additionalFields.dailyCapacity || null,
        cuisine_type: additionalFields.cuisineType || null,
        fssai_status: additionalFields.fssaiStatus || null,
        experience: additionalFields.experience || null,
        current_customers: additionalFields.currentCustomers || null,
      };
    }

    const { data, error } = await supabase
      .from(tableName)
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to update profile. Please try again.' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Entry not found' },
        { status: 404 }
      );
    }

    console.log('Updated waitlist entry:', { id, userType });

    return NextResponse.json(
      {
        message: 'Profile updated successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist PATCH API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
