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

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2, badge: '156' },
  { id: 'clients', label: 'Clients', icon: Users, badge: '342' },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, badge: '67' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');

  // ⌘K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setCmdOpen(p => !p); setCmdSearch(''); }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const navigateTo = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setCmdOpen(false);
    setMobileMenuOpen(false);
  }, []);

  const currentNav = navItems.find((n) => n.id === activeTab)!;
  const cmdItems = navItems.filter(n => !cmdSearch || n.label.toLowerCase().includes(cmdSearch.toLowerCase()));

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#050508]">

        {/* ═══ SIDEBAR (Desktop) ═══ */}
        <aside
          style={{ width: sidebarOpen ? 240 : 64 }}
          className="hidden lg:flex flex-col shrink-0 border-r border-white/[0.04] bg-[#060610] transition-all duration-300 ease-out h-screen sticky top-0"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 h-16 px-4 border-b border-white/[0.04] shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
              <Building2 size={15} className="text-white" />
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <div className="text-[14px] font-semibold text-white">R&A Estate</div>
                <div className="text-[9px] text-white/20 tracking-[0.2em] uppercase">Kuwait</div>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto">
            {sidebarOpen && <p className="text-[9px] text-white/10 uppercase tracking-[0.15em] px-2.5 pb-2.5 font-medium">Menu</p>}
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`
                    w-full flex items-center gap-2.5 rounded-xl text-[12px] font-medium transition-all duration-150 relative
                    ${sidebarOpen ? 'px-3 py-2' : 'px-0 py-2 justify-center'}
                    ${active
                      ? 'bg-[#00d4ff]/[0.06] text-white/90'
                      : 'text-white/25 hover:text-white/50 hover:bg-white/[0.02]'}
                  `}
                >
                  {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3.5 rounded-r-full bg-[#00d4ff]" />}
                  <Icon size={16} className={active ? 'text-[#00d4ff]' : ''} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && <span className="text-[9px] text-white/10 bg-white/[0.03] px-1.5 py-0.5 rounded">{item.badge}</span>}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="border-t border-white/[0.04] p-2.5 space-y-1.5">
            {sidebarOpen && (
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/[0.015]">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-[9px] font-bold text-white">RA</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-white/60 truncate">R&A Admin</div>
                  <div className="text-[9px] text-white/15">Enterprise</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-neon" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`w-full flex items-center gap-2 rounded-lg text-white/15 hover:text-white/30 hover:bg-white/[0.015] transition-all text-[11px] ${sidebarOpen ? 'px-2.5 py-1.5' : 'justify-center py-1.5'}`}
            >
              <ChevronLeft size={13} className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
              {sidebarOpen && <span>Collapse</span>}
            </button>
          </div>
        </aside>

        {/* ═══ MOBILE SIDEBAR ═══ */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <aside className="fixed inset-y-0 left-0 w-[260px] z-50 flex flex-col bg-[#060610] border-r border-white/[0.04] lg:hidden animate-slide-in-left">
              <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.04]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.15)]">
                    <Building2 size={15} className="text-white" />
                  </div>
                  <div className="text-[14px] font-semibold text-white">R&A Estate</div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white/20 hover:text-white/50"><X size={18} /></button>
              </div>
              <nav className="flex-1 py-4 px-2.5 space-y-0.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${active ? 'bg-[#00d4ff]/[0.06] text-white/90' : 'text-white/25 hover:text-white/50'}`}
                    >
                      <Icon size={16} className={active ? 'text-[#00d4ff]' : ''} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>
          </>
        )}

        {/* ═══ MAIN CONTENT ═══ */}
        <main className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 lg:px-8 border-b border-white/[0.04] bg-[#050508]/85 backdrop-blur-2xl shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white/25 hover:text-white/50 p-1">
                <Menu size={20} />
              </button>
              <div>
                <div className="flex items-center gap-1.5 text-[9px] text-white/10">
                  <span>Home</span>
                  {activeTab !== 'dashboard' && <><span>/</span><span className="text-white/20">{currentNav.label}</span></>}
                </div>
                <h1 className="text-[16px] font-semibold text-white">{currentNav.label}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setCmdOpen(true); setCmdSearch(''); }}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/15 text-[11px] hover:border-white/[0.08] transition-all w-48"
              >
                <Search size={12} />
                <span>Search...</span>
                <span className="ml-auto flex items-center gap-0.5 text-[9px] bg-white/[0.03] px-1 py-0.5 rounded"><Command size={8} />K</span>
              </button>
              <button className="relative p-2 rounded-xl hover:bg-white/[0.02] text-white/20 hover:text-white/40 transition-colors">
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00d4ff] pulse-neon" />
              </button>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a855f7] flex items-center justify-center text-[9px] font-bold text-white cursor-pointer">RA</div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
              <div className="animate-fade-in">
                {activeTab === 'dashboard' && <Dashboard onNavigate={navigateTo as any} />}
                {activeTab === 'properties' && <PropertyManager />}
                {activeTab === 'clients' && <ClientManager />}
                {activeTab === 'transactions' && <TransactionManager />}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'settings' && <SettingsPage />}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="shrink-0 px-6 lg:px-8 py-2.5 border-t border-white/[0.03] flex items-center justify-between">
            <span className="text-[9px] text-white/8">© 2026 R&A General Trading Co.</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-neon" />
              <span className="text-[9px] text-white/10">All systems operational</span>
            </div>
          </footer>
        </main>

        {/* ═══ COMMAND PALETTE ═══ */}
        {cmdOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[18vh]">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setCmdOpen(false)} />
            <div className="relative w-full max-w-lg mx-4 animate-scale-in">
              <div className="bg-[#0a0a14]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.05]">
                  <Search size={15} className="text-white/20" />
                  <input
                    type="text"
                    placeholder="Type a command or search..."
                    value={cmdSearch}
                    onChange={(e) => setCmdSearch(e.target.value)}
                    autoFocus
                    className="flex-1 bg-transparent text-[13px] text-white placeholder:text-white/15 outline-none"
                  />
                  <kbd className="text-[9px] text-white/10 bg-white/[0.03] px-1.5 py-0.5 rounded">ESC</kbd>
                </div>
                <div className="py-1.5 max-h-72 overflow-y-auto">
                  <p className="px-4 py-1.5 text-[9px] text-white/10 uppercase tracking-wider font-medium">Pages</p>
                  {cmdItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.id} onClick={() => navigateTo(item.id)} className="w-full flex items-center gap-3 px-4 py-2 text-[12px] text-white/40 hover:text-white hover:bg-white/[0.02] transition-colors">
                        <Icon size={14} className="text-white/15" />
                        <span>{item.label}</span>
                        {item.badge && <span className="ml-auto text-[9px] text-white/10">{item.badge}</span>}
                      </button>
                    );
                  })}
                  <div className="border-t border-white/[0.03] mt-1.5 pt-1.5">
                    <p className="px-4 py-1.5 text-[9px] text-white/10 uppercase tracking-wider font-medium">Actions</p>
                    {[
                      { label: 'Add Property', icon: Plus, tab: 'properties' as Tab, color: 'text-[#00d4ff]/40' },
                      { label: 'Add Client', icon: UserPlus, tab: 'clients' as Tab, color: 'text-[#a855f7]/40' },
                      { label: 'Record Deal', icon: FileText, tab: 'transactions' as Tab, color: 'text-emerald-400/40' },
                    ].map((a) => (
                      <button key={a.label} onClick={() => navigateTo(a.tab)} className="w-full flex items-center gap-3 px-4 py-2 text-[12px] text-white/40 hover:text-white hover:bg-white/[0.02] transition-colors">
                        <a.icon size={14} className={a.color} />
                        <span>{a.label}</span>
                      </button>
                    ))}
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

function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10 border border-[#00d4ff]/[0.06] flex items-center justify-center mx-auto mb-4">
          <Shield size={24} className="text-[#00d4ff]/50" />
        </div>
        <h2 className="text-lg font-semibold text-white mb-2">System Settings</h2>
        <p className="text-white/15 text-sm max-w-md mx-auto leading-relaxed">
          Company configuration, user management, commission rates, and system preferences.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.015] border border-white/[0.04] text-white/20 text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-neon" />
          Demo Mode
        </div>
      </div>
    </div>
  );
}
