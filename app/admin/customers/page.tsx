import { supabase } from '@/lib/supabase';
import CustomersTable from './CustomersTable';

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  state: string;
  city: string;
  profile_completed: boolean;
  diet_preference: string | null;
  budget_range: string | null;
  meals_needed: string | null;
  current_solution: string | null;
  urgency: string | null;
  created_at: string;
  referral_code: string | null;
  referred_by: string | null;
  referred_by_type: 'customer' | 'provider' | null;
  referral_count?: number;
  referrer_name?: string | null;
}

async function getCustomers() {
  // Fetch customers
  const { data: customers, error } = await supabase
    .from('bb_waitlist_customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }

  // Fetch all customers and providers for referral lookups
  const { data: allCustomers } = await supabase.from('bb_waitlist_customers').select('referral_code, name, referred_by');
  const { data: allProviders } = await supabase.from('bb_waitlist_providers').select('referral_code, name, referred_by');

  // Build lookup maps
  const customerByCode = new Map((allCustomers || []).map(c => [c.referral_code, c.name]));
  const providerByCode = new Map((allProviders || []).map(p => [p.referral_code, p.name]));

  // Count referrals for each code
  const referralCounts = new Map<string, number>();
  [...(allCustomers || []), ...(allProviders || [])].forEach(entry => {
    if (entry.referred_by) {
      referralCounts.set(entry.referred_by, (referralCounts.get(entry.referred_by) || 0) + 1);
    }
  });

  // Enrich customers with referral data
  const enrichedCustomers = (customers || []).map(customer => {
    let referrerName: string | null = null;
    if (customer.referred_by) {
      if (customer.referred_by_type === 'customer') {
        referrerName = customerByCode.get(customer.referred_by) || null;
      } else if (customer.referred_by_type === 'provider') {
        referrerName = providerByCode.get(customer.referred_by) || null;
      }
    }
    return {
      ...customer,
      referral_count: referralCounts.get(customer.referral_code) || 0,
      referrer_name: referrerName,
    };
  });

  return enrichedCustomers as Customer[];
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Customer Entries</h1>
        <span className="text-gray-500">{customers.length} total</span>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
