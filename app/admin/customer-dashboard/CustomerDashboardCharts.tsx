'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const COLORS = ['#F5841F', '#3D4852', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#6366F1'];

interface StatsProps {
  stats: {
    byCity: { name: string; value: number }[];
    byState: { name: string; value: number }[];
    byDiet: { name: string; value: number }[];
    byBudget: { name: string; value: number }[];
    byDate: { date: string; count: number }[];
  };
}

export default function CustomerDashboardCharts({ stats }: StatsProps) {
  return (
    <div className="space-y-6">
      {/* Signups Over Time */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-dark mb-4">Signups Over Time</h3>
        <div className="h-64">
          {stats.byDate.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.byDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#F5841F"
                  strokeWidth={2}
                  dot={{ fill: '#F5841F' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Cities */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-dark mb-4">Top Cities</h3>
          <div className="h-64">
            {stats.byCity.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.byCity.slice(0, 8)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#F5841F" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* By State */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-dark mb-4">By State</h3>
          <div className="h-64">
            {stats.byState.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.byState}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.byState.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Diet Preference */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-dark mb-4">Diet Preference</h3>
          <div className="h-64">
            {stats.byDiet.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.byDiet}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.byDiet.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>

        {/* Budget Range */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-dark mb-4">Budget Range</h3>
          <div className="h-64">
            {stats.byBudget.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.byBudget}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3D4852" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
