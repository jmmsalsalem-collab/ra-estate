'use client';

import { useState } from 'react';
import PropertyManager from '@/components/PropertyManager';
import ClientManager from '@/components/ClientManager';
import TransactionManager from '@/components/TransactionManager';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'clients' | 'transactions'>('dashboard');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏢</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">R&A Estate</h1>
              <p className="text-xs text-gray-400">Real Estate Management System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Kuwait Real Estate</p>
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">د.ك KWD</p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-900/50 border-b border-slate-700/50 sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: 'properties', label: '🏠 Properties', icon: '🏠' },
              { id: 'clients', label: '👥 Clients', icon: '👥' },
              { id: 'transactions', label: '💰 Transactions', icon: '💰' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'properties' && <PropertyManager />}
        {activeTab === 'clients' && <ClientManager />}
        {activeTab === 'transactions' && <TransactionManager />}
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400 text-sm">
          <p>© 2026 R&A General Trading Co. | Real Estate Management System | Kuwait</p>
        </div>
      </footer>
    </main>
  );
}
