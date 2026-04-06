'use client';

import { useState, useEffect, useCallback } from 'react';
import { ToastProvider } from '@/components/Toast';
import Dashboard from '@/components/Dashboard';
import PropertyManager from '@/components/PropertyManager';
import ClientManager from '@/components/ClientManager';
import TransactionManager from '@/components/TransactionManager';
import Analytics from '@/components/Analytics';
import {
  LayoutDashboard, Building2, Users, ArrowLeftRight, BarChart3, Settings,
  Bell, Search, Menu, X, ChevronLeft, Shield, Plus, UserPlus, FileText,
  Command
} from 'lucide-react';

type Tab = 'dashboard' | 'properties' | 'clients' | 'transactions' | 'analytics' | 'settings';

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2, badge: 156 },
  { id: 'clients', label: 'Clients', icon: Users, badge: 342 },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, badge: 67 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');

  // ⌘K command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen((prev) => !prev);
        setCmdSearch('');
      }
      if (e.key === 'Escape') setCmdPaletteOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigateTo = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setCmdPaletteOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const cmdItems = navItems.filter(
    (n) => !cmdSearch || n.label.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  const currentNav = navItems.find((n) => n.id === activeTab)!;

  // Breadcrumbs
  const breadcrumbs = activeTab === 'dashboard'
    ? ['Home']
    : ['Home', currentNav.label];

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#050508]">
        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 flex flex-col
            border-r border-white/[0.04] bg-[#060610]/90 backdrop-blur-2xl
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${sidebarCollapsed ? 'w-[68px]' : 'w-[260px]'}
            ${mobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
            lg:translate-x-0
          `}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 h-[72px] border-b border-white/[0.04] shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center shrink-0 neon-glow-blue">
              <Building2 size={17} className="text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden whitespace-nowrap">
                <div className="text-[15px] font-semibold text-white tracking-tight">R&A Estate</div>
                <div className="text-[10px] text-white/20 tracking-[0.2em] uppercase mt-0.5">Kuwait · Enterprise</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            {!sidebarCollapsed && (
              <p className="text-[10px] text-white/15 uppercase tracking-[0.15em] px-3 mb-3 font-medium">Navigation</p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`
                    w-full flex items-center gap-3 rounded-2xl text-[13px] font-medium
                    transition-all duration-200 group relative
                    ${sidebarCollapsed ? 'px-0 py-2.5 justify-center' : 'px-3.5 py-2.5'}
                    ${isActive
                      ? 'bg-gradient-to-r from-[#00d4ff]/[0.07] to-[#7c3aed]/[0.05] text-white'
                      : 'text-white/30 hover:text-white/60 hover:bg-white/[0.02]'}
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4 rounded-r-full bg-gradient-to-b from-[#00d4ff] to-[#7c3aed]" />
                  )}
                  <Icon size={17} className={isActive ? 'text-[#00d4ff]' : 'text-white/20 group-hover:text-white/40'} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] text-white/15 bg-white/[0.04] px-1.5 py-0.5 rounded-md">{item.badge}</span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="px-3 py-4 border-t border-white/[0.04] space-y-2">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/[0.02]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-[10px] font-bold text-white">
                  RA
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-medium text-white/80 truncate">R&A Admin</div>
                  <div className="text-[10px] text-white/20">Enterprise</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-neon" />
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden lg:flex w-full items-center gap-3 rounded-xl text-white/20 hover:text-white/40 hover:bg-white/[0.02] transition-all text-xs ${sidebarCollapsed ? 'justify-center py-2' : 'px-3 py-2'}`}
            >
              <ChevronLeft size={15} className={`transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              {!sidebarCollapsed && <span>Collapse</span>}
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* ── Main ── */}
        <main className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-[260px]'}`}>
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between h-[72px] px-8 border-b border-white/[0.04] bg-[#050508]/80 backdrop-blur-2xl shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white/30 hover:text-white/60">
                <Menu size={20} />
              </button>
              <div>
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-[10px] text-white/15 mb-0.5">
                  {breadcrumbs.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-1.5">
                      {i > 0 && <span>/</span>}
                      <span className={i === breadcrumbs.length - 1 ? 'text-white/30' : ''}>{crumb}</span>
                    </span>
                  ))}
                </div>
                <h1 className="text-[17px] font-semibold text-white">{currentNav.label}</h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Command Palette Trigger */}
              <button
                onClick={() => { setCmdPaletteOpen(true); setCmdSearch(''); }}
                className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-white/20 text-[12px] hover:border-white/[0.08] hover:text-white/30 transition-all w-52"
              >
                <Search size={13} />
                <span>Quick search...</span>
                <span className="ml-auto flex items-center gap-0.5 text-[10px] bg-white/[0.04] px-1.5 py-0.5 rounded-md">
                  <Command size={9} />K
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-xl hover:bg-white/[0.03] transition-colors text-white/25 hover:text-white/50">
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4ff] pulse-neon" />
              </button>

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-[10px] font-bold text-white cursor-pointer ring-2 ring-white/[0.04]">
                RA
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-8 py-7 max-w-[1440px] mx-auto">
              <div className="animate-fade-in">
                {activeTab === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
                {activeTab === 'properties' && <PropertyManager />}
                {activeTab === 'clients' && <ClientManager />}
                {activeTab === 'transactions' && <TransactionManager />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'settings' && <SettingsPage />}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="shrink-0 px-8 py-3 border-t border-white/[0.03] flex items-center justify-between">
            <span className="text-[10px] text-white/10">© 2026 R&A General Trading Co.</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-neon" />
              <span className="text-[10px] text-white/15">All systems operational</span>
            </div>
          </footer>
        </main>

        {/* ── Command Palette ── */}
        {cmdPaletteOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setCmdPaletteOpen(false)} />
            <div className="relative w-full max-w-lg animate-scale-in">
              <div className="bg-[#0a0a14]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05]">
                  <Search size={16} className="text-white/25" />
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    value={cmdSearch}
                    onChange={(e) => setCmdSearch(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
                  />
                  <kbd className="text-[10px] text-white/15 bg-white/[0.04] px-2 py-1 rounded-md">ESC</kbd>
                </div>
                <div className="py-2 max-h-72 overflow-y-auto">
                  <p className="px-5 py-1.5 text-[10px] text-white/15 uppercase tracking-wider font-medium">Navigate</p>
                  {cmdItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors"
                      >
                        <Icon size={15} className="text-white/20" />
                        <span>{item.label}</span>
                        {item.badge && <span className="ml-auto text-[10px] text-white/15">{item.badge}</span>}
                      </button>
                    );
                  })}
                  <div className="border-t border-white/[0.04] mt-2 pt-2">
                    <p className="px-5 py-1.5 text-[10px] text-white/15 uppercase tracking-wider font-medium">Quick Actions</p>
                    <button onClick={() => { navigateTo('properties'); }} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors">
                      <Plus size={15} className="text-[#00d4ff]/50" />
                      <span>Add Property</span>
                    </button>
                    <button onClick={() => { navigateTo('clients'); }} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors">
                      <UserPlus size={15} className="text-[#a855f7]/50" />
                      <span>Add Client</span>
                    </button>
                    <button onClick={() => { navigateTo('transactions'); }} className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-colors">
                      <FileText size={15} className="text-emerald-400/50" />
                      <span>Record Deal</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
}

// ── Settings placeholder ──
function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/[0.08] flex items-center justify-center mx-auto mb-5">
          <Shield size={28} className="text-[#00d4ff]/60" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">System Settings</h2>
        <p className="text-white/20 text-sm max-w-md mx-auto leading-relaxed">
          Company configuration, user management, commission rates, and system preferences.
          Available in the full production release.
        </p>
        <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-white/25 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-neon" />
          Demo Mode Active
        </div>
      </div>
    </div>
  );
}
