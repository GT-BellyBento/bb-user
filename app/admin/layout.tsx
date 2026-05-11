'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    section: 'Dashboards',
    icon: '📊',
    items: [
      { name: 'Customer Dashboard', href: '/admin/customer-dashboard' },
      { name: 'Provider Dashboard', href: '/admin/provider-dashboard' },
    ],
  },
  {
    section: 'Data',
    icon: '📋',
    items: [
      { name: 'Customers', href: '/admin/customers' },
      { name: 'Providers', href: '/admin/providers' },
      { name: 'Referrals', href: '/admin/referrals' },
    ],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="text-xl font-bold">
            <span className="text-white">Belly</span>
            <span className="text-primary">Bento</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Admin Panel (Local Only)</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((section) => (
            <div key={section.section} className="mb-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {section.icon} {section.section}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
          For local use only
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
