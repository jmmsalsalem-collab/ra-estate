'use client';

import { useState } from 'react';
import { Plus, Search, Phone, Mail, X, Users } from 'lucide-react';
import { clients, formatKwdFull, type Client } from '@/lib/demo-data';
import { useToast } from '@/components/Toast';

const typeColors: Record<string, string> = {
  buyer: 'from-[#00d4ff] to-[#3b82f6]',
  renter: 'from-[#a855f7] to-[#7c3aed]',
  investor: 'from-[#f59e0b] to-[#ef4444]',
};

const typeBadge: Record<string, string> = {
  buyer: 'badge-available',
  renter: 'badge-rented',
  investor: 'badge-under_offer',
};

const statusDot: Record<string, string> = {
  active: 'bg-emerald-400',
  closed: 'bg-blue-400',
  inactive: 'bg-white/20',
};

export default function ClientManager() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = clients.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All' && c.client_type !== typeFilter.toLowerCase()) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Client Management</h2>
          <p className="text-xs text-white/25 mt-1">{filtered.length} clients · {clients.filter((c) => c.status === 'active').length} active</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#a855f7]/20 transition-all"
        >
          <Plus size={16} /> Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="text-white/25" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
          />
        </div>
        <Select value={typeFilter} onChange={setTypeFilter} options={['All', 'Buyer', 'Renter', 'Investor']} />
        <Select value={statusFilter} onChange={setStatusFilter} options={['All', 'Active', 'Closed', 'Inactive']} />
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/20">
          <Users size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No clients match your filters</p>
        </div>
      )}

      {/* Add Client Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddClientForm onClose={() => setShowModal(false)} onAdd={() => { setShowModal(false); toast('Client added successfully'); }} />
        </Modal>
      )}
    </div>
  );
}

function ClientCard({ client: c }: { client: Client }) {
  const initials = c.name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  const isRenter = c.client_type === 'renter';

  return (
    <div className="glass-card p-5 group">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${typeColors[c.client_type]} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white truncate">{c.name}</h3>
            <span className={`w-2 h-2 rounded-full ${statusDot[c.status]} shrink-0`} title={c.status} />
          </div>
          <span className={`${typeBadge[c.client_type]} px-2 py-0.5 rounded-md text-[10px] font-medium capitalize inline-block mt-1`}>
            {c.client_type}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-white/35">
          <Phone size={11} />
          <span>{c.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/35">
          <Mail size={11} />
          <span className="truncate">{c.email}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <div>
          <p className="text-[10px] text-white/20 uppercase tracking-wider">Budget</p>
          <p className="text-sm font-semibold neon-text-purple">
            {isRenter
              ? `${c.budget_min_kwd} - ${c.budget_max_kwd} KWD/mo`
              : `${formatKwdFull(c.budget_min_kwd)} - ${formatKwdFull(c.budget_max_kwd)} KWD`
            }
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/20">Agent</p>
          <p className="text-xs text-white/40">{c.assigned_agent.split(' ')[0]}</p>
        </div>
      </div>
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/60 outline-none appearance-none cursor-pointer hover:border-white/[0.12] transition-colors"
    >
      {options.map((o) => <option key={o} value={o} className="bg-[#0d0d1a] text-white">{o}</option>)}
    </select>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass-card p-6 w-full max-w-lg animate-fade-in border border-white/[0.08]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/25 hover:text-white/50"><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

function AddClientForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Add New Client</h3>
      <p className="text-xs text-white/25 mb-5">Enter client details</p>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Full Name" placeholder="Client name" className="col-span-2" />
        <Input label="Phone" placeholder="+965 XXXX XXXX" />
        <Input label="Email" placeholder="email@example.com" type="email" />
        <SelectInput label="Type" options={['Buyer', 'Renter', 'Investor']} />
        <Input label="Preferred Location" placeholder="District" />
        <Input label="Budget Min (KWD)" placeholder="0" type="number" />
        <Input label="Budget Max (KWD)" placeholder="0" type="number" />
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:bg-white/[0.06] transition-colors">Cancel</button>
        <button onClick={onAdd} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-sm font-medium text-white hover:shadow-lg hover:shadow-[#a855f7]/20 transition-all">Add Client</button>
      </div>
    </div>
  );
}

function Input({ label, className = '', ...props }: any) {
  return (
    <div className={className}>
      <label className="block text-[11px] text-white/30 mb-1.5">{label}</label>
      <input {...props} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/15 outline-none focus:border-[#a855f7]/30 transition-colors" />
    </div>
  );
}

function SelectInput({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] text-white/30 mb-1.5">{label}</label>
      <select className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 outline-none focus:border-[#a855f7]/30 transition-colors appearance-none cursor-pointer">
        {options.map((o) => <option key={o} value={o.toLowerCase()} className="bg-[#0d0d1a] text-white">{o}</option>)}
      </select>
    </div>
  );
}
