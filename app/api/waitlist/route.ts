import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Generate referral code prefix: FIRSTNAME + LAST_INITIAL (if available)
function getReferralPrefix(name: string): string {
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0].toUpperCase().replace(/[^A-Z]/g, '');
  const lastInitial = nameParts.length > 1 
    ? nameParts[nameParts.length - 1][0].toUpperCase().replace(/[^A-Z]/g, '') 
    : '';
  return `${firstName}${lastInitial}`;
}

// Generate unique referral code: PREFIX + sequential number (001, 002, etc.)
async function getUniqueReferralCode(name: string): Promise<string> {
  const prefix = getReferralPrefix(name);
  
  // Count existing codes with this prefix in both tables
  const [customersResult, providersResult] = await Promise.all([
    supabase.from('bb_waitlist_customers').select('id', { count: 'exact', head: true }).like('referral_code', `${prefix}%`),
    supabase.from('bb_waitlist_providers').select('id', { count: 'exact', head: true }).like('referral_code', `${prefix}%`),
  ]);
  
  const existingCount = (customersResult.count || 0) + (providersResult.count || 0);
  const nextNumber = existingCount + 1;
  
  // Pad to at least 3 digits (allows up to 999, auto-expands beyond)
  const paddedNum = nextNumber.toString().padStart(3, '0');
  return `${prefix}${paddedNum}`;
}

// Find referrer type by checking both tables
async function findReferrerType(code: string): Promise<'customer' | 'provider' | null> {
  const [customerCheck, providerCheck] = await Promise.all([
    supabase.from('bb_waitlist_customers').select('id').eq('referral_code', code).single(),
    supabase.from('bb_waitlist_providers').select('id').eq('referral_code', code).single(),
  ]);
  
  if (customerCheck.data) return 'customer';
  if (providerCheck.data) return 'provider';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, state, city, userType, referredBy } = body;

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

    // Generate unique referral code
    const referralCode = await getUniqueReferralCode(name);

    // Determine referrer type if referral code provided
    let referredByType: 'customer' | 'provider' | null = null;
    if (referredBy) {
      referredByType = await findReferrerType(referredBy);
    }

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
        referral_code: referralCode,
        referred_by: referredBy || null,
        referred_by_type: referredByType,
      })
      .select('id, referral_code')
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

    console.log('New waitlist entry:', { id: data.id, userType, email, referralCode: data.referral_code });

    return NextResponse.json(
      {
        message: 'Successfully joined the waitlist!',
        id: data.id,
        userType,
        referralCode: data.referral_code,
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
