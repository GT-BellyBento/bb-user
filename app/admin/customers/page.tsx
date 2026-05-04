import { supabase } from '@/lib/supabase';
import CustomersTable from './CustomersTable';

interface Customer {
  id: string;
  name: string;
  email: string;
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
}

async function getCustomers() {
  const { data, error } = await supabase
    .from('bb_waitlist_customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }

  return data as Customer[];
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
