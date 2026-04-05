'use client';

import { useState } from 'react';
import PropertyManager from '@/components/PropertyManager';
import ClientManager from '@/components/ClientManager';
import TransactionManager from '@/components/TransactionManager';
import Dashboard from '@/components/Dashboard';
import { LayoutGrid, Building2, Users, TrendingUp, LogOut, Menu, X } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'clients' | 'transactions'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: TrendingUp },
  ];

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#0f1729',
      color: '#e2e8f0',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    sidebar: {
      width: sidebarOpen ? '18rem' : '0',
      backgroundColor: '#020617',
      borderRight: '1px solid rgba(71, 85, 105, 0.5)',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed' as const,
      height: '100%',
      left: 0,
      top: 0,
      zIndex: 50,
    } as any,
    sidebarContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    logo: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(71, 85, 105, 0.5)',
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
    },
    logoIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.5rem',
      background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4, #2563eb)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
    },
    nav: {
      flex: 1,
      padding: '1rem',
      space: '0.5rem',
      overflowY: 'auto' as const,
    },
    navItem: (isActive: boolean) => ({
      width: '100%',
      display: 'flex',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s',
      cursor: 'pointer',
      marginBottom: '0.5rem',
      backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
      color: isActive ? '#ffffff' : '#9ca3af',
      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent',
    } as any),
    mainContent: {
      flex: 1,
      marginLeft: sidebarOpen ? '18rem' : '0',
      display: 'flex',
      flexDirection: 'column',
      transition: 'margin-left 0.3s ease',
    } as any,
    topBar: {
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      borderBottom: '1px solid rgba(71, 85, 105, 0.5)',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(12px)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 40,
    },
    contentArea: {
      flex: 1,
      overflowY: 'auto' as const,
      padding: '1.5rem',
    },
    footer: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderTop: '1px solid rgba(71, 85, 105, 0.5)',
      padding: '1rem',
      textAlign: 'center' as const,
      fontSize: '0.875rem',
      color: '#6b7280',
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Building2 size={24} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ffffff' }}>R&A Estate</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Kuwait Real Estate</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ ...styles.nav, display: 'flex', flexDirection: 'column' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                }}
                style={styles.navItem(isActive)}
              >
                <Icon size={20} />
                <span style={{ fontWeight: 500 }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(71, 85, 105, 0.5)', backgroundColor: 'rgba(30, 41, 59, 0.5)' }}>
          <button
            style={{
              width: '100%',
              display: 'flex',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'transparent',
              color: '#9ca3af',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <LogOut size={20} />
            <span style={{ fontWeight: 500 }}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#e2e8f0', cursor: 'pointer', padding: '0.5rem' }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#ffffff' }}>
                {navItems.find((i) => i.id === activeTab)?.label}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Manage your real estate business</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'right', display: 'none' }}>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Signed in as</p>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#ffffff' }}>R&A Admin</p>
            </div>
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '9999px',
                background: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              A
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'properties' && <PropertyManager />}
          {activeTab === 'clients' && <ClientManager />}
          {activeTab === 'transactions' && <TransactionManager />}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p>© 2026 R&A General Trading Co. | Real Estate Management System | Kuwait</p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: 'none',
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
