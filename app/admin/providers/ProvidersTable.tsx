'use client';

import { useState } from 'react';

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
}

interface Props {
  providers: Provider[];
}

export default function ProvidersTable({ providers: initialProviders }: Props) {
  const [providers, setProviders] = useState(initialProviders);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Provider | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const itemsPerPage = 20;

  // Filter by search
  const filtered = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.city.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  // Export to CSV
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'State', 'City', 'Profile Completed', 'Business Name', 'Capacity', 'Cuisine', 'FSSAI', 'Experience', 'Current Customers', 'Signup Date'];
    const rows = providers.map((p) => [
      p.name,
      p.email,
      p.phone,
      p.state,
      p.city,
      p.profile_completed ? 'Yes' : 'No',
      p.business_name || '',
      p.daily_capacity || '',
      p.cuisine_type || '',
      p.fssai_status || '',
      p.experience || '',
      p.current_customers || '',
      new Date(p.created_at).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bellybento-providers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Delete handler
  const handleDelete = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/delete?id=${deleteTarget.id}&userType=provider`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setProviders(providers.filter(p => p.id !== deleteTarget.id));
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
            <h3 className="text-lg font-semibold text-dark mb-2">Delete Provider</h3>
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
                <th className="px-4 py-3 text-left">Business Name</th>
                <th className="px-4 py-3 text-left">Capacity</th>
                <th className="px-4 py-3 text-left">Cuisine</th>
                <th className="px-4 py-3 text-left">FSSAI</th>
                <th className="px-4 py-3 text-left">Signup</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginated.length > 0 ? (
                paginated.map((provider, idx) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{startIndex + idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{provider.name}</td>
                    <td className="px-4 py-3 text-gray-600">{provider.email}</td>
                    <td className="px-4 py-3 text-gray-600">{provider.phone}</td>
                    <td className="px-4 py-3">{provider.city}</td>
                    <td className="px-4 py-3">{provider.state}</td>
                    <td className="px-4 py-3">
                      {provider.profile_completed ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{provider.business_name || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{provider.daily_capacity || '-'}</td>
                    <td className="px-4 py-3 text-gray-600">{provider.cuisine_type || '-'}</td>
                    <td className="px-4 py-3">
                      {provider.fssai_status === 'Yes, I have FSSAI' ? (
                        <span className="text-green-600 text-xs">✓ Yes</span>
                      ) : provider.fssai_status === 'No, but willing to get' ? (
                        <span className="text-yellow-600 text-xs">Willing</span>
                      ) : provider.fssai_status ? (
                        <span className="text-gray-500 text-xs">{provider.fssai_status}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(provider.created_at).toISOString().split('T')[0]}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setDeleteTarget(provider)}
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
                  <td colSpan={13} className="px-4 py-8 text-center text-gray-400">
                    {search ? 'No matching results' : 'No providers yet'}
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
