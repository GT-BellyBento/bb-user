import { supabase } from '@/lib/supabase';
import ProviderDashboardCharts from './ProviderDashboardCharts';

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

async function getProviderData() {
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

function getStats(providers: Provider[]) {
  const total = providers.length;
  const profileCompleted = providers.filter(p => p.profile_completed).length;
  
  // Get signups this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = providers.filter(p => new Date(p.created_at) >= oneWeekAgo).length;

  // Get signups this month
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const thisMonth = providers.filter(p => new Date(p.created_at) >= oneMonthAgo).length;

  // Group by city
  const byCity: Record<string, number> = {};
  providers.forEach(p => {
    byCity[p.city] = (byCity[p.city] || 0) + 1;
  });

  // Group by state
  const byState: Record<string, number> = {};
  providers.forEach(p => {
    byState[p.state] = (byState[p.state] || 0) + 1;
  });

  // Group by cuisine type
  const byCuisine: Record<string, number> = {};
  providers.forEach(p => {
    const cuisine = p.cuisine_type || 'Not specified';
    byCuisine[cuisine] = (byCuisine[cuisine] || 0) + 1;
  });

  // Group by daily capacity
  const byCapacity: Record<string, number> = {};
  providers.forEach(p => {
    const capacity = p.daily_capacity || 'Not specified';
    byCapacity[capacity] = (byCapacity[capacity] || 0) + 1;
  });

  // Group by FSSAI status
  const byFssai: Record<string, number> = {};
  providers.forEach(p => {
    const fssai = p.fssai_status || 'Not specified';
    byFssai[fssai] = (byFssai[fssai] || 0) + 1;
  });

  // Group by experience
  const byExperience: Record<string, number> = {};
  providers.forEach(p => {
    const exp = p.experience || 'Not specified';
    byExperience[exp] = (byExperience[exp] || 0) + 1;
  });

  // Group by date for trend
  const byDate: Record<string, number> = {};
  providers.forEach(p => {
    const date = new Date(p.created_at).toISOString().split('T')[0];
    byDate[date] = (byDate[date] || 0) + 1;
  });

  return {
    total,
    profileCompleted,
    thisWeek,
    thisMonth,
    byCity: Object.entries(byCity).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
    byState: Object.entries(byState).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value),
    byCuisine: Object.entries(byCuisine).map(([name, value]) => ({ name, value })),
    byCapacity: Object.entries(byCapacity).map(([name, value]) => ({ name, value })),
    byFssai: Object.entries(byFssai).map(([name, value]) => ({ name, value })),
    byExperience: Object.entries(byExperience).map(([name, value]) => ({ name, value })),
    byDate: Object.entries(byDate).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
  };
}

export default async function ProviderDashboardPage() {
  const providers = await getProviderData();
  const stats = getStats(providers);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-dark mb-6">Provider Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Providers</p>
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
      <ProviderDashboardCharts stats={stats} />
    </div>
  );
}

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';
