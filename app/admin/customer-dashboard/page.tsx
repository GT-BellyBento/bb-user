import { supabase } from '@/lib/supabase';
import CustomerDashboardCharts from './CustomerDashboardCharts';

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

async function getCustomerData() {
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

function getStats(customers: Customer[]) {
  const total = customers.length;
  const profileCompleted = customers.filter(c => c.profile_completed).length;
  
  // Get signups this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = customers.filter(c => new Date(c.created_at) >= oneWeekAgo).length;

  // Get signups this month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const thisMonth = customers.filter(c => new Date(c.created_at) >= oneMonthAgo).length;

  // Group by city
  const byCity: Record<string, number> = {};
  customers.forEach(c => {
    byCity[c.city] = (byCity[c.city] || 0) + 1;
  });

  // Group by state
  const byState: Record<string, number> = {};
  customers.forEach(c => {
    byState[c.state] = (byState[c.state] || 0) + 1;
  });

  // Group by diet preference
  const byDiet: Record<string, number> = {};
  customers.forEach(c => {
    const diet = c.diet_preference || 'Not specified';
    byDiet[diet] = (byDiet[diet] || 0) + 1;
  });

  // Group by budget range
  const byBudget: Record<string, number> = {};
  customers.forEach(c => {
    const budget = c.budget_range || 'Not specified';
    byBudget[budget] = (byBudget[budget] || 0) + 1;
  });

  // Group by date for trend
  const byDate: Record<string, number> = {};
  customers.forEach(c => {
    const date = new Date(c.created_at).toISOString().split('T')[0];
    byDate[date] = (byDate[date] || 0) + 1;
  });

  return {
    total,
    profileCompleted,
    thisWeek,
    thisMonth,
    byCity: Object.entries(byCity).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
    byState: Object.entries(byState).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
    byDiet: Object.entries(byDiet).map(([name, value]) => ({ name, value })),
    byBudget: Object.entries(byBudget).map(([name, value]) => ({ name, value })),
    byDate: Object.entries(byDate).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export default async function CustomerDashboardPage() {
  const customers = await getCustomerData();
  const stats = getStats(customers);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-dark mb-6">Customer Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Signups</p>
          <p className="text-3xl font-bold text-dark">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-3xl font-bold text-primary">{stats.thisWeek}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-3xl font-bold text-blue-600">{stats.thisMonth}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Profile Completed</p>
          <p className="text-3xl font-bold text-green-600">{stats.profileCompleted}</p>
        </div>
      </div>

      {/* Charts */}
      <CustomerDashboardCharts stats={stats} />
    </div>
  );
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
