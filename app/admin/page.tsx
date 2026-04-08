'use client';

import { AdminSidebar } from '@/components/admin/sidebar'
import { Package, Users, Mail } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex bg-background min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl">
          <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-8">Welcome to your boutique admin panel</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            <div className="bg-secondary rounded-lg p-6 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-1"></p>
                  <p className="text-3xl font-bold text-foreground"></p>
                </div>
                <div className={` rounded-lg p-3`}>
                  {/* <Icon size={24} /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-secondary rounded-lg p-6 border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Quick Start</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/products"
                className="block p-4 border border-border rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <Package className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Manage Products</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or delete products</p>
              </a>

              <a
                href="/admin/about"
                className="block p-4 border border-border rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <Users className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Edit About Page</h3>
                <p className="text-sm text-muted-foreground">Update company info and team</p>
              </a>

              <a
                href="/admin/contact"
                className="block p-4 border border-border rounded-lg hover:bg-primary/10 transition-colors group"
              >
                <Mail className="text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground">Update Contact</h3>
                <p className="text-sm text-muted-foreground">Manage contact information</p>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
