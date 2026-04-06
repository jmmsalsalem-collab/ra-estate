'use client';

import { useState } from 'react';
import { ToastProvider } from '@/components/Toast';
import Dashboard from '@/components/Dashboard';
import PropertyManager from '@/components/PropertyManager';
import ClientManager from '@/components/ClientManager';
import TransactionManager from '@/components/TransactionManager';
import Analytics from '@/components/Analytics';
import {
  LayoutDashboard, Building2, Users, ArrowLeftRight, BarChart3, Settings,
  Bell, Search, Menu, X, ChevronLeft, LogOut, Shield
} from 'lucide-react';

type Tab = 'dashboard' | 'properties' | 'clients' | 'transactions' | 'analytics' | 'settings';

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentNav = navItems.find((n) => n.id === activeTab)!;

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#050508]">
        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 flex flex-col
            border-r border-white/[0.04] bg-[#08080f]/95 backdrop-blur-xl
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'w-64' : 'w-[72px]'}
            max-lg:${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
          `}
        >
          {/* Logo */}
          <div className={`flex items-center gap-3 px-5 h-16 border-b border-white/[0.04] shrink-0`}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center shrink-0 neon-glow-blue">
              <Building2 size={18} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="text-[15px] font-bold text-white tracking-tight">R&A Estate</div>
                <div className="text-[10px] text-white/30 tracking-widest uppercase">Kuwait</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group relative
                    ${isActive
                      ? 'bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 text-white border border-[#00d4ff]/15'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03] border border-transparent'}
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-[#00d4ff] to-[#7c3aed]" />
                  )}
                  <Icon size={18} className={isActive ? 'text-[#00d4ff]' : 'text-white/30 group-hover:text-white/50'} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-4 border-t border-white/[0.04] space-y-2">
            {sidebarOpen && (
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-xs font-bold text-white">
                  RA
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">R&A Admin</div>
                  <div className="text-[11px] text-white/30">Enterprise Plan</div>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-white/30 hover:text-white/50 hover:bg-white/[0.03] transition-all text-sm"
            >
              <ChevronLeft size={18} className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
              {sidebarOpen && <span>Collapse</span>}
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* ── Main ── */}
        <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-[72px]'}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 border-b border-white/[0.04] bg-[#050508]/80 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white/40 hover:text-white/70">
                <Menu size={22} />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-white">{currentNav.label}</h1>
                <p className="text-[11px] text-white/25 hidden sm:block">R&A General Trading Co.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 text-sm w-56">
                <Search size={14} />
                <span>Search...</span>
                <span className="ml-auto text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded">⌘K</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-white/[0.04] transition-colors text-white/40 hover:text-white/60">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#00d4ff] pulse-neon" />
              </button>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-xs font-bold text-white cursor-pointer">
                RA
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="animate-fade-in">
              {activeTab === 'dashboard' && <Dashboard />}
              {activeTab === 'properties' && <PropertyManager />}
              {activeTab === 'clients' && <ClientManager />}
              {activeTab === 'transactions' && <TransactionManager />}
              {activeTab === 'analytics' && <Analytics />}
              {activeTab === 'settings' && <SettingsPage />}
            </div>
          </div>

          {/* Footer */}
          <footer className="shrink-0 px-6 py-3 border-t border-white/[0.04] text-center text-[11px] text-white/15">
            © 2026 R&A General Trading Co. — Enterprise Real Estate Management — Kuwait
          </footer>
        </main>
      </div>
    </ToastProvider>
  );
}

// ── Settings placeholder ──
function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 border border-[#00d4ff]/10 flex items-center justify-center mx-auto mb-4">
          <Shield size={28} className="text-[#00d4ff]" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">System Settings</h2>
        <p className="text-white/30 text-sm max-w-md mx-auto">
          Company configuration, user management, commission rates, and system preferences.
          Available in the full production release.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-neon" />
          Demo Mode Active
        </div>
      </div>
    </div>
  );
}
