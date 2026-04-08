'use client';

import React from "react"

import { useState } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-secondary rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-primary text-primary-foreground rounded-full p-3">
            <Lock size={24} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2 text-primary">Admin Login</h1>
        <p className="text-center text-muted-foreground mb-6">Enter admin password to access the dashboard</p>

        <form className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-red-700">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-2">Demo password: <code className="bg-secondary px-2 py-1 rounded">admin123</code></p>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
