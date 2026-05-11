import { supabase } from '@/lib/supabase';
import ProvidersTable from './ProvidersTable';

interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  profile_completed: boolean;
  business_name: string | null;
  daily_capacity: string | null;
  cuisine_type: string | null;
  fssai_status: string | null;
  experience: string | null;
  current_customers: string | null;
  created_at: string;
  referral_code: string | null;
  referred_by: string | null;
  referred_by_type: 'customer' | 'provider' | null;
  referral_count?: number;
  referrer_name?: string | null;
}

async function getProviders() {
  // Fetch providers
  const { data: providers, error } = await supabase
    .from('bb_waitlist_providers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching providers:', error);
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

  // Enrich providers with referral data
  const enrichedProviders = (providers || []).map(provider => {
    let referrerName: string | null = null;
    if (provider.referred_by) {
      if (provider.referred_by_type === 'customer') {
        referrerName = customerByCode.get(provider.referred_by) || null;
      } else if (provider.referred_by_type === 'provider') {
        referrerName = providerByCode.get(provider.referred_by) || null;
      }
    }
    return {
      ...provider,
      referral_count: referralCounts.get(provider.referral_code) || 0,
      referrer_name: referrerName,
    };
  });

  return enrichedProviders as Provider[];
}

export default async function ProvidersPage() {
  const providers = await getProviders();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Provider Entries</h1>
        <span className="text-gray-500">{providers.length} total</span>
      </div>

      <ProvidersTable providers={providers} />
    </div>
  );
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
