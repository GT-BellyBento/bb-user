'use client';

import { useState } from 'react';

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
  referral_code: string | null;
  referred_by: string | null;
  referred_by_type: 'customer' | 'provider' | null;
  referral_count?: number;
  referrer_name?: string | null;
}

interface Props {
  customers: Customer[];
}

export default function CustomersTable({ customers: initialCustomers }: Props) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 20;

  // Filter by search
  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Export to CSV
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'State', 'City', 'Profile Completed', 'Diet', 'Budget', 'Meals Needed', 'Current Solution', 'Urgency', 'Referral Code', 'Referred By', 'Referrals', 'Signup Date'];
    const rows = customers.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.state,
      c.city,
      c.profile_completed ? 'Yes' : 'No',
      c.diet_preference || '',
      c.budget_range || '',
      c.meals_needed || '',
      c.current_solution || '',
      c.urgency || '',
      c.referral_code || '',
      c.referred_by ? `${c.referrer_name || 'Unknown'} (${c.referred_by_type})` : '',
      c.referral_count || 0,
      new Date(c.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bellybento-customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Delete handler
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/delete?id=${deleteTarget.id}&userType=customer`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setCustomers(customers.filter(c => c.id !== deleteTarget.id));
        setDeleteTarget(null);
      } else {
        alert('Failed to delete. Please try again.');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-dark mb-2">Delete Customer</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong> ({deleteTarget.email})?
            </p>
            <p className="text-sm text-red-600 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by name, email, phone, or city..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 text-sm bg-primary text-white hover:bg-orange-600 rounded-lg transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-left">State</th>
                <th className="px-4 py-3 text-left">Profile</th>
                <th className="px-4 py-3 text-left">Diet</th>
                <th className="px-4 py-3 text-left">Budget</th>
                <th className="px-4 py-3 text-left">Referral Code</th>
                <th className="px-4 py-3 text-left">Referred By</th>
                <th className="px-4 py-3 text-left">Referrals</th>
                <th className="px-4 py-3 text-left">Signup</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.length > 0 ? (
                paginated.map((customer, idx) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{startIndex + idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{customer.name}</td>
                    <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                    <td className="px-4 py-3 text-gray-600">{customer.phone}</td>
                    <td className="px-4 py-3">{customer.city}</td>
                    <td className="px-4 py-3">{customer.state}</td>
                    <td className="px-4 py-3">
                      {customer.profile_completed ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{customer.diet_preference || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{customer.budget_range || '-'}</td>
                    <td className="px-4 py-3">
                      {customer.referral_code ? (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{customer.referral_code}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {customer.referred_by ? (
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{customer.referrer_name || customer.referred_by}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${customer.referred_by_type === 'provider' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                            {customer.referred_by_type === 'provider' ? 'P' : 'C'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {customer.referral_count ? (
                        <span className="bg-primary/10 text-primary font-medium px-2 py-1 rounded text-sm">{customer.referral_count}</span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(customer.created_at).toISOString().split('T')[0]}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDeleteTarget(customer)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="px-4 py-8 text-center text-gray-400">
                    {search ? 'No matching results' : 'No customers yet'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
