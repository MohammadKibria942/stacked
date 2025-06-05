"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react'; // Import an icon for the button

export function POSSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const menuItems = [
    { name: 'Dashboard', path: '/pos' },
    { name: 'Orders', path: '/pos/orders' },
  ];

  return (
    <div className="w-56 bg-neutral-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <div className="mb-8">
          <h1 className="text-xl font-bold px-4">STACKED</h1>
        </div>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.path
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {/* Logout Button as a menu item */}
            <li>
              <button
                onClick={() => {
                  sessionStorage.removeItem("pos_authenticated"); // Clear authentication state
                  router.push('/login');
                }}
                className="flex items-center w-full px-4 py-2 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
