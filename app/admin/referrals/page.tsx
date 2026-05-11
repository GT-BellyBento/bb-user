import { supabase } from '@/lib/supabase';
import ReferralTree from './ReferralTree';

interface Person {
  id: string;
  name: string;
  referral_code: string | null;
  referred_by: string | null;
  referred_by_type: 'customer' | 'provider' | null;
  type: 'customer' | 'provider';
  created_at: string;
}

async function getReferralData() {
  // Fetch all customers and providers
  const [customersResult, providersResult] = await Promise.all([
    supabase.from('bb_waitlist_customers').select('id, name, referral_code, referred_by, referred_by_type, created_at'),
    supabase.from('bb_waitlist_providers').select('id, name, referral_code, referred_by, referred_by_type, created_at'),
  ]);

  const customers: Person[] = (customersResult.data || []).map(c => ({
    ...c,
    type: 'customer' as const,
  }));

  const providers: Person[] = (providersResult.data || []).map(p => ({
    ...p,
    type: 'provider' as const,
  }));

  const allPeople = [...customers, ...providers];

  // Build referral statistics
  const stats = {
    totalCustomers: customers.length,
    totalProviders: providers.length,
    customersWithReferral: customers.filter(c => c.referred_by).length,
    providersWithReferral: providers.filter(p => p.referred_by).length,
    organicCustomers: customers.filter(c => !c.referred_by).length,
    organicProviders: providers.filter(p => !p.referred_by).length,
  };

  return { allPeople, stats };
}

export default async function ReferralsPage() {
  const { allPeople, stats } = await getReferralData();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-dark">Referral Network</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Signups</p>
          <p className="text-2xl font-bold text-dark">{stats.totalCustomers + stats.totalProviders}</p>
          <p className="text-xs text-gray-400">{stats.totalCustomers} customers, {stats.totalProviders} providers</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Referred Signups</p>
          <p className="text-2xl font-bold text-green-600">{stats.customersWithReferral + stats.providersWithReferral}</p>
          <p className="text-xs text-gray-400">{stats.customersWithReferral} C, {stats.providersWithReferral} P</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Organic Signups</p>
          <p className="text-2xl font-bold text-blue-600">{stats.organicCustomers + stats.organicProviders}</p>
          <p className="text-xs text-gray-400">{stats.organicCustomers} C, {stats.organicProviders} P</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Referral Rate</p>
          <p className="text-2xl font-bold text-primary">
            {stats.totalCustomers + stats.totalProviders > 0
              ? Math.round(((stats.customersWithReferral + stats.providersWithReferral) / (stats.totalCustomers + stats.totalProviders)) * 100)
              : 0}%
          </p>
          <p className="text-xs text-gray-400">of all signups</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Legend</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            <span>Customer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
            <span>Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded border-2 border-yellow-500 bg-yellow-100"></span>
            <span>Root (Organic)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">→</span>
            <span>Referred</span>
          </div>
        </div>
      </div>

      {/* Referral Tree */}
      <ReferralTree people={allPeople} />
    </div>
  );
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
