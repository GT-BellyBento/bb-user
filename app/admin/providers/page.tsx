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
  daily_capacity: string | null;
  cuisine_type: string | null;
  fssai_status: string | null;
  experience: string | null;
  current_customers: string | null;
  created_at: string;
}

async function getProviders() {
  const { data, error } = await supabase
    .from('bb_waitlist_providers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }

  return data as Provider[];
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
