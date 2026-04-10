'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Users, Mail, LogOut, LayoutDashboard, House } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/home', label: 'Home Page', icon: House },
  { href: '/admin/products', label: 'Products', icon: Package },
  // { href: '/admin/about', label: 'About Page', icon: Users },
  // { href: '/admin/contact', label: 'Contact Page', icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-secondary border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Boutique Admin</h1>
        <p className="text-sm text-muted-foreground">Manage your store</p>
      </div>

      <nav className="space-y-2 mb-8">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-primary/10'
                }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-red-50 transition-colors"
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}
