'use client';

import { useState } from 'react';
import { Plus, Search, LayoutGrid, List, MapPin, BedDouble, Bath, Maximize2, X, Building2 } from 'lucide-react';
import { properties, formatKwdFull, type Property } from '@/lib/demo-data';
import { useToast } from '@/components/Toast';

const typeOptions = ['All Types', 'Villa', 'Apartment', 'Land', 'Commercial'];
const statusOptions = ['All Status', 'Available', 'Sold', 'Rented', 'Under Offer'];
const locationOptions = ['All Locations', 'Salmiya', 'Kuwait City', 'Hawally', 'Mishref', 'Jabriya', 'Sharq', 'Salwa', 'Fintas', 'Rai', 'Jahra', 'Khairan'];

export default function PropertyManager() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showModal, setShowModal] = useState(false);

  const filtered = properties.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All Types' && p.property_type !== typeFilter.toLowerCase()) return false;
    if (statusFilter !== 'All Status' && p.property_status !== statusFilter.toLowerCase().replace(' ', '_')) return false;
    if (locationFilter !== 'All Locations' && p.location !== locationFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Property Portfolio</h2>
          <p className="text-xs text-white/25 mt-1">Showing {filtered.length} of {properties.length} properties</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all"
        >
          <Plus size={16} /> Add Property
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="text-white/25" />
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
          />
        </div>
        <Select value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
        <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
        <Select value={locationFilter} onChange={setLocationFilter} options={locationOptions} />
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-white/25'}`}>
            <LayoutGrid size={14} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-white/25'}`}>
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['Property', 'Location', 'Type', 'Size', 'Price (KWD)', 'Status'].map((h) => (
                    <th key={h} className="text-left py-3 px-4 text-[11px] text-white/25 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{p.title}</td>
                    <td className="py-3 px-4 text-white/50">{p.location}</td>
                    <td className="py-3 px-4 text-white/50 capitalize">{p.property_type}</td>
                    <td className="py-3 px-4 text-white/50">{p.size_sqm} sqm</td>
                    <td className="py-3 px-4 font-semibold neon-text-blue">د.ك {formatKwdFull(p.price_kwd)}</td>
                    <td className="py-3 px-4"><StatusBadge status={p.property_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-white/20">
          <Building2 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No properties match your filters</p>
        </div>
      )}

      {/* Add Property Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPropertyForm onClose={() => setShowModal(false)} onAdd={() => { setShowModal(false); toast('Property added successfully'); }} />
        </Modal>
      )}
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────

function PropertyCard({ property: p }: { property: Property }) {
  const typeIcon = { villa: '🏠', apartment: '🏢', land: '🗺️', commercial: '🏪' }[p.property_type];
  return (
    <div className="glass-card overflow-hidden group">
      {/* Image placeholder */}
      <div className={`h-40 bg-gradient-to-br ${p.image_gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <StatusBadge status={p.property_status} />
          <span className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur text-[10px] text-white/80 capitalize">{p.listing_type}</span>
        </div>
        <span className="absolute top-3 right-3 text-2xl">{typeIcon}</span>
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white group-hover:text-[#00d4ff] transition-colors">{p.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-white/30 text-xs">
          <MapPin size={11} />
          <span>{p.location}</span>
        </div>
        <div className="flex items-center gap-4 mt-3 text-white/30 text-[11px]">
          {p.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble size={12} />{p.bedrooms}</span>}
          {p.bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={12} />{p.bathrooms}</span>}
          <span className="flex items-center gap-1"><Maximize2 size={12} />{p.size_sqm} sqm</span>
        </div>
        <div className="mt-3 pt-3 border-t border-white/[0.04]">
          <p className="text-lg font-bold neon-text-blue">د.ك {formatKwdFull(p.price_kwd)}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = status.replace('_', ' ');
  return <span className={`badge-${status} px-2 py-0.5 rounded-md text-[10px] font-medium capitalize`}>{label}</span>;
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
        <button onClick={onClose} className="absolute top-4 right-4 text-white/25 hover:text-white/50">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

function AddPropertyForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Add New Property</h3>
      <p className="text-xs text-white/25 mb-5">Enter property details below</p>
      <div className="grid grid-cols-2 gap-3">
        <Input label="Title" placeholder="Property title" className="col-span-2" />
        <SelectInput label="Type" options={['Villa', 'Apartment', 'Land', 'Commercial']} />
        <Input label="Location" placeholder="District" />
        <Input label="Size (sqm)" placeholder="0" type="number" />
        <Input label="Price (KWD)" placeholder="0" type="number" />
        <Input label="Bedrooms" placeholder="0" type="number" />
        <Input label="Bathrooms" placeholder="0" type="number" />
      </div>
      <div className="flex gap-3 mt-5">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:bg-white/[0.06] transition-colors">
          Cancel
        </button>
        <button onClick={onAdd} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-sm font-medium text-white hover:shadow-lg hover:shadow-[#00d4ff]/20 transition-all">
          Add Property
        </button>
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

function SelectInput({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] text-white/30 mb-1.5">{label}</label>
      <select className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-white/60 outline-none focus:border-[#00d4ff]/30 transition-colors appearance-none cursor-pointer">
        {options.map((o) => <option key={o} value={o.toLowerCase()} className="bg-[#0d0d1a] text-white">{o}</option>)}
      </select>
    </div>
  );
}


