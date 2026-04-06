'use client';

import { useState } from 'react';
import { Plus, Search, X, ArrowLeftRight, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { transactions, formatKwdFull, formatKwd, type Transaction } from '@/lib/demo-data';
import { useToast } from '@/components/Toast';

export default function TransactionManager() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const filtered = transactions.filter((t) => {
    if (search && !t.property_title.toLowerCase().includes(search.toLowerCase()) && !t.client_name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter.toLowerCase().replace(' ', '_')) return false;
    if (typeFilter !== 'All' && t.transaction_type !== typeFilter.toLowerCase()) return false;
    return true;
  });

  const totalRevenue = transactions.reduce((s, t) => s + t.amount_kwd, 0);
  const totalCommission = transactions.reduce((s, t) => s + t.commission_amount_kwd, 0);
  const completedCount = transactions.filter((t) => t.status === 'completed').length;
  const pendingCount = transactions.filter((t) => t.status === 'pending' || t.status === 'under_contract').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Transactions</h2>
          <p className="text-xs text-white/25 mt-1">{filtered.length} transactions · {completedCount} completed</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all"
        >
          <Plus size={16} /> Record Deal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={DollarSign} label="Total Revenue" value={`د.ك ${formatKwd(totalRevenue)}`} gradient="from-[#00d4ff] to-[#3b82f6]" />
        <SummaryCard icon={DollarSign} label="Commissions" value={`د.ك ${formatKwd(totalCommission)}`} gradient="from-[#a855f7] to-[#7c3aed]" />
        <SummaryCard icon={CheckCircle2} label="Completed" value={`${completedCount}`} gradient="from-emerald-500 to-teal-500" />
        <SummaryCard icon={Clock} label="Pending" value={`${pendingCount}`} gradient="from-amber-500 to-orange-500" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="text-white/25" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
          />
        </div>
        <Select value={statusFilter} onChange={setStatusFilter} options={['All', 'Completed', 'Pending', 'Under Contract', 'Cancelled']} />
        <Select value={typeFilter} onChange={setTypeFilter} options={['All', 'Sale', 'Rental']} />
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['Property', 'Client', 'Type', 'Amount (KWD)', 'Commission', 'Status', 'Agent', 'Date'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] text-white/25 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-white text-sm">{t.property_title}</p>
                    <p className="text-[11px] text-white/25">{t.property_location}</p>
                  </td>
                  <td className="py-3 px-4 text-white/50">{t.client_name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium capitalize ${t.transaction_type === 'sale' ? 'badge-sold' : 'badge-rented'}`}>
                      {t.transaction_type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold neon-text-blue">د.ك {formatKwdFull(t.amount_kwd)}</td>
                  <td className="py-3 px-4 text-emerald-400 text-sm">د.ك {formatKwdFull(t.commission_amount_kwd)}</td>
                  <td className="py-3 px-4">
                    <span className={`badge-${t.status} px-2 py-0.5 rounded-md text-[10px] font-medium capitalize`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-white/40 text-xs">{t.agent_name.split(' ')[0]}</td>
                  <td className="py-3 px-4 text-white/30 text-xs">{t.transaction_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/20">
          <ArrowLeftRight size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No transactions match your filters</p>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddDealForm onClose={() => setShowModal(false)} onAdd={() => { setShowModal(false); toast('Transaction recorded'); }} />
        </Modal>
      )}
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, gradient }: { icon: any; label: string; value: string; gradient: string }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 opacity-80`}>
          <Icon size={16} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">{label}</p>
          <p className="text-lg font-bold text-white mt-0.5">{value}</p>
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

function AddDealForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Record New Deal</h3>
      <p className="text-xs text-white/25 mb-5">Link a property to a client</p>
      <div className="grid grid-cols-2 gap-3">
        <SelectInput label="Property" options={['Luxury Waterfront Villa', 'Modern Penthouse Suite', 'Sea View Apartment', 'Garden Villa Residence']} className="col-span-2" />
        <SelectInput label="Client" options={['Abdullah Al-Khaled', 'Maryam Al-Fahad', 'Yousef Al-Shammari']} className="col-span-2" />
        <SelectInput label="Type" options={['Sale', 'Rental']} />
        <Input label="Amount (KWD)" placeholder="0" type="number" />
        <Input label="Transaction Date" type="date" className="col-span-2" />
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:bg-white/[0.06] transition-colors">Cancel</button>
        <button onClick={onAdd} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#a855f7] text-sm font-medium text-white hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all">Record Deal</button>
      </div>
    </div>
  );
}

function Input({ label, className = '', ...props }: any) {
  return (
    <div className={className}>
      <label className="block text-[11px] text-white/30 mb-1.5">{label}</label>
      <input {...props} className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder:text-white/15 outline-none focus:border-[#00d4ff]/30 transition-colors" />
    </div>
  );
}

function SelectInput({ label, options, className = '' }: { label: string; options: string[]; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[11px] text-white/30 mb-1.5">{label}</label>
      <select className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 outline-none focus:border-[#00d4ff]/30 transition-colors appearance-none cursor-pointer">
        <option value="" className="bg-[#0d0d1a] text-white">Select...</option>
        {options.map((o) => <option key={o} value={o} className="bg-[#0d0d1a] text-white">{o}</option>)}
      </select>
    </div>
  );
}
