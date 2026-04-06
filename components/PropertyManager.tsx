'use client';

import { useState } from 'react';
import { Plus, Search, LayoutGrid, List, MapPin, BedDouble, Bath, Maximize2, X, Building2, SlidersHorizontal } from 'lucide-react';
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
  const [showFilters, setShowFilters] = useState(false);

  const filtered = properties.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'All Types' && p.property_type !== typeFilter.toLowerCase()) return false;
    if (statusFilter !== 'All Status' && p.property_status !== statusFilter.toLowerCase().replace(' ', '_')) return false;
    if (locationFilter !== 'All Locations' && p.location !== locationFilter) return false;
    return true;
  });

  const activeFilters = [typeFilter, statusFilter, locationFilter].filter((f) => !f.startsWith('All')).length;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Property Portfolio</h2>
          <p className="text-xs text-white/20 mt-1">
            {filtered.length} of {properties.length} properties
            {activeFilters > 0 && <span className="text-[#00d4ff]/50 ml-1">· {activeFilters} filter{activeFilters > 1 ? 's' : ''} active</span>}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-sm font-medium hover:shadow-lg hover:shadow-[#00d4ff]/15 transition-all"
        >
          <Plus size={15} /> Add Property
        </button>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex-1 max-w-md focus-within:border-[#00d4ff]/15 transition-colors">
            <Search size={14} className="text-white/20" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/15 w-full"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-sm transition-all ${showFilters ? 'bg-white/[0.04] border-[#00d4ff]/15 text-white/60' : 'bg-white/[0.02] border-white/[0.05] text-white/30 hover:text-white/50'}`}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilters > 0 && <span className="w-4 h-4 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] text-[9px] flex items-center justify-center">{activeFilters}</span>}
          </button>
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/[0.06] text-white' : 'text-white/20'}`}>
              <LayoutGrid size={13} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/[0.06] text-white' : 'text-white/20'}`}>
              <List size={13} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 animate-fade-in">
            <Select value={typeFilter} onChange={setTypeFilter} options={typeOptions} />
            <Select value={statusFilter} onChange={setStatusFilter} options={statusOptions} />
            <Select value={locationFilter} onChange={setLocationFilter} options={locationOptions} />
            {activeFilters > 0 && (
              <button
                onClick={() => { setTypeFilter('All Types'); setStatusFilter('All Status'); setLocationFilter('All Locations'); }}
                className="text-xs text-white/20 hover:text-white/40 transition-colors px-3"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto sticky-header">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  {['Property', 'Location', 'Type', 'Size', 'Price (KWD)', 'Status'].map((h) => (
                    <th key={h} className="text-left py-3.5 px-5 text-[10px] text-white/20 font-medium uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-white/[0.03] hover:bg-white/[0.015] transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.image_gradient} flex items-center justify-center text-white/80`}>
                          <Building2 size={12} />
                        </div>
                        <span className="font-medium text-white text-[13px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-white/40 text-[12px]">{p.location}</td>
                    <td className="py-3.5 px-5 text-white/40 capitalize text-[12px]">{p.property_type}</td>
                    <td className="py-3.5 px-5 text-white/40 text-[12px]">{p.size_sqm} sqm</td>
                    <td className="py-3.5 px-5 font-semibold neon-text-blue text-[13px]">د.ك {formatKwdFull(p.price_kwd)}</td>
                    <td className="py-3.5 px-5"><StatusBadge status={p.property_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/15">
          <Building2 size={36} className="mx-auto mb-4 opacity-20" />
          <p className="text-sm">No properties match your filters</p>
          <p className="text-[10px] mt-1 text-white/10">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination hint */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between text-[10px] text-white/10 px-1">
          <span>Showing {filtered.length} of {properties.length}</span>
          <span>Page 1 of 1</span>
        </div>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddPropertyForm onClose={() => setShowModal(false)} onAdd={() => { setShowModal(false); toast('Property added successfully'); }} />
        </Modal>
      )}
    </div>
  );
}

function PropertyCard({ property: p }: { property: Property }) {
  const typeIcon = { villa: '🏠', apartment: '🏢', land: '🗺️', commercial: '🏪' }[p.property_type];
  return (
    <div className="glass-card overflow-hidden group animate-fade-in">
      <div className={`h-36 bg-gradient-to-br ${p.image_gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <StatusBadge status={p.property_status} />
          <span className="px-2.5 py-0.5 rounded-lg bg-black/30 backdrop-blur-md text-[9px] text-white/70 capitalize font-medium">{p.listing_type}</span>
        </div>
        <span className="absolute top-3 right-3 text-xl opacity-80">{typeIcon}</span>
      </div>
      <div className="p-5">
        <h3 className="text-[13px] font-semibold text-white/90 group-hover:text-white transition-colors">{p.title}</h3>
        <div className="flex items-center gap-1 mt-1.5 text-white/20 text-[11px]">
          <MapPin size={10} />
          <span>{p.location}</span>
        </div>
        <div className="flex items-center gap-5 mt-3 text-white/20 text-[10px]">
          {p.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble size={11} />{p.bedrooms} beds</span>}
          {p.bathrooms > 0 && <span className="flex items-center gap-1"><Bath size={11} />{p.bathrooms} baths</span>}
          <span className="flex items-center gap-1"><Maximize2 size={11} />{p.size_sqm} sqm</span>
        </div>
        <div className="mt-4 pt-3 border-t border-white/[0.04]">
          <p className="text-[17px] font-bold neon-text-blue">د.ك {formatKwdFull(p.price_kwd)}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`badge-${status} px-2.5 py-0.5 rounded-lg text-[9px] font-medium capitalize`}>{status.replace('_', ' ')}</span>;
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[12px] text-white/40 outline-none appearance-none cursor-pointer hover:border-white/[0.1] transition-colors"
    >
      {options.map((o) => <option key={o} value={o} className="bg-[#0d0d1a] text-white">{o}</option>)}
    </select>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative glass-card p-7 w-full max-w-lg animate-scale-in border border-white/[0.08]">
        <button onClick={onClose} className="absolute top-5 right-5 text-white/15 hover:text-white/40 transition-colors"><X size={16} /></button>
        {children}
      </div>
    </div>
  );
}

function AddPropertyForm({ onClose, onAdd }: { onClose: () => void; onAdd: () => void }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">Add New Property</h3>
      <p className="text-xs text-white/15 mb-6">Enter property details below</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Title" placeholder="Property title" className="col-span-2" />
        <SelectInput label="Type" options={['Villa', 'Apartment', 'Land', 'Commercial']} />
        <Input label="Location" placeholder="District" />
        <Input label="Size (sqm)" placeholder="0" type="number" />
        <Input label="Price (KWD)" placeholder="0" type="number" />
        <Input label="Bedrooms" placeholder="0" type="number" />
        <Input label="Bathrooms" placeholder="0" type="number" />
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose} className="flex-1 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-sm text-white/30 hover:text-white/50 hover:bg-white/[0.05] transition-all">Cancel</button>
        <button onClick={onAdd} className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-sm font-medium text-white hover:shadow-lg hover:shadow-[#00d4ff]/15 transition-all">Add Property</button>
      </div>
    </div>
  );
}

function Input({ label, className = '', ...props }: any) {
  return (
    <div className={className}>
      <label className="block text-[10px] text-white/20 mb-2 uppercase tracking-wider">{label}</label>
      <input {...props} className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm text-white placeholder:text-white/10 outline-none focus:border-[#00d4ff]/20 transition-colors" />
    </div>
  );
}

function SelectInput({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-[10px] text-white/20 mb-2 uppercase tracking-wider">{label}</label>
      <select className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm text-white/40 outline-none focus:border-[#00d4ff]/20 transition-colors appearance-none cursor-pointer">
        {options.map((o) => <option key={o} value={o.toLowerCase()} className="bg-[#0d0d1a] text-white">{o}</option>)}
      </select>
    </div>
  );
}
